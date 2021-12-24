import { BaseController, Controller } from "./BaseController.ts"
import { parseBody } from "../helpers.ts"
import { Users } from "../database.ts"
import { Bson, Status } from "../deps.ts"

type UserController = BaseController & {
  getEmails: Controller<"/:id/emails">
}

export const usersController: UserController = {
  async find(res) {

    const users = await Users
      .find({}, { noCursorTimeout: false })
      .toArray()

    return res.success({ users })
  },
  async findOne(res, ctx) {
    const _id = new Bson.ObjectId(ctx.params.id)
    const user = await Users.findOne({ _id }, { noCursorTimeout: false })

    if (!user) return res
      .status(Status.NotFound)
      .error({ message: 'User Not Found!' })

    return res.success({ user })
  },
  async save(res, ctx) {
    const body = await parseBody(ctx.request)

    const userId = await Users.insertOne(body)
    const user = await Users.findOne({ _id: userId }, { noCursorTimeout: false })

    return res.success({ user })
  },
  updateOne() { },
  async deleteOne(res, ctx) {
    const _id = new Bson.ObjectId(ctx.params.id)
    const isDeleted = await Users.deleteOne({ _id })

    if (!isDeleted) return res.error({
      message: "User not found or Something wrong while deleting user."
    })

    return res.success({ message: 'User deleted successfully!' })
  },
  getEmails(res, ctx) {
    return res.success({
      emails: [],
      id: ctx.params.id
    })
  }
}