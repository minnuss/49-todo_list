const form = document.querySelector('.form')
const input = document.querySelector('.input')
const todosBox = document.querySelector('.todos-list-box')
const btnOk = document.querySelector('.btn')

// READ FROM LOCAL STORAGE
const todosLocal = JSON.parse(localStorage.getItem('todos'))
if (todosLocal) {
    todosLocal.forEach(todo => addTodo(todo));
}

// FORM ACTION
form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

btnOk.addEventListener('click', () => {
    // e.preventDefault()
    addTodo()
})

// added option to recognize and delete immediately todo when page reload and todo is completed
let spanXlocalStorage = document.querySelectorAll('.completed span')
console.log(spanXlocalStorage)
if (spanXlocalStorage) {
    spanXlocalStorage.forEach(x => {
        x.addEventListener('click', (e) => {
            x.parentElement.remove()
        })
    })
}

// CREATE TODO ELEMENT
function addTodo(todo) {
    let todoText = input.value

    // reset input value after submit
    input.value = ''

    // if todo is read from local storage
    if (todo) {
        todoText = todo.text
    }

    // console.log(todoText)

    if (todoText) {
        const todoEl = document.createElement('li')

        // if todo is read from local storage, update classlist
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        // it needs to be innerHTML because of span element, if it exist in local storage, it needs to be recognised
        todoEl.innerHTML = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')

            // adding X / delete functionality to completed todo
            if (todoEl.classList.contains('completed')) {
                const spanX = document.createElement('span')
                spanX.innerHTML = ' ❌'
                todoEl.appendChild(spanX)

                spanX.addEventListener('click', () => {
                    spanX.parentElement.remove()
                })
            } else {
                // delete every other span X and leave only first one
                todoEl.querySelectorAll('span')[0].remove()
            }

            updateLocalStorage()
        })

        // adding delete functionality on mouse right click
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLocalStorage()
        })

        todosBox.appendChild(todoEl)

        updateLocalStorage()
    }
}

// ADD TO LOCAL STORAGE
function updateLocalStorage() {
    todosEl = document.querySelectorAll('li')

    const todosArray = []

    todosEl.forEach(todoEl => {

        todosArray.push({
            text: todoEl.innerHTML,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todosArray))
}