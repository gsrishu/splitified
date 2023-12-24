export interface IReturn{
    statusCode:number,
    success:boolean,
    message:string
}

export interface IConfig{
    JWT_SECRET:string,
    DATABASE_URL:string,
    PORT:number
}

export interface ILogin{
    statusCode:number,
    success:boolean,
    message:string,
    authToken?:string
}