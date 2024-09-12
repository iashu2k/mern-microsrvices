import { CustomError } from './custom-error';

export class NotAuthError extends CustomError {
    constructor() {
        super('Not Authorized')
        Object.setPrototypeOf(this, NotAuthError.prototype)
    }
    statusCode = 401;
    serializeErrors = () => [{ message: 'Not Authorized' }]

}