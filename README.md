# Member Register Web Portal

## Overview

This project is a web portal for managing a member register. It allows users to perform various administrative tasks such as adding, editing, listing, searching, removing members, and generating a printable member list. Access to the administrative pages is secured by a login system.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: You need a running MongoDB server. You can download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community) or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Setup and Configuration

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGODB_SERVER_IP=localhost
MONGODB_DATABASE=yourDatabase
JWT_SECRET=yourJWTSecret
```

Replace `yourDatabase` with the name of your MongoDB database and `yourJWTSecret` with a secret key for JWT token generation.

### Install Dependencies

Navigate to the root directory of the project and run the following command to install the required dependencies:

```bash
npm install
```

### Reset Database

Before running the server, you need to reset the database to create the default admin user. Run the following command:

```bash
npm run reset-db
```

### Run the Server

To start the server, run the following command:

```bash
npm start
```

The server will start on port 5500.

### Run the Client

Navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

Start the client development server:

```bash
npm start
```

The client will start on port 3000.

## Usage

### Default Admin User
* Username: admin
* Password: adminpassword123

### Accessing the Web Portal
1. Open your browser and navigate to http://localhost:3000.
2. Log in using the default admin user credentials.
3. Use the portal to manage members.

### Adding a New Member
1. Click on "Add Member".
2. Fill in the member details and submit the form.

### Editing a Member
1. Click on a member in the list to edit.
2. Update the member details and submit the form.

### Removing a Member
1. Click on "Remove Member".
2. Enter the member number and the reason for removal, then submit the form.

### Printing the Member List
1. Click on "Print Member List".
2. View the printable list and print it using your browser's print functionality.

## Build and Deployment

### Build the Client Application
To create a production build of the client application, navigate to the client directory and run:

```bash
npm run build
```

This will create a build directory with the optimized production build of the application.

### Deploying the Server
Ensure that your environment variables are set correctly on the deployment server. You can use tools like Docker, PM2, or a cloud service to deploy the Node.js server.

### Deploying the Client
The production build of the client can be served using a static file server or any web server like Nginx, Apache, or a cloud service.

### License
This project is licensed under the MIT License.

```sql
This `README.md` file includes all the necessary information for setting up, running, and deploying the member register web portal. If you need any further customization or additional information, please let me know! 
```
