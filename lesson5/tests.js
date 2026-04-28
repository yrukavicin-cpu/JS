const { makeUser, createUserManager } = require("./index")

const manager = createUserManager()

// створення
const user = manager.createUser({ name: "Іван", email: "ivan@test.com", role: "admin" })
console.log("createUser:", manager.getUser(user.id) !== null ? "OK" : "FAIL")

// getInfo
console.log("getInfo:", user.getInfo().includes("Іван") ? "OK" : "FAIL")

// isAdmin
console.log("isAdmin:", user.isAdmin() === true ? "OK" : "FAIL")

// update
manager.updateUser(user.id, { name: "Василь" })
console.log("updateUser:", manager.getUser(user.id).name === "Василь" ? "OK" : "FAIL")

// delete
const user2 = manager.createUser({ name: "Олена", email: "olena@test.com" })
manager.deleteUser(user2.id)
console.log("deleteUser:", manager.getUser(user2.id) === null ? "OK" : "FAIL")

// невалідний email
let threw = false
try { makeUser({ name: "Тест", email: "notanemail" }) } catch { threw = true }
console.log("email validation:", threw ? "OK" : "FAIL")
