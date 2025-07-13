# 📞 MyRights-LK-Intellectual-Property-Complaint-Portal

A full-stack, modular Customer Support Management System built with **Spring Boot**, **MySQL**, **React + Vite**, and **Twilio** for real-time SMS support notifications.

---

## ⚙️ Tech Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| Frontend      | React + Vite, Tailwind CSS     |
| Backend       | Spring Boot (RESTful APIs)     |
| Database      | MySQL                          |
| SMS Gateway   | Twilio                         |
| DB Migration  | Liquibase                      |
| Auth          | JWT Authentication             |

---

## 🎯 Features

### 🎫 Ticket Management
- Submit customer support tickets
- Track ticket status (New, In Progress, Resolved)
- Assign tickets to support agents

### 👤 User Management
- Admin, Support Agent, and Customer roles
- JWT-based login & role-based access control
- Email and SMS verification via Twilio

### 🔔 Notifications
- Send ticket updates via Twilio SMS
- Optional email alerts

### 📊 Reporting
- Dashboard with ticket stats
- Filter by status, agent, date

---

## 🚀 Getting Started

### 📦 Backend (Spring Boot)

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/customer-support-system.git
   cd customer-support-system/backend
