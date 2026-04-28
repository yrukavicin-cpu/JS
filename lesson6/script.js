const data = {
    "Фронтенд": ["React", "Vue", "Angular", "TypeScript", "Webpack", "Vite", "Next.js", "Svelte", "Sass", "Tailwind"],
    "Бекенд": ["Node.js", "Express", "Python", "Django", "Java", "Spring", "PHP", "Laravel", "Go", "Ruby on Rails"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Firebase", "Cassandra", "Oracle", "MariaDB", "DynamoDB"],
    "DevOps": ["Docker", "Kubernetes", "AWS", "CI/CD", "Nginx", "Git", "Linux", "Terraform", "Ansible", "Jenkins"]
}

function highlight(text, filter) {
    if (!filter) return text
    const idx = text.toLowerCase().indexOf(filter.toLowerCase())
    if (idx === -1) return text
    return text.slice(0, idx) + `<mark>${text.slice(idx, idx + filter.length)}</mark>` + text.slice(idx + filter.length)
}

// ---- Single Select ----
function initSingleDropdown() {
    const dropdown = document.getElementById("single-dropdown")
    const trigger = dropdown.querySelector(".dropdown-trigger")
    const menu = dropdown.querySelector(".dropdown-menu")
    const search = dropdown.querySelector(".dropdown-search")
    const list = dropdown.querySelector(".options-list")
    const valueEl = dropdown.querySelector(".dropdown-value")

    let selected = null
    let focusedIndex = -1

    function getOptions() {
        return [...list.querySelectorAll(".option")]
    }

    function render(filter = "") {
        list.innerHTML = ""
        for (const [group, options] of Object.entries(data)) {
            const filtered = options.filter(o => o.toLowerCase().includes(filter.toLowerCase()))
            if (!filtered.length) continue

            const groupEl = document.createElement("div")
            groupEl.className = "option-group"
            groupEl.textContent = group
            list.appendChild(groupEl)

            filtered.forEach(option => {
                const el = document.createElement("div")
                el.className = "option" + (option === selected ? " selected" : "")
                el.dataset.value = option
                el.innerHTML = highlight(option, filter)
                el.setAttribute("role", "option")
                el.addEventListener("click", () => selectOption(option))
                list.appendChild(el)
            })
        }
        focusedIndex = -1
    }

    function selectOption(value) {
        selected = value
        valueEl.textContent = value
        close()
    }

    function open() {
        menu.classList.add("open")
        trigger.setAttribute("aria-expanded", "true")
        search.value = ""
        render()
        search.focus()
    }

    function close() {
        menu.classList.remove("open")
        trigger.setAttribute("aria-expanded", "false")
    }

    trigger.addEventListener("click", () => menu.classList.contains("open") ? close() : open())

    search.addEventListener("input", () => render(search.value))

    dropdown.addEventListener("keydown", (e) => {
        const options = getOptions()
        if (e.key === "Escape") {
            close()
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            options[focusedIndex]?.classList.remove("focused")
            focusedIndex = Math.min(focusedIndex + 1, options.length - 1)
            options[focusedIndex]?.classList.add("focused")
            options[focusedIndex]?.scrollIntoView({ block: "nearest" })
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            options[focusedIndex]?.classList.remove("focused")
            focusedIndex = Math.max(focusedIndex - 1, 0)
            options[focusedIndex]?.classList.add("focused")
            options[focusedIndex]?.scrollIntoView({ block: "nearest" })
        } else if (e.key === "Enter" && focusedIndex >= 0) {
            e.preventDefault()
            const val = options[focusedIndex]?.dataset.value
            if (val) selectOption(val)
        }
    })

    render()
}

// ---- Multi Select ----
function initMultiDropdown() {
    const dropdown = document.getElementById("multi-dropdown")
    const trigger = dropdown.querySelector(".dropdown-trigger")
    const menu = dropdown.querySelector(".dropdown-menu")
    const search = dropdown.querySelector(".dropdown-search")
    const list = dropdown.querySelector(".options-list")
    const valueEl = dropdown.querySelector(".dropdown-value")
    const badge = dropdown.querySelector(".badge")
    const tagsContainer = dropdown.querySelector(".selected-tags")
    const selectAllBtn = dropdown.querySelector(".btn-select-all")
    const clearAllBtn = dropdown.querySelector(".btn-clear-all")

    let selected = new Set()
    let focusedIndex = -1

    function getOptions() {
        return [...list.querySelectorAll(".checkbox-option")]
    }

    function getFilteredValues(filter = "") {
        let result = []
        for (const options of Object.values(data)) {
            options.filter(o => o.toLowerCase().includes(filter.toLowerCase())).forEach(o => result.push(o))
        }
        return result
    }

    function render(filter = "") {
        list.innerHTML = ""
        for (const [group, options] of Object.entries(data)) {
            const filtered = options.filter(o => o.toLowerCase().includes(filter.toLowerCase()))
            if (!filtered.length) continue

            const groupEl = document.createElement("div")
            groupEl.className = "option-group"
            groupEl.textContent = group
            list.appendChild(groupEl)

            filtered.forEach(option => {
                const label = document.createElement("label")
                label.className = "checkbox-option" + (selected.has(option) ? " selected" : "")
                label.dataset.value = option

                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.checked = selected.has(option)
                checkbox.addEventListener("change", () => toggle(option))

                const span = document.createElement("span")
                span.innerHTML = highlight(option, filter)

                label.appendChild(checkbox)
                label.appendChild(span)
                list.appendChild(label)
            })
        }
        focusedIndex = -1
        renderTags()
        updateBadge()
    }

    function toggle(value) {
        selected.has(value) ? selected.delete(value) : selected.add(value)
        render(search.value)
    }

    function renderTags() {
        tagsContainer.innerHTML = ""
        selected.forEach(val => {
            const tag = document.createElement("span")
            tag.className = "tag"
            tag.innerHTML = `${val} <button aria-label="Видалити ${val}">×</button>`
            tag.querySelector("button").addEventListener("click", () => {
                selected.delete(val)
                render(search.value)
            })
            tagsContainer.appendChild(tag)
        })
    }

    function updateBadge() {
        if (selected.size > 0) {
            badge.hidden = false
            badge.textContent = selected.size
            valueEl.textContent = "Обрано"
        } else {
            badge.hidden = true
            valueEl.textContent = "Оберіть технології"
        }
    }

    function open() {
        menu.classList.add("open")
        trigger.setAttribute("aria-expanded", "true")
        search.value = ""
        render()
        search.focus()
    }

    function close() {
        menu.classList.remove("open")
        trigger.setAttribute("aria-expanded", "false")
    }

    trigger.addEventListener("click", () => menu.classList.contains("open") ? close() : open())

    search.addEventListener("input", () => render(search.value))

    selectAllBtn.addEventListener("click", () => {
        getFilteredValues(search.value).forEach(o => selected.add(o))
        render(search.value)
    })

    clearAllBtn.addEventListener("click", () => {
        selected.clear()
        render(search.value)
    })

    dropdown.addEventListener("keydown", (e) => {
        const options = getOptions()
        if (e.key === "Escape") {
            close()
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            options[focusedIndex]?.classList.remove("focused")
            focusedIndex = Math.min(focusedIndex + 1, options.length - 1)
            options[focusedIndex]?.classList.add("focused")
            options[focusedIndex]?.scrollIntoView({ block: "nearest" })
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            options[focusedIndex]?.classList.remove("focused")
            focusedIndex = Math.max(focusedIndex - 1, 0)
            options[focusedIndex]?.classList.add("focused")
            options[focusedIndex]?.scrollIntoView({ block: "nearest" })
        } else if (e.key === "Enter" && focusedIndex >= 0) {
            e.preventDefault()
            const val = options[focusedIndex]?.dataset.value
            if (val) toggle(val)
        }
    })

    render()
}

// закрити при кліку поза dropdown
document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown").forEach(d => {
        if (!d.contains(e.target)) {
            d.querySelector(".dropdown-menu").classList.remove("open")
            d.querySelector(".dropdown-trigger").setAttribute("aria-expanded", "false")
        }
    })
})

initSingleDropdown()
initMultiDropdown()
