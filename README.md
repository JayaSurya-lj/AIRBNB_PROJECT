# WANDERLUST

### Description
Wanderlust is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It is designed for travelers to explore destinations, share experiences, and plan their next adventure seamlessly.

---

## Demo
Explore the live demo of Wanderlust: https://airbnb-project-1-wwgo.onrender.com/listings

---

## Features
- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Destination Exploration**: Browse a curated list of popular travel destinations.
- **Community Sharing**: Post travel stories, photos, and reviews.
- **Personalized Planning**: Save favorite destinations and create itineraries.
- **Interactive UI**: A responsive and intuitive interface powered by React.js.

---

## Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   ```

2. **Navigate to the project folder**:  
   ```bash
   cd wanderlust
   ```

3. **Install dependencies** for the client and server:  
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. **Set up environment variables**:  
   Create a `.env` file in the `server` directory and provide the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. **Run the application**:  
   Start the server and client:
   ```bash
   cd server
   npm start
   cd ../client
   npm start
   ```

6. **Access the application**:  
   Open your browser and visit `http://localhost:3000`.

---

## Usage
After launching the application, users can:
- Sign up or log in to access personalized features.
- Explore a range of destinations with images and detailed descriptions.
- Share travel experiences, comment on other users' posts, and engage with the community.
- Save destinations to a wishlist for easy reference.
- Create and manage travel itineraries.

---

## Tech Stack
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## Contributing
We welcome contributions to enhance Wanderlust! To contribute, follow these steps:

1. **Fork the repository**:  
   Click on the "Fork" button in this repository.

2. **Clone your forked repository**:  
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   ```

3. **Create a new branch**:  
   ```bash
   git checkout -b feature/new-feature
   ```

4. **Make your changes** and commit them:  
   ```bash
   git commit -m "Add new feature"
   ```

5. **Push to your branch**:  
   ```bash
   git push origin feature/new-feature
   ```

6. **Submit a pull request**:  
   Open a pull request in the original repository and provide details about your changes.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
