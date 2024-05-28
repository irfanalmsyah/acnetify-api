import { validAcneTypes } from "@interfaces/constant.interface"
import { checkSchema } from "express-validator"


export const createReviewSchema = checkSchema({
    acne_type: {
        in: ["body"],
        notEmpty: {
            errorMessage: "acne_type is required"
        },
        isIn: {
            errorMessage: `acne_type must be one of the following: ${validAcneTypes.join(", ")}`,
            options: [validAcneTypes]
        }
    },
    body: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "body is required"
        },
        isString: {
            errorMessage: "body must be a string"
        },
        isLength: {
            errorMessage: "body must be at least 3 characters long and at most 1000 characters long",
            options: {
                min: 3,
                max: 1000
            }
        },
        escape: true,
        stripLow: true,
    },
})

export const getReviewsSchema = checkSchema({
    offset: {
        in: ["query"],
        optional: true,
        isInt: {
            errorMessage: "offset must be an integer",
        },
        isLength: {
            errorMessage: "offset must be at least 0",
            options: {
                min: 0,
            }
        },
        toInt: true,
    },
    limit: {
        in: ["query"],
        optional: true,
        isInt: {
            errorMessage: "limit must be an integer",
        },
        isLength: {
            errorMessage: "limit must be at least 1 and at most 10",
            options: {
                min: 1,
                max: 10,
            }
        },
        toInt: true,
    },
})

export const getReviewsByAcneTypeSchema = checkSchema({
    offset: {
        in: ["query"],
        optional: true,
        isInt: {
            errorMessage: "offset must be an integer",
        },
        isLength: {
            errorMessage: "offset must be at least 0",
            options: {
                min: 0,
            }
        },
        toInt: true,
    },
    limit: {
        in: ["query"],
        optional: true,
        isInt: {
            errorMessage: "limit must be an integer",
        },
        isLength: {
            errorMessage: "limit must be at least 1 and at most 10",
            options: {
                min: 1,
                max: 10,
            }
        },
        toInt: true,
    },
    acne_type: {
        in: ["params"],
        isIn: {
            errorMessage: `acne_type must be one of the following: ${validAcneTypes.join(", ")}`,
            options: [validAcneTypes]
        }
    }
})