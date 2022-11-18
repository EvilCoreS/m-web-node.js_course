import mongoose, {model, Schema} from "mongoose";
import {UserDB} from "./modules";

const userSchema = new mongoose.Schema<UserDB> ({
    login: {type: String, required: true},
    pass: {type: String, required: true},
    tasks: {type: [], required: true}
})
export const UserModel = model<UserDB>('User', userSchema)