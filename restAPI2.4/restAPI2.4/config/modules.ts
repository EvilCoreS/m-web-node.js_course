export type User = {
    id: string,
    login: string,
    pass: string,
    tasks: {
        id: string,
        text: string,
        checked: boolean
    }[] | []
} | undefined

export interface UserDB {
    login: string,
    pass: string,
    tasks: {
        id: string,
        text: string,
        checked: boolean
    }[]
}

export type Task = {
    id: string,
    text: string,
    checked: boolean
}

export type UsersObj = {users: { id: string, tasks: {text: string, id: string, checked: boolean}[] }[]}

declare module 'express-session' {
    interface SessionData {
        user: {
            id: string,
            login: string,
            pass: string,
            tasks: {
                id: string,
                text: string,
                checked: boolean
            }[] | []
        }
    }
}