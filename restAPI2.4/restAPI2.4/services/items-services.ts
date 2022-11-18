import UsersServices from "./users-services";
import {Task, User, UsersObj} from "../config/modules";
import dotenv from "dotenv";
import {UserModel} from "../config/schemas";
import GeneralFunc from "./general";
dotenv.config()


let dataConfig: boolean | undefined
if (process.env.GETDATAFROM_DB) {
    dataConfig = !!process.env.GETDATAFROM_DB.includes('true')
}
const UServices = new UsersServices()

export default class ItemsServices extends GeneralFunc{
    async getItems(reqUser: User){
        if (reqUser) {
            if (!dataConfig && dataConfig !== undefined) {
                return reqUser.tasks
            }
            else if (dataConfig) {
                const user = await UserModel.findOne({login: reqUser.login, pass: reqUser.pass})
                if (user) {
                    return user.tasks
                }
            }
        }

    }

    async addItem(reqUser: User, text: string) {
        const id = this.getRandomID(5)
        if (reqUser) {
            if (!dataConfig && dataConfig !== undefined) {
                const users: UsersObj = UServices.getUsers()
                const currentUser: { id: string, tasks: { text: string, id: string, checked: boolean }[] } | undefined = users.users.find((e) => e.id === reqUser.id)
                if (currentUser) {
                    currentUser.tasks.push({text, id, checked: false})
                    users.users[users.users.findIndex((e) => e.id === reqUser.id)] = currentUser
                }
                this.writeFile(users)
                return {id}
            }
            else if (dataConfig) {
                const user = await UserModel.findOne(({login: reqUser.login, pass: reqUser.pass}))
                if (user) {
                    const tasks = user.tasks
                    tasks.push({text: text, id: id, checked: false})
                    Object.assign(user.tasks, tasks)
                    await user.save()
                    return {id}
                }
            }
        }
    }

    async updateItem(reqUser: User, task: Task) {

        if (reqUser) {
            if (!dataConfig && dataConfig !== undefined) {
                const users: UsersObj = UServices.getUsers()
                reqUser.tasks[reqUser.tasks.findIndex((e: Task) => e.id === task.id)] = task
                users.users[users.users.findIndex((e: {id: string}) => e.id === reqUser.id)] = reqUser
                this.writeFile(users)
                return {ok: true}
            }
            else if (dataConfig) {
                const user = await UserModel.findOne({login: reqUser.login, pass: reqUser.pass})
                if (user) {
                    const tasks = user.tasks
                    tasks[tasks.findIndex((e) => e.id === task.id)] = task
                    Object.assign(user.tasks, tasks)
                    await user.save()
                    return {ok: true}
                }
            }
        }
    }

    async deleteItem(reqUser: User, id: string) {
        if (reqUser) {
            if (!dataConfig && dataConfig !== undefined) {
                const users: UsersObj = UServices.getUsers()
                reqUser.tasks.splice((reqUser.tasks.findIndex((e: Task) => e.id === id)), 1)
                users.users[users.users.findIndex((e: {id: string}) => e.id === reqUser.id)] = reqUser
                this.writeFile(users)
                return {ok: true}
            }
            else if (dataConfig) {
                const user = await UserModel.findOne({login: reqUser.login, pass: reqUser.pass})
                if (user) {
                    const tasks = user.tasks
                    tasks.splice((tasks.findIndex((e: Task) => e.id === id)), 1)
                    user.tasks = tasks
                    await user.save()
                    return {ok: true}
                }
            }
        }
    }
}