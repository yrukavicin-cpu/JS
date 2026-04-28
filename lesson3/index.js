// 1. Таблиця множення для числа 5
for (let i = 1; i <= 10; i++) {
    console.log("5 * " + i + " = " + 5 * i)
}

// 2. Числа від 1 до 50, які діляться на 3 або 5
for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
        console.log(i)
    }
}

// 3. Перевірка на паліндром
let input = prompt("Введіть число:")
let reversed = input.split("").reverse().join("")

if (input === reversed) {
    alert(input + " - паліндром")
} else {
    alert(input + " - не паліндром")
}
