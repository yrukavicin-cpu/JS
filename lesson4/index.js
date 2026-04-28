// 1. Квадрати чисел
function getSquares(arr) {
    return arr.map(n => n * n)
}

console.log(getSquares([1, 2, 3, 4]))

// 2. Найбільше число
function getMax(arr) {
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}

console.log(getMax([3, 5, 1, 8, 4]))

// 3. Унікальні рядки
function getUnique(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }
    return result
}

console.log(getUnique(["a", "b", "a", "c", "b"]))
