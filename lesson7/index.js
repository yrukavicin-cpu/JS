const students = [
    { name: "Іван Петренко",    age: 20, gpa: 85, faculty: "IT" },
    { name: "Олена Ковальчук",  age: 21, gpa: 92, faculty: "IT" },
    { name: "Петро Бондаренко", age: 19, gpa: 67, faculty: "Математика" },
    { name: "Марія Сидоренко",  age: 22, gpa: 78, faculty: "Фізика" },
    { name: "Андрій Мельник",   age: 20, gpa: 95, faculty: "IT" },
    { name: "Оксана Шевченко",  age: 21, gpa: 55, faculty: "Економіка" },
    { name: "Василь Коваль",    age: 23, gpa: 88, faculty: "Математика" },
    { name: "Тетяна Лисенко",   age: 19, gpa: 73, faculty: "Фізика" },
    { name: "Микола Гриценко",  age: 22, gpa: 61, faculty: "Економіка" },
    { name: "Ірина Захаренко",  age: 20, gpa: 90, faculty: "IT" },
    { name: "Дмитро Павленко",  age: 21, gpa: 44, faculty: "Математика" },
    { name: "Юлія Кравченко",   age: 19, gpa: 82, faculty: "Фізика" },
    { name: "Сергій Олійник",   age: 24, gpa: 77, faculty: "Економіка" },
    { name: "Наталія Поліщук",  age: 20, gpa: 96, faculty: "IT" },
    { name: "Роман Бойко",      age: 22, gpa: 69, faculty: "Математика" },
]

// --- Фільтрація ---

function filterByFaculty(arr, faculty) {
    if (!faculty) return []
    return arr.filter(s => s.faculty === faculty)
}

function filterByMinGPA(arr, minGPA) {
    if (typeof minGPA !== "number") return []
    return arr.filter(s => s.gpa >= minGPA)
}

// --- Bubble Sort ---

function bubbleSort(arr, key, direction = "ASC") {
    let comparisons = 0
    const result = [...arr]
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            comparisons++
            const shouldSwap = direction === "ASC"
                ? result[j][key] > result[j + 1][key]
                : result[j][key] < result[j + 1][key]
            if (shouldSwap) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]]
            }
        }
    }
    return { result, comparisons }
}

// --- Quick Sort ---

function quickSort(arr, key, direction = "ASC") {
    let comparisons = 0

    function qs(arr) {
        if (arr.length <= 1) return arr
        const pivot = arr[Math.floor(arr.length / 2)]
        const left = [], right = [], equal = []

        for (const item of arr) {
            comparisons++
            if (item[key] < pivot[key]) direction === "ASC" ? left.push(item) : right.push(item)
            else if (item[key] > pivot[key]) direction === "ASC" ? right.push(item) : left.push(item)
            else equal.push(item)
        }

        return [...qs(left), ...equal, ...qs(right)]
    }

    return { result: qs([...arr]), comparisons }
}

// --- Статистика ---

function getStats(arr) {
    if (!arr || arr.length === 0) return null

    const avgGPA = (arr.reduce((sum, s) => sum + s.gpa, 0) / arr.length).toFixed(2)
    const top3 = [...arr].sort((a, b) => b.gpa - a.gpa).slice(0, 3)

    const byFaculty = {}
    arr.forEach(s => {
        byFaculty[s.faculty] = (byFaculty[s.faculty] || 0) + 1
    })

    return { count: arr.length, avgGPA, top3, byFaculty }
}

// --- Порівняння алгоритмів ---

function compareAlgorithms(size) {
    const arr = Array.from({ length: size }, () => ({ gpa: Math.floor(Math.random() * 100) }))

    const t1 = Date.now()
    const { comparisons: bc } = bubbleSort(arr, "gpa")
    const bubbleTime = Date.now() - t1

    const t2 = Date.now()
    const { comparisons: qc } = quickSort(arr, "gpa")
    const quickTime = Date.now() - t2

    return { size, bubbleTime, quickTime, bubbleComps: bc, quickComps: qc }
}

// --- Демо ---

console.log("=== Студенти IT факультету ===")
filterByFaculty(students, "IT").forEach(s => console.log(` ${s.name} — GPA: ${s.gpa}`))

console.log("\n=== Студенти з GPA >= 80 ===")
filterByMinGPA(students, 80).forEach(s => console.log(` ${s.name} — GPA: ${s.gpa}`))

console.log("\n=== Сортування за GPA (Bubble Sort, ASC) ===")
const { result: byGPA, comparisons: bubbleComps } = bubbleSort(students, "gpa")
byGPA.forEach(s => console.log(` ${s.name} — ${s.gpa}`))
console.log(" Порівнянь:", bubbleComps)

console.log("\n=== Сортування за іменем (Quick Sort, DESC) ===")
const { result: byName } = quickSort(students, "name", "DESC")
byName.forEach(s => console.log(` ${s.name}`))

console.log("\n=== Статистика ===")
const stats = getStats(students)
console.log(" Всього студентів:", stats.count)
console.log(" Середній GPA:", stats.avgGPA)
console.log(" Топ-3:", stats.top3.map(s => `${s.name} (${s.gpa})`).join(", "))
console.log(" По факультетах:", stats.byFaculty)

console.log("\n=== Порівняння Bubble Sort vs Quick Sort ===")
for (const size of [100, 1000, 5000]) {
    const r = compareAlgorithms(size)
    console.log(` n=${r.size}: Bubble ${r.bubbleTime}ms (${r.bubbleComps} порівнянь) | Quick ${r.quickTime}ms (${r.quickComps} порівнянь)`)
}

module.exports = { bubbleSort, quickSort, filterByFaculty, filterByMinGPA, getStats }
