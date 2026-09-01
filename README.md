# Smart Society Management System

A centralized full-stack web-based platform designed to digitize residential society operations, automate maintenance charge calculations and billing, simplify online complaint tracking, manage event hall reservations, and streamline communication between administrators and residents.

![Architecture](https://img.shields.io/badge/Architecture-Full--Stack%20Node.js%20%2B%20React-indigo)
![Database Engine](https://img.shields.io/badge/Database-Relational%20SQL-emerald)
![Security](https://img.shields.io/badge/Security-JWT%20Auth%20%2B%20Bcrypt-rose)
![Methodology](https://img.shields.io/badge/Methodology-Agile%20Model-blue)

---

## 1. Problem Statement

Managing residential societies through traditional methods involves maintaining records manually using paper documents, registers, spreadsheets, and separate communication channels. This approach is time-consuming, difficult to maintain, and prone to errors. Residents may also face difficulties in accessing maintenance bills, payment records, complaint status, event hall availability, and society announcements.

In many existing systems, society members have limited access to important information, while administrators have to manually calculate maintenance charges, maintain payment records, manage complaints, and communicate with residents. This can lead to delays, lack of transparency, increased workload, and conflicts among society members.

Therefore, there is a need for a centralized **Society Management System** that automates routine society operations and provides residents and administrators with easy access to relevant information through a secure web-based platform.

---

## 2. Project Objectives

### Primary Objective
To develop a centralized web-based **Society Management System** that automates and simplifies society administration, maintenance billing, payment tracking, complaint management, event hall booking, and communication between administrators and residents.

### Secondary Objectives
- **Secure Access**: To provide secure login and role-based access for Admins and Residents.
- **Automated Billing**: To automate monthly maintenance charge calculation and bill generation.
- **Payment Records**: To maintain centralized payment records and payment history.
- **Complaint Handling**: To allow residents to submit and track complaints online.
- **Hall Booking**: To provide an online hall/event booking facility.
- **Digital Communication**: To enable administrators to send announcements and updates to society members.
- **Reduced Paperwork**: To reduce paperwork and manual administrative work.
- **Transparency**: To improve transparency and accessibility of society-related information.
- **Conflict Prevention**: To reduce conflicts and communication gaps among society members.

---

## 3. Project Description

The **Smart Society Management System** is a full-stack web-based application designed to digitally manage the daily activities of a residential society. The system provides a centralized platform where administrators and residents can access services based on their roles.

Administrators can manage flats and residents, calculate maintenance charges, generate bills, track due payments and payment history, manage complaints, approve event hall bookings, and publish society announcements. Residents can log in to their accounts to view maintenance bills, check payment history, submit complaints, track complaint status, request event hall bookings, and view society announcements.

The system follows a modular architecture consisting of a React-based frontend, Node.js and Express.js backend, and a relational SQL database. Secure authentication and role-based authorization are implemented to ensure that users can access only the functionalities permitted for their roles.

The system replaces manual and paper-based society management with an automated, centralized, and transparent digital platform.

---

## 4. Scope of the Project

The system accomplishes:
- Centralized management of society information.
- Secure authentication and role-based access.
- Management of residents and flats.
- Automated maintenance charge calculation.
- Maintenance bill generation.
- Payment and due-payment tracking.
- Online complaint registration and tracking.
- Event hall booking and approval with conflict detection.
- Society announcements and notifications.
- Admin and Resident dashboards.
- Reports and printable invoices.

### Key Modules
1. **Authentication and User Management**: Role-based access control (Admin & Resident), JWT tokens, and secure passwords.
2. **Society and Flat Management**: Wings, flat allocation, owner vs. tenant classification, and floor area mapping.
3. **Maintenance Management**: Sq. ft. rate calculator (`sqft * rate + water + elevator + security + parking`), custom debit notes.
4. **Billing and Payment Management**: Bill status tracking (`PENDING`, `PAID`, `OVERDUE`), payment gateway simulator, and payment ledger.
5. **Complaint Management**: Ticket creation, category classification, status resolution workflow, and activity history.
6. **Event Hall Booking**: Clubhouse and terrace lawn availability checker, booking request submission, and conflict prevention.
7. **Announcements and Notifications**: Broadcast notice board replacing physical door-to-door visits.
8. **Admin Dashboard**: Live statistics on collections, pending complaints, hall requests, and quick administrative actions.
9. **Resident Dashboard**: Personalized overview of upcoming maintenance dues, complaint status, active notices, and booking history.
10. **Reports and Invoice Generation**: Searchable/filterable financial ledgers and instant printable tax invoice receipts (`window.print()`).

### Limitations
- The initial version includes a simulated payment gateway checkout rather than direct banking API integration.
- The system depends on internet connectivity for online access.
- Advanced AI-based features (e.g., auto-categorization of tickets) are reserved for future releases.
- The system is primarily designed for residential society management and may require customization for commercial complexes.

---

## 5. Methodology: Agile Model

The project follows an **Agile development methodology** because the system consists of multiple independent modules that can be developed, tested, and integrated incrementally. Requirements can evolve based on feedback from users and stakeholders, making an iterative approach suitable.

```text
 1. Requirement Analysis ──► 2. System Design ──► 3. Development ──► 4. Testing ──► 5. Deployment
```

### Development Phases
1. **Requirement Analysis**: Identify administrator and resident requirements, define functional and non-functional specifications, and map user roles.
2. **System Design**: Design modular architecture, relational database schema, UI/UX glassmorphism themes, and RESTful API structures.
3. **Development**: Implement authentication, role middleware, Admin & Resident dashboards, maintenance billing engine, complaint tickets, hall reservation, and notice broadcasts.
4. **Testing**: Perform unit testing, integration testing, system validation, security audits, and user acceptance testing (UAT).
5. **Deployment**: Configure production environments, deploy frontend and backend services, verify data persistence, and compile user manuals.

### Why Agile is Suitable
Agile is ideal because each module (Auth, Maintenance, Complaints, Hall Booking, Notices) can be developed in an iteration, tested, demonstrated, and improved based on feedback before proceeding to the next iteration.

---

## 6. Technologies and Tools

| Category | Technology / Tool |
| :--- | :--- |
| **Frontend** | React 18 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + Custom CSS Theme |
| **Icons** | Lucide React |
| **Backend** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | Relational SQL (PostgreSQL / SQLite engine) |
| **Database Access** | Prisma ORM / SQL Prepared Statements |
| **Authentication** | JWT (JSON Web Tokens) & Bcrypt Hashing |
| **Programming Languages**| JavaScript (ES6+) / TypeScript |
| **API Architecture** | RESTful API |
| **Development IDE** | Visual Studio Code |
| **Version Control** | Git |
| **Repository** | GitHub |
| **Testing** | Postman, Browser Developer Tools, Oxlint |
| **Deployment** | Vercel / Render / Railway / AWS |

---

## 7. Work Breakdown Structure (WBS)

### A. Process-Based WBS
```text
1. Smart Society Management System
│
├── 1.1 Project Planning
│   ├── 1.1.1 Define Project Goals
│   ├── 1.1.2 Identify Stakeholders
│   ├── 1.1.3 Identify Project Scope
│   └── 1.1.4 Prepare Project Schedule
│
├── 1.2 Requirement Analysis
│   ├── 1.2.1 Identify Admin Requirements
│   ├── 1.2.2 Identify Resident Requirements
│   ├── 1.2.3 Functional Requirements
│   └── 1.2.4 Non-Functional Requirements
│
├── 1.3 System Design
│   ├── 1.3.1 System Architecture
│   ├── 1.3.2 Database Design
│   ├── 1.3.3 UI/UX Design
│   └── 1.3.4 API Design
│
├── 1.4 Development
│   ├── 1.4.1 Authentication
│   ├── 1.4.2 User Management
│   ├── 1.4.3 Maintenance and Billing
│   ├── 1.4.4 Payment Management
│   ├── 1.4.5 Complaint Management
│   ├── 1.4.6 Hall Booking
│   └── 1.4.7 Announcements
│
├── 1.5 Testing
│   ├── 1.5.1 Unit Testing
│   ├── 1.5.2 Integration Testing
│   ├── 1.5.3 System Testing
│   └── 1.5.4 User Acceptance Testing
│
└── 1.6 Deployment and Maintenance
    ├── 1.6.1 Deployment
    ├── 1.6.2 Documentation
    ├── 1.6.3 User Manual
    └── 1.6.4 Maintenance
```

### B. Product-Based WBS
```text
1. Smart Society Management System
│
├── 1.1 Authentication System
│   ├── Login
│   ├── Registration
│   └── Role-Based Access
│
├── 1.2 Admin Module
│   ├── Admin Dashboard
│   ├── Resident Management
│   ├── Flat Management
│   ├── Payment Management
│   ├── Complaint Management
│   └── Hall Booking Approval
│
├── 1.3 Resident Module
│   ├── Resident Dashboard
│   ├── Maintenance Bills
│   ├── Payment History
│   ├── Complaint Registration
│   ├── Hall Booking
│   └── Announcements
│
├── 1.4 Maintenance Module
│   ├── Charge Calculation
│   ├── Bill Generation
│   └── Due Tracking
│
├── 1.5 Communication Module
│   ├── Announcements
│   └── Notifications
│
├── 1.6 Reporting Module
│   ├── Payment Reports
│   ├── Maintenance Reports
│   └── Printable Invoices
│
└── 1.7 Database and API
    ├── Database
    ├── Backend APIs
    └── Authentication APIs
```

### C. Geographic-Based WBS
```text
1. Smart Society Management System
│
├── 1.1 Society Administration
│   └── Society Administrative Office
│
├── 1.2 Residential Areas
│   ├── Block/Wing A
│   ├── Block/Wing B
│   ├── Block/Wing C
│   └── Other Blocks/Wings
│
├── 1.3 Common Facilities
│   ├── Community Hall
│   ├── Parking Area
│   └── Other Common Areas
│
└── 1.4 Centralized Online Platform
    ├── Admin Access
    └── Resident Access
```

### D. Role-Based WBS
```text
1. Smart Society Management System
│
├── 1.1 Project Manager
│   ├── Project Planning
│   ├── Scheduling
│   ├── Resource Management
│   └── Progress Monitoring
│
├── 1.2 Business/System Analyst
│   ├── Requirement Gathering
│   ├── Requirement Analysis
│   └── Documentation
│
├── 1.3 UI/UX Designer
│   ├── Wireframes
│   ├── User Interface Design
│   └── User Experience Design
│
├── 1.4 Frontend Developer
│   ├── React Development
│   ├── Admin Dashboard
│   ├── Resident Dashboard
│   └── UI Integration
│
├── 1.5 Backend Developer
│   ├── REST APIs
│   ├── Authentication
│   ├── Business Logic
│   └── API Integration
│
├── 1.6 Database Developer
│   ├── Database Design
│   ├── Tables and Relationships
│   ├── Constraints
│   └── Database Optimization
│
├── 1.7 QA/Test Engineer
│   ├── Test Planning
│   ├── Functional Testing
│   ├── Integration Testing
│   └── Bug Reporting
│
├── 1.8 Security Engineer
│   ├── Authentication Security
│   ├── Authorization
│   ├── Input Validation
│   └── Security Testing
│
└── 1.9 DevOps/Deployment Engineer
    ├── Deployment
    ├── Environment Configuration
    ├── CI/CD
    └── Monitoring
```

---

## 8. Innovative Aspects & Novelty

The proposed system introduces the following capabilities:
- **Automated Maintenance Charge Calculation**: Automatically calculates periodic maintenance charges based on predefined rules, applicable services, and resident or property details.
- **Centralized Digital Billing and Payment Management**: Provides a unified platform for generating bills, recording payments, monitoring outstanding dues, and maintaining transparent financial transaction records.
- **Role-Based Access and Personalized Dashboards**: Offers customized dashboards for Administrators, Committee Members, and Residents.
- **Online Complaint & Service Request Management**: Enables digital ticket submission, priority tagging, assignment, and status updates (`Pending` → `In Progress` → `Resolved`).
- **Online Event Hall & Facility Booking**: Digital booking system for common facilities with real-time slot conflict prevention.
- **Centralized Announcements & Notifications**: Replaces physical door-to-door notices with digital broadcasts for emergency alerts, meetings, and updates.
- **Digital Invoice & Report Generation**: Automatically generates official tax invoices and payment receipts ready for printing (`window.print()`).
- **Centralized Resident & Property Records**: Maintains organized digital records of residents, flats, blocks, ownership/tenant status, and contact details.
- **Improved Transparency & Accountability**: Grants clear visibility into billing, payment ledgers, and complaint status.
- **Real-Time Status Tracking**: Allows residents and admins to monitor payments, tickets, and bookings in real-time.
- **Secure & Scalable Architecture**: Role-based access control, JWT tokens, bcrypt password hashing, and structured relational database design.

---

## 9. Expected Outcomes

- A functional web-based Society Management System.
- Online complaint registration and status tracking.
- Online event hall reservation facility.
- Centralized announcements and community notice board.
- Personalized Admin and Resident dashboards.
- Significant reduction in paperwork and manual administrative effort.
- Improved operational transparency and accessibility.
- Complete technical project documentation, user manual, and test reports.

---

## 10. Future Enhancements

- Online payment gateway integration (Razorpay / Stripe / Paytm SDKs).
- Mobile application for Android and iOS (React Native).
- AI-based complaint auto-categorization and priority routing.
- AI chatbot for instant resident Q&A.
- Predictive financial analytics for maintenance expenditure.
- Automated SMS, Email, and WhatsApp notifications.
- Visitor management and security gatekeeper module.
- Vehicle parking management system.
- Integration with smart security hardware and IoT gate controllers.

---

## 🔑 Demo Credentials

| Role | Username | Password | Flat | Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Admin (Secretary)** | `admin` | `123` | Flat A-501 | Full administrative control, bill generation, complaint resolution, hall approvals, notice broadcasts |
| **Admin (Treasurer)** | `treasurer` | `123` | Flat B-402 | Financial ledger oversight & collection tracking |
| **Resident Owner** | `priya` | `123` | Flat A-402 | Personal bills, UPI checkout simulation, complaint registration, hall booking |
| **Resident Tenant** | `amitabh` | `123` | Flat B-102 | Maintenance dues, complaint log, notice board access |

---

## 🛠️ Local Setup & Execution Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Launch

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Full-Stack Dev Server (Backend Express + Frontend Vite concurrently)**:
   ```bash
   npm run dev
   ```
   - **Frontend App**: `http://localhost:5180` (or `http://localhost:5173`)
   - **Backend API**: `http://localhost:5000/api`
   - **API Health Check**: `http://localhost:5000/api/health`

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---
*Developed as part of the Software Engineering Project Lab.*
