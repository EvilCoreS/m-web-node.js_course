import * as fs from "fs";
import {UserModel} from "../config/schemas";
import dotenv from "dotenv";
import GeneralFunc from "./general";
dotenv.config()

let dataConfig: boolean | undefined
if (process.env.GETDATAFROM_DB) {
    dataConfig = !!process.env.GETDATAFROM_DB.includes('true')
}

export default class UsersServices extends GeneralFunc{
    getUsers(){
        return JSON.parse(fs.readFileSync('../restAPI2.4data/data.json').toString())
    }

    async login(obj: {login: string, pass: string}){
        const login = obj.login, pass = obj.pass
        if (!dataConfig && dataConfig !== undefined) {
            let users = this.getUsers()
            if (users) {
                users = users.users
                for (const user of users){
                    if (login === user.login) {
                        if (pass === user.pass) {
                            return user
                        }
                    }
                }
                return {error: "not found"}
            }
            else return undefined
        }
        else if (dataConfig) {
            const requireUser = await UserModel.findOne({login, pass})
            if (requireUser) {
                return requireUser
            }
            else return {error: "not found"}
        }
    }

    logout() {
        return {ok: true}
    }

    async register(obj: {login: string, pass: string}) {
        const login = obj.login, pass = obj.pass
        if (!dataConfig && dataConfig !== undefined) {
            const id = this.getRandomID(10)
            const users = this.getUsers()
            if (users.users.find((e: {login: string}) => e.login === login)) {
                return undefined
            }
            users.users.push({id, login, pass, tasks: []})
            this.writeFile(users)
            return {ok: true}
        }
        else if (dataConfig) {
            const user = await UserModel.findOne({login, pass})
            if (user) {
                return undefined
            }
            else {
                const newUser = new UserModel({
                    login: login,
                    pass: pass,
                    tasks: []
                })
                await newUser.save()
                return {ok: true}
            }
        }
    }
}