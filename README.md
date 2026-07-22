# TaskFlow App

TaskFlow App is a simple task management application that allows users to create, view, update, and delete tasks through a web interface. The project uses Node.js and Express on the server side, MongoDB for data persistence, and vanilla JavaScript for the client.

## Features

- Add new tasks
- View all tasks in a list
- Edit existing tasks
- Delete tasks
- Track the total number of tasks
- Persist task data in MongoDB

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Development Tool: Nodemon

## Project Structure

```text
TaskFlow_App/
├── app/
│   ├── config/
│   │   └── db.js
│   └── models/
│       └── tasks.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── package.json
├── server.js
└── README.md
```

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm
- A MongoDB instance or MongoDB Atlas connection string

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd TaskFlow_App
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following values:

```env
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/taskflow
```

Replace the `DB_URL` value with your own MongoDB connection string if needed.

## Running the Application

Start the development server with:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## API Endpoints

The server exposes the following API routes:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## Notes

- The frontend files are served from the `public` directory.
- The backend connects to MongoDB when the server starts.
- If you want to use a cloud database, update `DB_URL` in the `.env` file accordingly.
