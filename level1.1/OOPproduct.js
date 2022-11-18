class Product {
    constructor(id, name, description, price, brand, quantity, date, reviews, images) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.brand = brand
        this.quantity = quantity
        this.date = new Date(date)
        this.reviews = reviews
        this.images = images
    }
    
    getID = () => this.id
    setID = (id) => this.id = id

    getName = () => this.name
    setName = (value) => this.name = value

    getDescription = () => this.description
    setDescription = (value) => this.description = value

    getPrice = () => this.price
    setPrice = (value) => this.price = value

    getBrand = () => this.brand
    setBrand = (value) => this.brand = value

    getActiveSize = () => this.activeSize
    setActiveSize = (value) => this.activeSize = value

    getQuantity = () => this.quantity
    setQuantity = (value) => this.quantity = value

    getDate = () => this.date
    setDate = (date) => this.date = new Date(date)

    getReviewByID = (id) => {
        for (let i = 0; i < this.reviews.length; i++){
            if (id === this.reviews[i]["id"]) return this.reviews[i]
        }
    }
    addReview = (review) => this.reviews.push(review)
    deleteReview = (id) => this.reviews.splice(this.reviews.findIndex((element) => element.id === id), 1)
    getAverageRating = () => {
        let sum = 0
        for (let i = 0; i < this.reviews.length; i++) {
            for (const k of this.reviews[i].rating){
                sum += k[1]
            }
        }
        return (sum / (this.reviews.length * 4))
    }

    getImages = () => this.images
    getImage = (param) => {
        if (param === undefined) {
            return this.images[0]
        }
        else {
            let arr = []
            for (let i = 0; i < this.images.length; i++) {
                arr[i] = 0
                for (let k = 0; k < param.length; k++){
                    if (param[k] === this.images[i][k]){
                        arr[i]++
                    }
                }
            }
            return this.images[arr.indexOf(Math.max(...arr))]
        }
    }

    getFullInfo = () => {
        let str = ''
        for (const k of Object.keys(this))
            if (typeof this[k] !== "function") str += `${k} - ${this[k]}\n`
        return str
    }

    getPriceForQuantity = (value) => value * this.price
}


class Reviews {
    constructor(id, author, date, comment, rating) {
        this.id = id
        this.author = author
        this.date = new Date(date)
        this.comment = comment
        this.rating = new Map([
            ['service', rating[0]],
            ['price', rating[1]],
            ['quality', rating[2]],
            ['value', rating[3]]
        ])
    }
}

class Clothes extends Product{
    constructor(id, name, description, price, brand, quantity, date, reviews, images, sizes, activeSize, material, color) {
        super(id, name, description, price, brand, quantity, date, reviews, images);
        this.sizes = sizes
        this.activeSize = activeSize
        this.material = material
        this.color = color
    }
    getSizes = () => this.sizes
    setSizes = (array) => this.sizes = array
    addSize = (size) => this.sizes.push(size)
    deleteSize = (param) => this.sizes.splice(this.sizes.findIndex((element) => element === param), 1)

    getActiveSize = () => this.activeSize
    setActiveSize = (value) => this.activeSize = value

    getMaterial = () => this.material
    setMaterial = (value) => this.material = value

    getColor = () => this.color
    setColor = (value) => this.color = value
}

class Electonics extends Product{
    constructor(id, name, description, price, brand, quantity, date, reviews, images, warranty, power) {
        super(id, name, description, price, brand, quantity, date, reviews, images);
        this.warranty = warranty
        this.power = power
    }
    getWarranty = () => this.warranty
    setWarranty = (value) => this.warranty = value

    getPower = () => this.power
    setPower = (value) => this.power = value
}

function searchProduct (products, search){
    let count = []
    for (let i = 0; i < products.length; i++){
        count[i] = 0
        for (let k = 0; k < search.length; k++){
            if (search.toLowerCase()[k] === products[i].name.toLowerCase()[k]){
                count[i]++
            }
        }
    }
    let arr = []
    for (let i = 0; i < products.length; i++){
        if (count[i] === Math.max(...count) && Math.max(...count) !== 0){
            arr.push(products[i].name)
        }
    }
    if (arr.length === 0){
        return "Ничего не найдено"
    }
    else if (arr.length === 1) {
        return arr[0]
    }
    else if (arr.length > 1) {
        return arr
    }
}

function sortProduct(products, sortRule) {
    let atr
    switch (sortRule.toLowerCase()) {
        case "price":
            atr = "price"
            break
        case "name":
            atr = "name"
            break
        case "id":
            atr = "id"
            break
        default:
            return "Категория не найдена"
    }
    if (atr === "name") return products.sort((a, b) => a[atr].localeCompare(b[atr]))
    else return products.sort((a, b) => a[atr] - b[atr])
}

let idsProd = 0

const review1 = new Reviews(1, "Mike", "December 18, 2022 12:10:13", "Good", [3, 4, 5, 4])
const review2 = new Reviews(2, "Robert", "December 18, 2022 15:34:59", "Bad", [1, 1, 2, 3])
const reviews1 = [review1, review2]
const review3 = new Reviews(1, 'Peter', 'June 26, 2022 16:30:30', 'Perfect', [5, 5, 5, 5])
const review4 = new Reviews(2, 'Loan', 'June 27, 2022 18:33:55', 'Bad', [1, 2, 1, 1])
const reviews2 = [review3, review4]
const temp1 =  new Clothes(++idsProd, 'T-Shirt', 'Red T-Shirt', 4.59, 'GUCCI', 20, "December 17, 2022 14:36:07", reviews1, ['images1.jpg', 'images2.jpg'], ['S', 'M', 'L', 'XL'], 'S', 'cloth', 'Red')
const temp2 = new Electonics(++idsProd, 'Smartphone', 'Samsung smartphone', 125.99, 'Samsung', 10, 'June 25, 2022 15:03:43', reviews2, ['image1.jpg', 'image2.jpg', 'iamge3.jpg'], 5, 5500)

//console.log(sortProduct([temp1, temp2], 'id'))
let test = 1
console.log(temp1.hasOwnProperty('T-Shirt'));