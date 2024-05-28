import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import { env } from "@config/env"
import { UserJWTDTO } from "@interfaces/dto.interface"

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

export const createJWT = (data: object) => {
    return jsonwebtoken.sign(data, env.JWT_SECRET, { expiresIn: "30d" })
}

export const verifyJWT = (token: string) => {
    return jsonwebtoken.verify(token, env.JWT_SECRET) as UserJWTDTO
}