type test = {[key: string]: {
        cvalue: number | string | undefined | test
    } | undefined}
let sum = 0
function f(A: test) {
    if (A) {
        Object.values(A).map(e => {
            if (e) {
                if (e.cvalue === undefined) {
                    sum += 2022
                }
                else if (typeof e.cvalue === "number"){
                    sum += e.cvalue
                }
                else if (typeof e.cvalue === "string") {
                    const number = Number(e.cvalue)
                    if (isNaN(number)) {
                        sum += 2022
                    }
                    else {
                        sum += number
                    }
                }
                else if (typeof e.cvalue === "object") {
                    f(e.cvalue)
                }
            }
        })
    }
    return sum
}
console.log(f({hello: {cvalue: 6}, world: {cvalue: {yay: {cvalue: "5"}}}}));