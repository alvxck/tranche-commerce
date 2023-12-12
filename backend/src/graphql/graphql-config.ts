import { readFileSync } from "fs";
import gql from "graphql-tag";


export const typeDefs = gql(
    readFileSync("", {
        encoding: "utf-8",
    })
);
export const resolvers = {};
