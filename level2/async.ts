async function request(url: string) {
    let res: Response = await fetch(url)
    return await res.json()
}
const urlIp = "https://api.ipify.org?format=json"

//request(urlIp).then(e => {console.log(e);});
const url = "https://random-data-api.com/api/name/random_name"
async function requests1(url: string) {
    let arr: Array<Promise<Response>> = []
    for (let i = 0; i < 3; i++){
        let temp: Promise<Response> = request(url)
        arr.push(temp)
    }
    return arr
}
//requests1(url).then(data => Promise.all(data).then(e => console.log(e)))
// \w Promise.all()

//requests1(url).then(data => {data.map(elem => {Promise.resolve(elem).then(e => console.log(e))})})
// \wo Promise.all()

function requests2(url: string) {
    let arr: Array<Promise<Response>> = []
    for (let i = 0; i < 3; i++){
        let res = fetch(url).then(res => res.json())
        let temp: Promise<Response> = res
        arr.push(temp)
    }
    return arr
}

//requests2(url).map(elem => {Promise.resolve(elem).then(data => console.log(data))})
// \wo Promise.all() & async/await

const url1 = 'https://random-data-api.com/api/users/random_user'

function getFemale1(url: string, counter = 0) {
    let res: Promise<{gender: string}> = fetch(url).then(data => data.json())
    Promise.resolve(res).then(res => {
        if (res.gender !== 'Female') {
            counter++
            getFemale1(url, counter)
        }
        else console.log(res.gender, counter);
    })
}
// getFemale1(url1)

async function getFemale2(url: string, counter = 0){
    let res: {gender: string} = await ( await fetch(url) ).json()
    if (res.gender !== "Female"){
        counter++
        getFemale2(url1, counter)
    }
    else console.log(res.gender, counter);
}
// getFemale2(url1)

function log(callback: (ip: string) => void) {
    return callback
}

async function getIp(log: (ip: string) => void) {
    const res: {ip: string} = await ( await fetch(urlIp) ).json()
    log(res.ip)
}
// getIp(log(ip => {console.log(ip, 123);}))

async function returnString() {
    const res: {ip: string} = await ( await fetch(urlIp) ).json()
    return res.ip
}

async function getIp1(callback: (ip: string) => void) {
    const ip = await returnString()
    callback(ip)
}

// getIp1((ip) => {console.log(ip)})