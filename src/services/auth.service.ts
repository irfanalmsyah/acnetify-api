import { addDocument, userRef } from "@db/firestore"
import { UserDTO } from "@interfaces/dto.interface"
import { ConflictError, UnauthenticatedError } from "@interfaces/error.interface"
import { User } from "@interfaces/model.interface"
import { comparePassword, createJWT, hashPassword } from "@utils/auth.util"


export const createUserWithUsernameAndPassword = async (username: string, password: string) => {
    if (await isUserExists(username)) {
        throw new ConflictError("Username already exists")
    }

    const hashedPassword = await hashPassword(password)

    const user : User = {
        username,
        password: hashedPassword,
    }

    return addDocument(userRef, user)
}

export const getUserSnapshot = async (username: string) => {
    return userRef.where("username", "==", username).get()
}

export const authenticateUser = async (username: string, password: string) => {
    const userSnapshot = await getUserSnapshot(username)
    if (userSnapshot.empty) {
        throw new UnauthenticatedError("Username or password is incorrect")
    }

    const userData = userSnapshot.docs[0].data()
    const isPasswordMatch = await comparePassword(password, userData.password)
    if (!isPasswordMatch) {
        throw new UnauthenticatedError("Username or password is incorrect")
    }

    return userSnapshot.docs[0]
}

export const createAuthToken = async (username: string, password: string) => {
    const userSnapshot = await getUserSnapshot(username)
    if (userSnapshot.empty) {
        throw new UnauthenticatedError("Username or password is incorrect")
    }

    const userData = userSnapshot.docs[0].data()
    const isPasswordMatch = await comparePassword(password, userData.password)
    if (!isPasswordMatch) {
        throw new UnauthenticatedError("Username or password is incorrect")
    }

    const user: UserDTO = {
        id: userSnapshot.docs[0].id,
        username: userData.username,
    }

    return createJWT(user)
}

export const isUserExists = async (username: string) => {
    const snapshot = await userRef.where("username", "==", username).limit(1).get()
    return !snapshot.empty
}