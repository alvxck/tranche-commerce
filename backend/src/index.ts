import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql/config.js';
import { logger } from './middleware/logger.js';
import { auth } from './middleware/auth.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config();

// Express server configuration
const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins: string[] = ["https://localhost:5173"];

app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    morgan("dev"),
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

// Apollo server configuration
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers})
});

await server.start();

// Middlewares
app.use(
    logger,
    auth,
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
