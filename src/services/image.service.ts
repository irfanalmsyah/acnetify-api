import { addDocument, imageSubmissionRef } from "@db/firestore"
import { ImageSubmissionDTO } from "@interfaces/dto.interface"
import { ACNE_TYPE } from "@interfaces/enum.interface"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { bucket } from "./bucket.service"

import { Express } from "express"

import * as tf from "@tensorflow/tfjs-node"
import app from "@server"
import { loadModel } from "./loadmodel.service"


const ACNE_TYPE_MAP: { [key: number]: ACNE_TYPE } = {
    0: ACNE_TYPE.ACNE_NODULES,
    1: ACNE_TYPE.BLACKHEAD,
    2: ACNE_TYPE.MILIA,
    3: ACNE_TYPE.PAPULA_PUSTULA,
    4: ACNE_TYPE.WHITEHEAD
}

export const predictAcneType = async (image: Buffer) => {
    try {
        const tensor = tf.node
            .decodeImage(image)
            .resizeBilinear([150, 150])
            .div(tf.scalar(255))
            .expandDims(0)

        const prediction = app.get("model").predict(tensor) as tf.Tensor

        const score = prediction.dataSync()
        console.log("Prediction scores:", score)

        const maxScoreIndex = score.indexOf(Math.max(...score))

        console.log("Selected index:", maxScoreIndex)

        const result = ACNE_TYPE_MAP[maxScoreIndex] || null

        console.log("Predicted Acne Type:", result)

        return result

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error occurred: ${error.message}`)
        } else {
            throw new Error("An unknown error occurred")
        }
    }
}

export const uploadImageToStorage = async (image: Buffer) => {
    const timestamp = moment().format("YYYY-MM-DD_at_HH.mm.ss")
    const uuid = uuidv4().slice(0, 8)

    const fileName = `acne_image_${timestamp}_${uuid}.jpg`
    const file = bucket.file(fileName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: "image/jpeg",
        },
        resumable: false,
    })

    return new Promise<string>((resolve, reject) => {
        stream.on("error", (err: Error) => {
            reject(new Error(`Failed to upload image: ${err.message}`))
        })

        stream.on("finish", async () => {
            await file.makePublic()
            resolve(`https://storage.googleapis.com/${bucket.name}/${file.name}`)
        })

        stream.end(image)
    })
}

export const createImageSubmission = async (
    userId: string,
    imageURL: string,
    acneType: ACNE_TYPE
) : Promise<ImageSubmissionDTO> => {
    const imageSubmission = addDocument(imageSubmissionRef, {
        user_id: userId,
        image_url: imageURL,
        acne_type: acneType,
    })

    return {
        id: (await imageSubmission).id,
        image_url: imageURL,
        acne_type: acneType,
        created_at: Date.now(),
    }
}

export const getImagesByUserId = async (userId: string): Promise<ImageSubmissionDTO[]> => {
    const images = await imageSubmissionRef.where("user_id", "==", userId).get()
    return images.docs.map((image) => {
        const data = image.data()
        return {
            id: image.id,
            image_url: data.image_url,
            acne_type: data.acne_type,
            created_at: data.created_at,
        }
    })
}

export const getImagesByAcneType = async (userId: string, acneType: ACNE_TYPE): Promise<ImageSubmissionDTO[]> => {
    const images = await imageSubmissionRef.where("user_id", "==", userId).where("acne_type", "==", acneType).get()
    return images.docs.map((image) => {
        const data = image.data()
        return {
            id: image.id,
            image_url: data.image_url,
            created_at: data.created_at,
        }
    })
}

export const addModelToApp = async (app: Express) => {
    const model = await loadModel()
    app.set("model", model)
    console.log("Model loaded successfully")
}