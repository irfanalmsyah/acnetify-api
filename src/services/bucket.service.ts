import { env } from "@config/env"
import { Storage } from "@google-cloud/storage"

const storage = new Storage({
    projectId: env.GOOGLE_CLOUD_PLATFORM_PROJECT_ID,
    keyFilename: env.GCP_KEY_FILE_PATH
})

export const bucket = storage.bucket("image-capstone-acnetify")


