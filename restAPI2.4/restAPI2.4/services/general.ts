import {UsersObj} from "../config/modules";
import fs from "fs";

export default class GeneralFunc {
    getRandomID(length: number){
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result
    }

    writeFile(users: UsersObj){
        try {
            fs.writeFileSync('../restAPI2.4data/data.json', JSON.stringify(users, null, '\t'))
        }
        catch (e) {
            return undefined
        }
    }
}