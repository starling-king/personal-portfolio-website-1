# Personal Portfolio Architecture

A full-stack personal portfolio built entirely from scratch, designed to prioritize backend robustness, secure state management, and clean system architecture over reliance on pre-built templates.

## ⚙️ Core Technical Implementations

This project serves as a live demonstration of structured backend engineering principles:

* **Secure Authentication Pipeline:** Implemented automated token rotation. The system intercepts `401 Unauthorized` JSON responses and seamlessly utilizes Postman-tested scripts/client logic to refresh access tokens without dropping the user session.
* **Global Error Handling:** Centralized error-handling middleware in Express.js to ensure consistent, predictable API responses and prevent server crashes from unhandled promise rejections.
* **Structured Data Modeling:** Designed strict Mongoose schemas to govern dynamic data flow for:
  * Projects and repository metadata.
  * Live site content generation.
  * Incoming contact messages and payload validation.
* **Optimized Environment:** Developed and deployed natively within an Ubuntu 24.04 Linux environment, utilizing custom shell configurations for performance tuning.

## 💻 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Testing:** Postman
* **Environment:** Linux (Ubuntu 24.04)

## 🚀 Local Development Setup

To run this system architecture locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/starling-king/personal-portfolio-website-1.git](https://github.com/starling-king/personal-portfolio-website-1.git)
   cd personal-portfolio-website-1
