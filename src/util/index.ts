

export function returnFunction(httpCode:number,status:boolean,message:string){

    return {
        statusCode: httpCode,
        success: status,
        message: message,
      }

}