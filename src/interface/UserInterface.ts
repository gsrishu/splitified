
export interface IUser {
  _id?:string,
  userName: string
  email: string
  password: string
}

export interface ILoginUser {
  userName: string
  password: string
}
