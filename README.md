# Smart Society Management System

## 1\. Project Overview

The **Smart Society Management System** is a web-based application designed to simplify residential society administration. It provides a centralized platform for managing residents, flats, maintenance bills, payments, complaints, hall bookings, and announcements.

The system provides separate dashboards for administrators and residents, ensuring secure access to relevant information and services.

## 2\. Problem Statement

Traditional society management relies on manual records, spreadsheets, and separate communication channels. This makes maintenance billing, payment tracking, complaint handling, and communication time-consuming and error-prone.

The proposed system automates these activities and improves transparency, efficiency, and accessibility.

## 3\. Objectives

- Provide secure login for admins and residents.
- Automate maintenance charge calculation and bill generation.
- Track payments and outstanding dues.
- Enable online complaint registration and status tracking.
- Manage event hall bookings and prevent scheduling conflicts.
- Publish society announcements and updates.
- Reduce paperwork and manual administrative work.

## 4\. Key Features and Modules

1. **Authentication:** Secure login and role-based access.
2. **Resident and Flat Management:** Manage resident details, flats, wings, and ownership information.
3. **Maintenance and Billing:** Calculate maintenance charges based on flat area and applicable service charges.
4. **Payment Management:** Track payments, pending dues, and payment history.
5. **Complaint Management:** Submit complaints and track their resolution status.
6. **Hall Booking:** Request bookings and manage approvals and availability.
7. **Announcements:** Publish notices and society updates.
8. **Dashboards:** Separate dashboards for admins and residents.
9. **Reports and Invoices:** Generate payment reports and printable bills or receipts.

## 5\. Technology Stack

| Component | Technology |
| --- | --- |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, Custom CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL or SQLite |
| ORM | Prisma |
| Authentication | JWT, bcrypt |
| API | RESTful API |
| Testing | Postman, Browser Developer Tools |
| Deployment | Vercel, Render, or Railway |

## 6\. System Users

- **Admin:** Manages residents, flats, maintenance bills, payments, complaints, bookings, and announcements.
- **Resident:** Views bills and payment history, submits complaints, requests hall bookings, and reads announcements.

## 7\. Expected Outcomes

- Simplified society administration.
- Accurate maintenance billing and payment tracking.
- Faster complaint resolution.
- Convenient online hall booking.
- Improved communication between admins and residents.
- Reduced paperwork and increased transparency.

## 8\. Limitations

- The initial version uses a simulated payment gateway.
- Internet connectivity is required for online access.
- Advanced AI features and mobile applications are planned for future development.

## 9\. Future Enhancements

- Integration with online payment gateways such as Razorpay.
- Android and iOS mobile applications.
- Automated email, SMS, and WhatsApp notifications.
- AI-powered complaint classification and chatbot support.
- Visitor and parking management.

## 10\. Local Setup

**Prerequisites:** Node.js v18 or later and npm.

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Build the application:

```
npm run build
```

**Expected URLs:**

- Frontend: `http://localhost:5180` or `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/api/health`

_Note: The actual ports depend on the project configuration._
