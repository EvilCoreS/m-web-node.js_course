// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т, но возможно не со всеми полями
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1,
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :)
// нас интересует только ее сигнатура.

type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

type AnyButtonType = DialogButtonType | FormButton

function f1<T extends Partial<Record<string, AnyButtonType>>>(data: T, transformer: (x: AnyButtonType) => Required<T>) {

}

// Более сложный вариант:
// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т (у которого поле id: string),
//    но возможно без поля id
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1,
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :)
// нас интересует только ее сигнатура.

function f2<T extends Record<string, AnyButtonType> | Partial<Record<"id", string>>>(data: T, transformer: (x: AnyButtonType) => Required<T>) {

}

// Последняя задача:
// Напишите сигнатуру функции, которая принимает
// - некий класс
// - количество
// ...а возвращает массив экземпляров этого класса

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}
// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию
function doSomething<T>(someClass: { new(): T}, count: number): T[]  {
    let a = []
    for (let i = 0; i < count; i++)
        a.push(new someClass());

    return a;
}

let a: Rectangle[] = doSomething(Rectangle, 10);
let b: Circle[] = doSomething(Circle, 20)