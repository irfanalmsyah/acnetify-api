import { ACNE_TYPE } from "@interfaces/enum.interface"
import { cancelUpvoteReview, createReview, getReviews, getReviewsByAcneType, upvoteReview } from "@services/review.service"
import { responseError, responseSuccess } from "@utils/http.util"
import { validate } from "@utils/validator.util"
import { Request, Response } from "express"
import httpContext from "express-http-context"

export const createReviewController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const { acne_type, body } = req.body
        const userId = httpContext.get("user_id")
        const username = httpContext.get("username")
        const review = await createReview(acne_type, body, userId, username)
        
        responseSuccess(res, review)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const getReviewsController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const offset = parseInt(req.query.offset as string) || 0
        const limit = parseInt(req.query.limit as string) || 10
        const reviews = await getReviews(offset, limit, httpContext.get("user_id"))
        
        responseSuccess(res, reviews)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const getReviewsByAcneTypeController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const acneType = req.params.acne_type as ACNE_TYPE
        const offset = parseInt(req.query.offset as string) || 0
        const limit = parseInt(req.query.limit as string) || 10
        const reviews = await getReviewsByAcneType(acneType, offset, limit, httpContext.get("user_id"))
        
        responseSuccess(res, reviews)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const upvoteReviewController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const reviewId = req.params.reviewId
        const userId = httpContext.get("user_id")
        await upvoteReview(reviewId, userId)
        
        responseSuccess(res, null)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const cancelUpvoteReviewController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const reviewId = req.params.reviewId
        const userId = httpContext.get("user_id")
        await cancelUpvoteReview(reviewId, userId)
        
        responseSuccess(res, null)
    } catch (error: unknown) {
        responseError(res, error)
    }
}