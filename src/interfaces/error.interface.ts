export class ValidatorError extends Error {
    constructor(msg: string) {
        super(`Validation Error: ${msg}`)

        Object.setPrototypeOf(this, ValidatorError.prototype)
    }
}

export class ConflictError extends Error {
    constructor(msg: string) {
        super(`Conflict Error: ${msg}`)

        Object.setPrototypeOf(this, ConflictError.prototype)
    }
}

export class NotFoundError extends Error {
    constructor(msg: string) {
        super(`Not Found Error: ${msg}`)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class UnauthenticatedError extends Error {
    constructor(msg: string) {
        super(`Unauthenticated Error: ${msg}`)

        Object.setPrototypeOf(this, UnauthenticatedError.prototype)
    }
}
export class ForbiddenError extends Error {
    constructor(msg: string) {
        super(`Forbidden Error: ${msg}`)

        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}