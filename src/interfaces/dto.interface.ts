import { ACNE_TYPE } from "./enum.interface"

export interface UserJWTDTO {
    user_id: string
    username: string
    iat: number
    exp: number
}

export interface UserDTO {
    id: string
    username: string
}

export interface UserAuthDTO {
    id: string
    username: string
    token: string
}

export interface ReviewDTO {
    id: string
    user_id: string
    user_username: string
    body: string
    upvote: number
    is_liked: boolean
    acne_type?: ACNE_TYPE
    created_at: number
}

export interface ImageSubmissionDTO {
    id: string
    image_url: string
    acne_type?: ACNE_TYPE
    created_at: number
}