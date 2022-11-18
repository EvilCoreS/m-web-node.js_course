function Product(id, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images){
    this.id = id
    this.getID = () => this.id
    this.setID = (value) => this.id = value

    this.name = name
    this.getName = () => this.name
    this.setName = (value) => this.name = value

    this.description = description
    this.getDescription = () => this.description
    this.setDescription = (value) => this.description = value

    this.price = price
    this.getPrice = () => this.price
    this.setPrice = (value) => this.price = value

    this.brand = brand
    this.getBrand = () => this.brand
    this.setBrand = (value) => this.brand = value

    this.sizes = sizes
    this.getSizes = () => this.sizes
    this.setSizes = (array) => this.sizes = array
    this.addSize = (size) => this.sizes.push(size)
    this.deleteSize = (param) => this.sizes.splice(this.sizes.findIndex((element) => element === param), 1)

    this.activeSize = activeSize
    this.getActiveSize = () => this.activeSize
    this.setActiveSize = (value) => this.activeSize = value

    this.quantity = quantity
    this.getQuantity = () => this.quantity
    this.setQuantity = (value) => this.quantity = value

    this.date = new Date(date)
    this.getDate = () => this.date
    this.setDate = (date) => this.date = new Date(date)

    this.reviews = reviews
    this.getReviewByID = (id) => {
        for (let i = 0; i < reviews.length; i++){
            if (id === this.reviews[i]["id"]) return this.reviews[i]
        }
    }
    this.addReview = (review) => this.reviews.push(review)
    this.deleteReview = (id) => this.reviews.splice(this.reviews.findIndex((element) => element.id === id), 1)
    this.getAverageRating = () => {
        let sum = 0
        for (let i = 0; i < reviews.length; i++) {
            for (const k of reviews[i].rating){
                sum += k[1]
            }
        }
        return (sum / (reviews.length * 4))
    }

    this.images = images
    this.getImages = () => this.images
    this.getImage = (param) => {
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
}
function Reviews(id, author, date, comment, rating){
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
const review1 = new Reviews(1, 'Jake', "December 18, 2022 03:25:37", "Good", [4, 4, 5, 3])
const review2 = new Reviews(2, 'Jake', "December 18, 2022 03:25:37", "Good", [4, 4, 5, 3])
const test = new Product(++idsProd, "z-shirt", "red t-shirt", 10, "GUCCI", ['L', 'M', 'S', 'X', 'XL'], 'M', 20, "December 17, 2022 03:24:00", [review1], ["image1.jpg", "image2.jpg"])
const test1 = new Product(++idsProd, "afeblsad", "red t-shirt", 1.99, "GUCCI", ['L', 'M', 'S', 'X', 'XL'], 'M', 20, "December 17, 2022 03:24:00", [review1], ["image1.jpg", "image2.jpg"])
const test2 = new Product(++idsProd, "fafeblsad", "red t-shirt", 6.99, "GUCCI", ['L', 'M', 'S', 'X', 'XL'], 'M', 20, "December 17, 2022 03:24:00", [review1], ["image1.jpg", "image2.jpg"])

let arr = [test, test1, test2]
console.log(sortProduct(arr, "name"))
