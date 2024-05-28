import { UserAuthDTO } from "@interfaces/dto.interface"
import { authenticateUser, createUserWithUsernameAndPassword } from "@services/auth.service"
import { createJWT } from "@utils/auth.util"
import { responseSuccess, responseError } from "@utils/http.util"
import { validate } from "@utils/validator.util"
import { Request, Response } from "express"

export const registerController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const { username, password } = req.body
        const user = await createUserWithUsernameAndPassword(username, password)
        
        const responseBody : UserAuthDTO = {
            id: user.id,
            username: username,
            token: createJWT({user_id: user.id, username: username})
        }
        responseSuccess(res, responseBody)
    } catch (error: unknown) {
        responseError(res, error)
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        validate(req)

        const { username, password } = req.body
        const user = await authenticateUser(username, password)
        
        const responseBody : UserAuthDTO = {
            id: user.id,
            username: username,
            token: createJWT({user_id: user.id, username: username})
        }
        responseSuccess(res, responseBody)
    } catch (error: unknown) {
        responseError(res, error)
    }
}