// Завдання 1 - парне чи непарне
let num = prompt("Введіть число:")
num = parseInt(num)

if (num % 2 === 0) {
    alert(num + " - парне")
} else {
    alert(num + " - непарне")
}

// Завдання 2 - сума від 1 до 100
let sum = 0
for (let i = 1; i <= 100; i++) {
    sum += i
    console.log("i=" + i + ", sum=" + sum)
}
alert("Сума від 1 до 100: " + sum)

// Завдання 3 - числа від 1 до 100
for (let i = 1; i <= 100; i++) {
    console.log(i)
}
