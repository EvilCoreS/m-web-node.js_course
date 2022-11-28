import SqlManager from "../../config/db/sql-manager";

const sql = new SqlManager()

export default class BookServices {
    async getOne(id: string) {
        const data = await sql.getOne(Number(id))
        await sql.updateViews(Number(id))
        return data
    }

    async clickPlus(id: string) {
        await sql.updateClicks(Number(id))
        const data = await sql.getBusy(Number(id))
        const str = data === 0 ? "Книга свободна и ты можешь прийти за ней." +
            " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
            " Лучше предварительно прозвонить и предупредить нас, чтоб " +
            " не попасть в неловкую ситуацию. Тел. 099 196 24 69" :
            "Сейчас эта книга находится на руках, у одного из наших учеников." +
            " Оставь свой email и мы сообщим, как только книга вновь" +
            " появится в библиотеке"
        return {message: str}
    }
}