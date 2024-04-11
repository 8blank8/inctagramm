import { Request } from "express"

export type ReqWithUser = Request & { userId: string, deviceId: string }