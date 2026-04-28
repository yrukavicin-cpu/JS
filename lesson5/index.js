let nextId = 1

/**
 * Перевіряє чи email валідний
 */
function validateEmail(email) {
    return email.includes("@") && email.includes(".")
}

/**
 * Створює об'єкт користувача
 */
function makeUser({ name, email, role = "user" }) {
    if (!validateEmail(email)) {
        throw new Error("Невалідний email: " + email)
    }

    return {
        id: nextId++,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),

        getInfo() {
            return `[${this.id}] ${this.name} | ${this.email} | ${this.role}`
        },

        updateProfile(data) {
            if (data.email && !validateEmail(data.email)) {
                throw new Error("Невалідний email: " + data.email)
            }
            return { ...this, ...data }
        },

        isAdmin() {
            return this.role === "admin"
        }
    }
}

/**
 * Менеджер користувачів — зберігає список через closure
 */
function createUserManager() {
    const users = []

    return {
        createUser(data) {
            const user = makeUser(data)
            users.push(user)
            return user
        },

        getUser(id) {
            return users.find(u => u.id === id) || null
        },

        updateUser(id, data) {
            const index = users.findIndex(u => u.id === id)
            if (index === -1) throw new Error("Користувача не знайдено")
            const updated = users[index].updateProfile(data)
            users[index] = updated
            return updated
        },

        deleteUser(id) {
            const index = users.findIndex(u => u.id === id)
            if (index === -1) throw new Error("Користувача не знайдено")
            users.splice(index, 1)
            return true
        },

        getAllUsers() {
            return [...users]
        },

        getUsersByRole(role) {
            return users.filter(u => u.role === role)
        }
    }
}

// --- Демо ---
const manager = createUserManager()

const user1 = manager.createUser({ name: "Іван", email: "ivan@example.com", role: "admin" })
const user2 = manager.createUser({ name: "Олена", email: "olena@example.com" })
const user3 = manager.createUser({ name: "Петро", email: "petro@example.com" })

console.log("Всі користувачі:")
manager.getAllUsers().forEach(u => console.log(u.getInfo()))

console.log("\nЧи є адмін:", user1.isAdmin())
console.log("Ролі:", Object.values(manager.getAllUsers().map(u => u.role)))

console.log("\nОновлення Івана:")
manager.updateUser(user1.id, { name: "Іван Оновлений" })
console.log(manager.getUser(user1.id).getInfo())

console.log("\nФільтр за роллю user:")
manager.getUsersByRole("user").forEach(u => console.log(u.getInfo()))

console.log("\nВидалення Петра:")
manager.deleteUser(user3.id)
console.log("Залишилось:", manager.getAllUsers().length)

console.log("\nObject.keys користувача:")
const { getInfo, updateProfile, isAdmin, ...plainUser } = manager.getUser(user1.id)
console.log(Object.keys(plainUser))
console.log(Object.values(plainUser))
console.log(Object.entries(plainUser))

module.exports = { makeUser, createUserManager }
