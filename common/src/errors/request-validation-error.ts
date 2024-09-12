import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string;
//     }[]
// }
// We are not using interface because we are using instaceof check and interface will not translate to js and fallout but abstract class will remain

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]){
        // passing to the Error object 
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors = () => {
        return this.errors.map(error => {
            if (error.type === 'field') {
                return {message: error.msg, field: error.path};
            }
            return {message: error.msg}
        })

        
    }
}