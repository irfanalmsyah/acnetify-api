import { ConflictError, ForbiddenError, NotFoundError, UnauthenticatedError, ValidatorError } from "@interfaces/error.interface"
import { Response } from "express"
import { constants } from "http2"
import { JsonWebTokenError } from "jsonwebtoken"

export const responseHandler = (
    res: Response,
    status: number,
    data: unknown | null,
    message = "",
    error: unknown | null
) => {
    let payload = {}
    if (error) {
        if (error instanceof Error) {
            payload = {
                message: error.message,
            }
        } else {
            payload = {
                message: "Internal Server Error, please contact the administrator."
            }
        }
    } else {
        if (data === null) {
            payload = {
                message
            }
        } else {
            payload = {
                message,
                data,
            }
        }
    }

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Accept", "application/json")
    res.status(status).json(payload)
}

export const responseSuccess = (
    res: Response,
    data: unknown,
    message = "success"
) => {
    responseHandler(
        res,
        constants.HTTP_STATUS_OK,
        data,
        message,
        null
    )
}

export const responseError = (
    res: Response,
    error: unknown,
    message = "Error"
) => {
    let status : number
    switch (error instanceof Error) {
    case error instanceof ValidatorError:
        status = constants.HTTP_STATUS_BAD_REQUEST
        break
    case error instanceof UnauthenticatedError || error instanceof JsonWebTokenError:
        status = constants.HTTP_STATUS_UNAUTHORIZED
        break
    case error instanceof ForbiddenError:
        status = constants.HTTP_STATUS_FORBIDDEN
        break
    case error instanceof NotFoundError:
        status = constants.HTTP_STATUS_NOT_FOUND
        break
    case error instanceof ConflictError:
        status = constants.HTTP_STATUS_CONFLICT
        break
    default:
        status = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        console.error(error)
    }
        
    responseHandler(
        res,
        status,
        null,
        message,
        error
    )
}