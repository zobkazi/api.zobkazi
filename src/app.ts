import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import connectToDatabase from "./utils/connectToDatabase";


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Use the routes
app.use('/api', router);


// Serve the API home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Home Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            header {
                background: #007BFF;
                color: #fff;
                padding: 10px 20px;
                text-align: center;
            }
            .container {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                margin-bottom: 20px;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin: 10px 0;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            footer {
                text-align: center;
                margin-top: 20px;
                font-size: 0.9em;
                color: #777;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Welcome to My API</h1>
        </header>
        <div class="container">
            <h2>API Endpoints</h2>
            <ul>
                <li><strong>Auth Endpoints:</strong></li>
                <ul>
                    <li><a href="/api/auth/register">POST /api/auth/register</a> - Register a new user</li>
                    <li><a href="/api/auth/login">POST /api/auth/login</a> - Login a user</li>
                    <li><a href="/api/auth/logout">POST /api/auth/logout</a> - Logout a user</li>
                    <li><a href="/api/auth/delete">DELETE /api/auth/delete</a> - Delete a user</li>
                </ul>
                <li><strong>User Endpoints:</strong></li>
                <ul>
                    <li><a href="/api/users">GET /api/users</a> - Get all users</li>
                    <li><a href="/api/users/:username">GET /api/users/:username</a> - Get user by username</li>
                    <li><a href="/api/users/:id">PUT /api/users/:id</a> - Update user</li>
                    <li><a href="/api/users/:id">DELETE /api/users/:id</a> - Delete user</li>
                </ul>
                <li><strong>Blog Endpoints:</strong></li>
                <ul>
                    <li><a href="/api/blogs">GET /api/blogs</a> - Get all blogs</li>
                    <li><a href="/api/blogs">POST /api/blogs</a> - Create a new blog</li>
                    <li><a href="/api/blogs/:slug">GET /api/blogs/:slug</a> - Get blog by slug</li>
                    <li><a href="/api/blogs/:slug">PUT /api/blogs/:slug</a> - Update a blog</li>
                    <li><a href="/api/blogs/:slug">DELETE /api/blogs/:slug</a> - Delete a blog</li>
                </ul>
            </ul>
            <h2>About</h2>
            <p>This is a simple API for managing users and blogs. Use the endpoints above to interact with the resources.</p>
        </div>
        <footer>
            <p>&copy; ${new Date().getFullYear()} My API. All rights reserved.</p>
        </footer>
    </body>
    </html>
  `);
});

// 500 handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

connectToDatabase();

export default app;
