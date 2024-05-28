import { validAcneTypes } from "@interfaces/constant.interface"
import { checkSchema } from "express-validator"

export const getMyImagesByAcneTypeSchema = checkSchema({
    acne_type: {
        in: ["params"],
        isIn: {
            errorMessage: `acne_type must be one of the following: ${validAcneTypes.join(", ")}`,
            options: [validAcneTypes]
        }
    }
})