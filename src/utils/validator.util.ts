import { ValidatorError } from "@interfaces/error.interface"
import { Request } from "express"
import { validationResult } from "express-validator"

export const validate = (
    req: Request
): void | never => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        throw new ValidatorError(`${error.array().map((err) => err.msg).join(", ")}`)
    }
}

export const requiredMessage = (field: string): string => {
    return `${field} is required`
}