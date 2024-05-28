import httpContext from "express-http-context"
import { UnauthenticatedError, ValidatorError } from "@interfaces/error.interface"
import { verifyJWT } from "@utils/auth.util"
import { responseError } from "@utils/http.util"
import { NextFunction, Request, Response } from "express"
import multer from "multer"

const storage = multer.memoryStorage()
const uploadMiddleware = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})

export const imageUploadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await new Promise<void>((resolve, reject) => {
            const upload = uploadMiddleware.single("image")
            upload(req, res, (error) => {
                if (error) {
                    if (error instanceof multer.MulterError) {
                        reject(new ValidatorError(error.message))
                    } else {
                        reject(error)
                    }
                } else if (!req.file) {
                    reject(new ValidatorError("Image is required"))
                } else {
                    resolve()
                }
            })
        })
        next()
    } catch (error) {
        responseError(res, error)
    }
}


export const loginRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization) {
            throw new UnauthenticatedError("Bearer authorization header is required")
        }
    
        const [scheme, tokenValue] = req.headers.authorization.split(" ")
        if (scheme !== "Bearer") {
            throw new UnauthenticatedError("Bearer authorization header is required")
        }
    
        if (!tokenValue) {
            throw new UnauthenticatedError("Bearer token is required")
        }
    
        const userData = verifyJWT(tokenValue)
        httpContext.set("user_id", userData.user_id)
        httpContext.set("username", userData.username)
    
        next()
    } 
    catch (error: unknown) {
        responseError(res, error)
    }
}

export const publicMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization) {
            throw new UnauthenticatedError("Bearer authorization header is required")
        }
    
        const [scheme, tokenValue] = req.headers.authorization.split(" ")
        if (scheme !== "Bearer") {
            throw new UnauthenticatedError("Bearer authorization header is required")
        }
    
        if (!tokenValue) {
            throw new UnauthenticatedError("Bearer token is required")
        }
    
        const userData = verifyJWT(tokenValue)
        httpContext.set("user_id", userData.user_id)
        httpContext.set("username", userData.username)
    
        next()
    } 
    catch (error: unknown) {
        next()
    }
}
