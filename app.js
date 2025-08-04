dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();

// import Routes
import userRoute from "./src/api/routes/userRoute.js";
import productRoute from "./src/api/routes/productRoutes.js";
import driverRoute from "./src/api/routes/driverRoutes.js";
import restaurantRoute from "./src/api/routes/restaurantRoutes.js";
import stateRoute from "./src/api/routes/stateRoute.js";
import orderRoute from "./src/api/routes/orderRoutes.js";
import addressRoute from "./src/api/routes/addressRoutes.js";
import cartRoute from "./src/api/routes/cartRoutes.js";
import categoryRoute from "./src/api/routes/categoryRoutes.js";
import ratingRoute from "./src/api/routes/ratinRoutes.js";
import homePageRoute from "./src/api/routes/homePageRoute.js";
import cityRoutye from "./src/api/routes/cityRoute.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));


// Routes

app.use("/api",userRoute);
app.use("/api",productRoute);
app.use("/api",driverRoute);
app.use("/api",restaurantRoute);
app.use("/api",stateRoute);
app.use("/api",orderRoute);
app.use("/api",addressRoute);
app.use("/api",cartRoute);
app.use("/api",categoryRoute);
app.use("/api",ratingRoute);
app.use("/api",homePageRoute);
app.use("/api",cityRoutye);






export default app;