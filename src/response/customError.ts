import { v4 as uuidv4 } from 'uuid';
export class splitifiedError extends Error {
  traceId:string
  code: number
  process: string
  service: string
  date:Date
  constructor(message: string, code = 400, process = '', service = '') {
    super(message)
    this.name = 'splitifiedError'
    this.traceId = uuidv4()
    this.code = code
    this.process = process
    this.service = service
    this.date = new Date()
  }
}
