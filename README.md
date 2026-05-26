# Courier & Parcel Tracking System

A full-stack logistics management platform to manage parcel bookings, shipment tracking, delivery updates, analytics, and proof of delivery.

## Project Overview

The Courier & Parcel Tracking System is designed for logistics companies to efficiently manage parcel delivery operations.
The system supports three main user roles:

Customer – Book parcels and track shipments
Delivery Staff – Update delivery status and upload proof
Admin – Monitor logistics operations and analytics

This application provides real-time shipment tracking, delivery workflow management, role-based authentication, and analytics dashboards.

## Tech Stack
Frontend
ReactJS
React Router DOM
Tailwind CSS
Axios
Backend
Node.js
Express.js
JWT Authentication
bcrypt
Database
SQLite

## Features
### Customer Features

Create parcel bookings
Track shipment status using tracking ID
View shipment history
Check delivery progress timeline

### Delivery Staff Features
View assigned deliveries
Update shipment status
Upload delivery proof
Manage delivery progress

### Admin Features
Monitor all shipments
View analytics dashboard
Filter shipments by:
Status
Destination
Delivery Agent
Monitor delayed shipments

📂 Project Structure

```
project-root/
│
├── backend/
│   ├── database/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md

```

## Database Tables
users
parcels
shipments
tracking_updates
delivery_staff
payments
delivery_proofs
locations

## Authentication & Authorization
JWT-based authentication
Role-based protected routes
Secure password hashing using bcrypt
Roles
Customer
Delivery Staff
Admin

## API Endpoints
Parcel APIs
Method	Endpoint	Description
POST	/api/parcels	Create parcel booking
GET	/api/shipments	Get all shipments
GET	/api/track/:trackingId	Track shipment
Shipment APIs
Method	Endpoint	Description
PUT	/api/shipments/:id/status	Update shipment status
Delivery APIs
Method	Endpoint	Description
POST	/api/delivery-proof	Upload delivery proof
Admin APIs
Method	Endpoint	Description
GET	/api/dashboard/admin	Get logistics analytics

## Frontend Screens
Parcel Booking Page
Shipment Tracking Page
Delivery Dashboard
Delivery Proof Upload Page
Shipment Details Page
Admin Analytics Dashboard

## Business Rules & Validations
Validate parcel dimensions and addresses
Prevent duplicate tracking numbers
Maintain shipment tracking history
Prevent invalid shipment status transitions
Use reusable shipment cards and tracking timeline components
Implement pagination for shipment history
Role-based access protection

## Shipment Workflow
Booked
   ↓
Picked Up
   ↓
In Transit
   ↓
Out For Delivery
   ↓
Delivered
📈 Admin Dashboard Analytics

The admin dashboard provides:

Total shipments
Active deliveries
Delivered parcels
Delayed shipments
Shipment performance metrics
Delivery staff performance

## Bonus Enhancements
Live GPS tracking
SMS delivery alerts
Barcode scanning support
⚙ Installation & Setup


2️⃣ Backend Setup
cd backend
npm install
Start Backend Server
npm start

Server runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173