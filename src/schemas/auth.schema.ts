import { checkSchema } from "express-validator"

export const registerSchema = checkSchema({
    username: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "username is required"
        },
        isAlphanumeric: {
            errorMessage: "username must be alphanumeric"
        },
        isLength: {
            errorMessage: "username must be at least 3 characters and at most 32 characters long",
            options: {
                min: 3,
                max: 32
            }
        },
        toLowerCase: true,
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "password is required"
        },
        isString: {
            errorMessage: "password must be a string"
        },
        isLength: {
            errorMessage: "password must be at least 8 characters long and at most 64 characters long",
            options: {
                min: 8,
                max: 64
            }
        },
    }
})

export const loginSchema = checkSchema({
    username: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "username is required"
        },
        isAlphanumeric: {
            errorMessage: "username must be alphanumeric"
        },
        isLength: {
            errorMessage: "username must be at least 3 characters long and at most 32 characters long",
            options: {
                min: 3,
                max: 32
            }
        },
        toLowerCase: true,
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "password is required"
        },
        isString: {
            errorMessage: "password must be a string"
        },
        isLength: {
            errorMessage: "password must be at least 8 characters long and at most 64 characters long",
            options: {
                min: 8,
                max: 64
            }
        },
    }
})