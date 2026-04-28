// 1. Змінні
let name = "Іван"
let age = 20
let isStudent = true
let favoriteColor = "синій"

console.log(name, age, isStudent, favoriteColor)

// 2. Операції
let num1 = 10
let num2 = 20

let sum = num1 + num2
let difference = num1 - num2
let product = num1 * num2
let quotient = num1 / num2

console.log(sum, difference, product, quotient)

// 3. Конкатенація
let firstName = "Іван"
let lastName = "Петренко"
let fullName = firstName + " " + lastName

console.log(fullName)

// 4. Перетворення типів
let numberAsString = "123"
let number = parseInt(numberAsString)
let stringNumber = String(number)

console.log(number, stringNumber)

// 5. Логічні операції
let isSunny = true
let isRaining = false

console.log(isSunny && isRaining)
console.log(isSunny || isRaining)

// 6. typeof
let x = 42
let y = "рядок"
let z = [1, 2, 3]

console.log(typeof x, typeof y, typeof z)

let userAge = 20
console.log(userAge >= 18)

// 7. Валідація
let price = 99.99
console.log(typeof price === "number")

let email = "test@example.com"
console.log(email.includes("@") && email.includes("."))

let password = "Secret123!"
let isValidPassword = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%]/.test(password)
console.log(isValidPassword)
