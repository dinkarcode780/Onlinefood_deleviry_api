🍔 Online Food Delivery API (Multiple Restaurant Support)
Online Food Delivery API ek scalable backend hai jo Swiggy-like multi-restaurant system ke liye banaya gaya hai.
Users nearby restaurants search kar sakte hain, menu explore kar sakte hain, orders place kar sakte hain, aur real-time order tracking ka plan hai.
Admin multiple restaurants aur unke menus manage kar sakta hai.

✨ Features
User Side
JWT based signup/login

Multiple restaurant listing with details

Nearby restaurant search (GeoSpatial queries)

Restaurant-wise menu categories & items

Add to cart & order placement

Order tracking (future: Socket.io)

Admin Side
Manage multiple restaurants (CRUD)

Add/update menu categories & items per restaurant

Upload images to AWS S3 (Multer-S3)

Manage orders & update order statuses

Role-based access (Admin/User separation)

🛠 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB Atlas (GeoSpatial indexing)

File Upload: AWS S3 with Multer-S3

Authentication: JWT

Real-time (planned): Socket.io

