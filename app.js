const addItemButton = document.querySelector('.addItemButton');
const categoryContainer = document.querySelector('.categoryContainer');
const categoryIcons = document.querySelectorAll('.categoryContainer i');
const input = document.querySelector('input');
const todoContainer = document.querySelector('.todoContainer ul');

// Event Listeners
addItemButton.addEventListener('click', ev => {
    categoryContainer.classList.toggle('add');
});
categoryIcons.forEach(icon => {
    icon.addEventListener('click', ev => {
        categoryContainer.classList.toggle('add');
        const iconClass = [`${icon.classList[1]}`, `${icon.classList[2]}`];
        addItem(input.value, iconClass, true);
        input.value = '';
    });
});
todoContainer.addEventListener('click', optionTodo);
document.addEventListener('DOMContentLoaded', getTodo);

// Functions
function addItem(text, icon, isSave = true, isChecked = false , id  = Date.now()) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');
    // todoItem.classList.add('editing');
    todoItem.setAttribute('id' , id)
    if (isChecked) {
        todoItem.classList.add('cheaked');
    }
    todoItem.innerHTML = `
        <li>${text}</li>
        <i class="fa-sharp fa-solid fa-circle-check cheak"></i>
        <i class="fa-sharp fa-regular fa-pen-to-square edit"></i>
        <i class="fa-sharp fa-regular fa-trash trash"></i>
    `;
    const catIcon = document.createElement('i');
    catIcon.classList.add('fa-solid', icon[0], icon[1]);
    todoContainer.appendChild(todoItem);
    todoItem.insertBefore(catIcon, todoItem.childNodes[1]);
    todoItem.style.backgroundColor = getComputedStyle(catIcon).getPropertyValue('background-color');
    
    if (isSave) saveTodo(text, icon, isChecked , id);
}
function optionTodo(event) {
    const iconTargered = event.target.classList[3];
    const parentTarged = event.target.parentNode;
    const text = parentTarged.querySelector('li').textContent;
    const elmId = parentTarged.getAttribute('id')
    if (iconTargered === 'cheak') {
        parentTarged.classList.toggle('cheaked');
        updateTodoStatus(text, parentTarged.classList.contains('cheaked'));
    } else if (iconTargered === 'trash') {
        parentTarged.remove();
        deleteTodo(elmId);
    } else if (iconTargered === 'edit') {
        parentTarged.childNodes[2].toggleAttribute('contenteditable');
        if (parentTarged.classList.contains('editing')) {
            const newText = text;
            editTodo(elmId , newText);
        }
        parentTarged.classList.toggle('editing')
    }
}
function saveTodo(text, icon, isChecked,id) {
    const todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    const todoItemLocal = {
        id,
        text, 
        icon,
        isChecked 
    };
    todoList.push(todoItemLocal);
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function updateTodoStatus(text, isChecked) {
    const todoList = JSON.parse(localStorage.getItem('todo'));
    const updatedList = todoList.map(todo => {
        if (todo.text === text) {
            todo.isChecked = isChecked;
        }
        return todo;
    });
    localStorage.setItem('todo', JSON.stringify(updatedList));
}
function deleteTodo(id) {
    const todoList = JSON.parse(localStorage.getItem('todo'));
    const updatedList = todoList.filter(todo => todo.id != id);
    localStorage.setItem('todo', JSON.stringify(updatedList));
}
function editTodo(id , newText) {
    const todoList = JSON.parse(localStorage.getItem('todo'));
    const updatedList = todoList.map(todo => {
        if (todo.id == id) {
             todo.text = newText;
        }
        return todo;
    });
    localStorage.setItem('todo', JSON.stringify(updatedList));
}
function getTodo() {
    const todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    todoList.forEach(todo => {
        addItem(todo.text, todo.icon, false, todo.isChecked , todo.id);
    });
}
//?  about 2H Coding ☺