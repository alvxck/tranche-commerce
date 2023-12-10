import express, { Request, Response } from 'express';
import { createHandler } from 'graphql-http';
import cors from 'cors';
import dotenv from 'dotenv';
import gql from "graphql-tag";
import morgan from "morgan";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from './graphql/resolvers';
import { logger } from './middleware/logger';
import { readFileSync } from "fs";

dotenv.config();

// Express configuration
const app = express();
const port = process.env.port || 3000;
const allowedOrigins = ["https://localhost:5173"]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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

// GraphQL configuration
const typeDefs = gql(
    readFileSync("", {
        encoding: "utf-8",
    })
)

// TODO: Add shxt ton of typeDefs and resolvers from .graphql files
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers})
});

// Start Apollo server
await server.start();

// Middlewares
app.use(
    logger,
    expressMiddleware(server)
);

// Healthcheck
app.get("/healthcheck", (req: Request, res: Response):void => {
    res.status(200).send("Express server is running...");
});

// Start server
const instance = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export {app as server, instance};
