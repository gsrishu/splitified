import { httpStatusCode } from "../response"

export function returnFunction(httpCode:number,status:boolean,message:string){

    return {
        statusCode: httpCode,
        success: status,
        message: message,
      }

}

export function validateReturn(error:any){

  return{
    statusCode:httpStatusCode.clientError.BAD_REQUEST,
    message:error.details[0].message
  }
}