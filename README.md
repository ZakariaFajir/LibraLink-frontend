# Frontend Application for LIBRALINK

This frontend application is built using React, Tailwind CSS, and Redux to create an interactive and responsive user interface for a biblio app. The application communicates with the backend API to fetch product information, manage user authentication, and display order confirmations.

## Getting Started

To run the frontend application, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   Create a `.env` file in the root directory and add the following variable:

   ```env
   VITE_API_URI=<your_api_uri>
   ```

   Replace `<your_api_uri>` with the actual URL of your backend API.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build the application for production:

   ```bash
   npm run build
   ```

5. Preview the production build:

   ```bash
   npm run preview
   ```

## Features

- **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces.

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.

- **React Router Dom**: Declarative routing for React.js.

- **Axios**: Promise-based HTTP client for the browser and Node.js.

- **JWT Decode**: A library to decode JWTs (JSON Web Tokens).

- **React Toastify**: A React library for toast notifications.

- **@react-oauth/google**: React component for Google OAuth.

## Scripts

- **dev**: Start the development server using Vite.
- **build**: Build the application for production.
- **lint**: Lint the project using ESLint.
- **preview**: Preview the production build locally.

## Dependencies

- @react-oauth/google: ^0.11.1
- @reduxjs/toolkit: ^1.9.7
- axios: ^1.5.1
- jwt-decode: ^4.0.0
- react: ^18.2.0
- react-dom: ^18.2.0
- react-icons: ^4.11.0
- react-redux: ^8.1.3
- react-router-dom: ^6.17.0
- react-toastify: ^9.1.3

## Dev Dependencies

- @types/react: ^18.2.15
- @types/react-dom: ^18.2.7
- @vitejs/plugin-react: ^4.0.3
- autoprefixer: ^10.4.16
- eslint: ^8.45.0
- eslint-plugin-react: ^7.32.2
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.3
- postcss: ^8.4.31
- tailwindcss: ^3.3.3
- vite: ^4.4.5

## Environment Variable

- **VITE_API_URI**: The URL of the backend API.

