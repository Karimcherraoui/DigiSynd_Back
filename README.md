# Syndic Web Payment Management System Backend

## Project Overview

In this web agency project, the client has requested the development of a Syndicate Payment Management System. The application will enable the management of apartments, monthly payments, and the printing of invoices for each apartment.

## Functionality Overview

### Apartment Management

- **Add New Apartment:**
  - Syndic can add a new apartment, specifying details such as apartment number, owner information, and other relevant details.

### Payment Management

  - For each apartment, the syndic can mark the monthly payment as paid when the owner makes the payment.

### Invoice Generation

- **Download PDF Invoice:**
  - Syndic can generate and download a PDF invoice for each payment made by the apartment owner.

### Statistics

- **View Statistics:**
  - Syndic can view statistical data related to payments.

### User Management

- **Register New Admin (SuperAdmin Only):**
  - SuperAdmin can register a new admin, providing them with the necessary access rights.



## Technologies Used

### Backend

- NodeJS (ExpressJs)
- MongoDB
- Mongoose (ODM)
- JWT for authentication
- Docker for deployment

## Project Structure

The project is divided into three main parts: Backend, Frontend, and Deployment.

### Backend

- Controllers: Responsible for handling business logic.
- Models: Define MongoDB schemas using Mongoose.
- Routes: Define API routes.
- Middleware: Error handling, authentication with JWT, and route protection.
- Tests: Ensure test coverage exceeds 90% using Jest.


## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Docker installed

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies:
   ```bash
   cd DigiSynd_Back
   npm install
  
