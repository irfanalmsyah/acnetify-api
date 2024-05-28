// TODO: Remove the following line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDocument, imageSubmissionRef } from "@db/firestore"
import { ImageSubmissionDTO } from "@interfaces/dto.interface"
import { ACNE_TYPE } from "@interfaces/enum.interface"

export const predictAcneType = async (image: Buffer) => {
    // TODO: Implement image classification model
    return ACNE_TYPE.ACNE_NODULES
}

export const uploadImageToStorage = async (image: Buffer) => {
    // TODO: Implement image upload to cloud storage
    return "https://example.com/image.jpg"
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