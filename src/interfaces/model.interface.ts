import { ACNE_TYPE } from "./enum.interface"

export interface BaseEntity {
    id: string
    created_at: number
}

export interface User {
    username: string
    password: string
}

export interface ExtendedUser extends BaseEntity, User {}

export interface Review {
    user_id: string
    user_username: string
    acne_type: ACNE_TYPE
    body: string
    upvote: string[]
}

export interface ExtendedReview extends BaseEntity, Review {}

export interface ImageSubmission {
    user_id: string
    image_url: string
    acne_type: ACNE_TYPE
}

export interface ExtendedImageSubmission extends BaseEntity, ImageSubmission {}