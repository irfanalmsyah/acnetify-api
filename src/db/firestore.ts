import { env } from "@config/env";
import { CollectionReference, DocumentData, DocumentReference, Firestore } from "@google-cloud/firestore"

export const db = new Firestore({
    projectId: env.GOOGLE_CLOUD_PLATFORM_PROJECT_ID,
    keyFilename: env.GCP_KEY_FILE_PATH
  });

export const userRef = db.collection("user")
export const reviewRef = db.collection("review")
export const imageSubmissionRef = db.collection("image_submission")

export async function addDocument<T extends DocumentData>(
    collection: CollectionReference<T>,
    data: T
): Promise<DocumentReference<T>> {
    const documentWithTimestamp = {
        ...data,
        created_at: Date.now(),
    }
    return collection.add(documentWithTimestamp)
}