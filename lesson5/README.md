# User Management System

## Структури даних

### User object
| Поле | Тип | Опис |
|------|-----|------|
| id | number | Унікальний ID (автоінкремент) |
| name | string | Ім'я користувача |
| email | string | Email (валідується) |
| role | string | Роль: `"user"` або `"admin"` |
| createdAt | string | Дата створення (ISO) |

Методи: `getInfo()`, `updateProfile(data)`, `isAdmin()`

### UserManager
Зберігає список користувачів через closure (приватне сховище).

| Метод | Опис |
|-------|------|
| createUser(data) | Створити користувача |
| getUser(id) | Отримати за ID |
| updateUser(id, data) | Оновити дані |
| deleteUser(id) | Видалити |
| getAllUsers() | Список всіх |
| getUsersByRole(role) | Фільтр за роллю |

## Запуск

```
node index.js
node tests.js
```
