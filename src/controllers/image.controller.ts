import { ACNE_TYPE } from "@interfaces/enum.interface"
import { createImageSubmission, getImagesByAcneType, getImagesByUserId, predictAcneType, uploadImageToStorage } from "@services/image.service"
import { responseSuccess, responseError } from "@utils/http.util"
import { validate } from "@utils/validator.util"
import { Request, Response } from "express"
import httpContext from "express-http-context"

export const uploadAcneImageController = async (req: Request, res: Response) => {
    try {
        const userId = httpContext.get("user_id")
        if (!req.file) {
            throw new Error("Image is required")
        }
        const image = req.file.buffer
        
        const prediction = await predictAcneType(image)
        if (!prediction) {
            responseSuccess(res, null)
            return
        }
        const imageURL = await uploadImageToStorage(image)
        await createImageSubmission(userId, imageURL, prediction)
        console.log("Image URL: ", imageURL)

        responseSuccess(res, prediction)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const getMyImagesController = async (req: Request, res: Response) => {
    try {
        const userId = httpContext.get("user_id")
        const images = await getImagesByUserId(userId)

        responseSuccess(res, images)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const getMyImagesByAcneTypeController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const userId = httpContext.get("user_id")
        const { acne_type } = req.params
        const images = await getImagesByAcneType(userId, acne_type as ACNE_TYPE)

        responseSuccess(res, images)
    } catch (error: unknown) {
        responseError(res, error)
    }
}