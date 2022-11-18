function csvParser(csv){
    const arrOfObj = csv.split('\n')
        .map(e => {
            let arr = e.split(',')
            return {x: arr[0], y: arr[1], name: arr[2], population: arr[3]}
        })
        .filter(e => Object.values(e).every(str => str[0] !== undefined && str[0] !== '#' && str[0] !== ' '))
        .sort((a, b) => Number(b.population) - Number(a.population))
    const list = arrOfObj.slice(0, 3).reduce((init, current, id) => {
        init[current.name] = {population: current.population, rating: id+1}
        return init
    }, {})
    return (text) => {
        let result
        for (const e of Object.keys(list)) {
            if (text.includes(e)) {
                result = text.replace(e,
                    `${e} входит в топ, и занимает ${list[e].rating} место. Популярность составляет: ${list[e].population}`)
                break
            } else { result = "Не найдено в топе"}
        }
        return result
    }
}
const csv = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,`

const temp = csvParser(csv)
console.log(temp('Бердичів'));
console.log(temp('Алушта'));
console.log(temp('Біла Церква'));