import { addDocument, reviewRef } from "@db/firestore"
import { ReviewDTO } from "@interfaces/dto.interface"
import { ACNE_TYPE } from "@interfaces/enum.interface"
import { ConflictError, NotFoundError } from "@interfaces/error.interface"

export const createReview = async (
    acne_type: ACNE_TYPE,
    body: string,
    user_id: string,
    username: string
) : Promise<ReviewDTO> => {
    const review = addDocument(reviewRef, {
        acne_type: acne_type,
        body: body,
        user_id: user_id,
        upvote: [],
        user_username: username,
        upvote_count: 0,
    })

    return {
        id: (await review).id,
        user_id: user_id,
        user_username: username,
        body: body,
        upvote: 0,
        is_liked: false,
        acne_type: acne_type,
        created_at: Date.now(),
    }
}

export const getReviews = async (
    offset: number,
    limit: number,
    userId: string
) : Promise<ReviewDTO[]> => {
    const reviews = await reviewRef
        .orderBy("created_at", "desc")
        .offset(offset)
        .limit(limit)
        .get()

    return reviews.docs.map((review) => {
        const data = review.data()
        const isLiked = data.upvote.includes(userId)
        return {
            id: review.id,
            user_id: data.user_id,
            user_username: data.user_username,
            body: data.body,
            upvote: data.upvote_count,
            is_liked: isLiked,
            acne_type: data.acne_type,
            created_at: data.created_at,
        }
    })
}

export const getReviewsByAcneType = async (
    acneType: ACNE_TYPE,
    offset: number,
    limit: number,
    userId: string
) : Promise<ReviewDTO[]> => {
    const reviews = await reviewRef
        .where("acne_type", "==", acneType)
        .orderBy("upvote_count", "desc")
        .offset(offset)
        .limit(limit)
        .get()

    return reviews.docs.map((review) => {
        const data = review.data()
        const isLiked = data.upvote.includes(userId)
        return {
            id: review.id,
            user_id: data.user_id,
            user_username: data.user_username,
            body: data.body,
            upvote: data.upvote_count,
            is_liked: isLiked,
            created_at: data.created_at,
        }
    })
}

export const upvoteReview = async (reviewId: string, user_id: string) => {
    const review = await reviewRef.doc(reviewId).get()
    const reviewData = review.data()
    if (!reviewData) {
        throw new NotFoundError("Review not found")
    }

    const upvote = reviewData.upvote || []
    if (upvote.includes(user_id)) {
        throw new ConflictError("User already upvoted this review")
    }

    upvote.push(user_id)
    await reviewRef.doc(reviewId).update({ 
        upvote,
        upvote_count: upvote.length
    })
}

export const cancelUpvoteReview = async (reviewId: string, user_id: string) => {
    const review = await reviewRef.doc(reviewId).get()
    const reviewData = review.data()
    if (!reviewData) {
        throw new NotFoundError("Review not found")
    }

    const upvote = reviewData.upvote || []
    if (!upvote.includes(user_id)) {
        throw new ConflictError("User has not upvoted this review")
    }

    const newUpvote = upvote.filter((upvote: string) => upvote !== user_id)
    await reviewRef.doc(reviewId).update({
        upvotes: newUpvote,
        upvote_count: newUpvote.length
    })
}