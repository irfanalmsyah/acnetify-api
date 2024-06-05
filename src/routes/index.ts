import { loginController, registerController } from "@controllers/auth.controller"
import { loginSchema, registerSchema } from "@schemas/auth.schema"
import { Router } from "express"
import { cancelUpvoteReviewController,
    createReviewController,
    getReviewsByAcneTypeController,
    getReviewsController,
    upvoteReviewController
} from "@controllers/review.controller"
import { createReviewSchema, getReviewsByAcneTypeSchema, getReviewsSchema } from "@schemas/review.schema"
import { loginRequired, imageUploadMiddleware, publicMiddleware } from "./middleware.route"
import { getMyImagesByAcneTypeController, getMyImagesController, uploadAcneImageController } from "@controllers/image.controller"
import { getMyImagesByAcneTypeSchema } from "@schemas/image.schema"

const authRoutes = Router()
authRoutes.post("/register", registerSchema, registerController)
authRoutes.post("/login", loginSchema, loginController)

const reviewRoutes = Router()
reviewRoutes.get("/", publicMiddleware, getReviewsSchema, getReviewsController)
reviewRoutes.post("/", loginRequired, createReviewSchema, createReviewController)
reviewRoutes.get("/:acne_type", publicMiddleware, getReviewsByAcneTypeSchema, getReviewsByAcneTypeController)
reviewRoutes.put("/:reviewId/upvote", loginRequired, upvoteReviewController)
reviewRoutes.put("/:reviewId/cancel-upvote", loginRequired, cancelUpvoteReviewController)

const imageRoutes = Router()
imageRoutes.get("/", loginRequired, getMyImagesController)
imageRoutes.get("/:acne_type", loginRequired, getMyImagesByAcneTypeSchema, getMyImagesByAcneTypeController)
imageRoutes.post("/upload", loginRequired, imageUploadMiddleware, uploadAcneImageController)

const baseRoutes = Router()
baseRoutes.use("/auth", authRoutes)
baseRoutes.use("/review", reviewRoutes)
baseRoutes.use("/image", imageRoutes)

export default baseRoutes