interface Object {[key: string]: { cvalue: number | string | Object | undefined } | undefined}
function summ(a: Object){
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (!elem || !elem.cvalue) return 2021;
        if (typeof elem.cvalue === "string") return +elem.cvalue || 2021;
        if (typeof elem.cvalue === "object") return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (const number of x) {
        sum += number
    }
    return sum;
}
console.log(summ({hello: {cvalue: 1}, world: {cvalue: {yay: {cvalue: "2"}}}}));