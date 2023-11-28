import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import express, { Request, Response } from 'express';
import { createHandler } from 'graphql-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { schema } from './models/schema'


dotenv.config();

// Express configuration
const app = express();
const port = process.env.port || 3000;
const allowedOrigins = ["https://localhost:5173"]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Origin not allowed by CORS"));
            }
        },
    }),
);

app.all("/graphql", createHandler({ schema }));

// Logger
// app.use();

// Middlewares
// app.use();

// Routes
// app.use();

// Healthcheck
app.get("/healthcheck", (req: Request, res: Response):void => {
    res.status(200).send("Server is running. Healthcheck OK.");
});

// Start server
const instance = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

export {app as server, instance};
