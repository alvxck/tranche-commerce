
export class MissingTokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingTokenError";
    }

    public statusCode = 401;
}

export class InvalidTokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidTokenError";
    }

    public statusCode = 401;
}

export class DatabaseConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseConnectionError";
    }

    public statusCode = 500;
}