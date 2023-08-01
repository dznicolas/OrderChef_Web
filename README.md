## OrderChef (First Version)

OrderChef is an order management application that allows users to create, view, and edit customer orders, payment methods, and products. I am studying new features and improvements to include in this learning project.

## Technologies Used

- Backend: .NET API with C# and SQL Server.
- Frontend: React with Material-UI (Mui).

## Features

- Create new orders by selecting the customer, payment method, and associated products.
- View a list of orders with their respective values.
- Edit or delete existing orders.

## Installation
#### Backend (.NET API):

- Open the .NET project and navigate to the - appsettings.json file.
Configure the connection with the SQL Server database by providing the authentication information and database name.
- Run the migrations to create the database tables.

```bash
  add-Migration "Name Migration"
``` 
```bash
  update-database
``` 
- Create records in the database.

#### Frontend (React):

- Install the dependencies with:
```bash
  npm install
``` 
- In the React project, locate the index.js file inside the "api" folder.
- Insert the URL of the .NET API in the index.js file so that the frontend application can communicate with the backend correctly.
- Start the React application using the command:
```bash
  npm start
```

## Video Demonstration (Project)
https://github.com/dznicolas/OrderChef_Web/assets/103971506/1a9c7775-ac7b-4eec-9c4b-d709b0f44a1b




