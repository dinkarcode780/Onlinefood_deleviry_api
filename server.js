import app from './app.js';
import { createServer } from 'http';
import { databaseConnection } from './src/config/db.js';



const PORT = process.env.PORT || 8000;

await databaseConnection();


const server = createServer(app);


// create a socket io server

import { Server } from 'socket.io';
import { Socket } from 'dgram';
import { connect } from 'http2';

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

let drivers = [];

let users = {};

let restaurants = {};


// Socket connect

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Driver join
  socket.on('driver_join', () => {
    drivers.push(socket.id);
    console.log('Driver joined:', socket.id);
  });

  // User join
  socket.on('user_join', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  // Restaurant join
  socket.on('restaurant_join', (restaurantId) => {
    restaurants[restaurantId] = socket.id;
    console.log(`Restaurant ${restaurantId} connected with socket ID: ${socket.id}`);
  });

  // Order created
  socket.on('create_order', (orderData) => {
    console.log('Order created:', orderData);

    // Notify all drivers
    drivers.forEach(driverSocketId => {
      io.to(driverSocketId).emit('new_order', orderData);
    });

    // Notify the restaurant
    const restaurantSocketId = restaurants[orderData.restaurantId];
    if (restaurantSocketId) {
      io.to(restaurantSocketId).emit('new_order', orderData);
    }
  });

  // Order status update
  socket.on('update_order_status', ({ userId, status }) => {
    const userSocketId = users[userId];
    if (userSocketId) {
      io.to(userSocketId).emit('order_status_update', status);
      console.log(`Order status updated for user ${userId}: ${status}`);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    drivers = drivers.filter(id => id !== socket.id);

    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }

    for (const restaurantId in restaurants) {
      if (restaurants[restaurantId] === socket.id) {
        delete restaurants[restaurantId];
      }
    }
  });
});

// Attach io to app for global access (optional)
app.set('io', io);







server.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
