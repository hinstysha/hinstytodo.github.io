'use strict'
const todoManagement = document.querySelector('.todo-management'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoFinished = document.querySelector('.todo-finished');


const todoDataStorage=JSON.parse(localStorage.getItem('data'))||[];

const renderTodo = function(){
    todoList.textContent='';
    todoFinished.textContent='';

    function setButtonImage(button, isComplete) {  
        const imageSrc = isComplete ? 'https://www.iconbolt.com/iconsets/microns/box-tick.svg' : 'https://www.iconbolt.com/iconsets/microns/box-tick-o.svg'; 
        const img = button.querySelector('img');  
        img.setAttribute('src', imageSrc); 
    }  

    todoDataStorage.forEach(function(item, index) {  
        const li = document.createElement('li');  
        li.classList.add('todo-item');  
        li.innerHTML = '<span class="todo-text">' + item.value + '</span>' +  
            '<div class="todo-buttons">' +  
            '<button class="todo-remove"></button>' +  
            '<button class="todo-complete"><img src="unchecked.png" alt="Task Status" /></button>'
            '</div>';

        if (item.complete) {  
            todoFinished.append(li);  
        } else {  
            todoList.append(li);  
        }  

        const btnTodoFinished = li.querySelector('.todo-complete');  
        setButtonImage(btnTodoFinished, item.complete);  
        btnTodoFinished.addEventListener('click', event => {  
            item.complete = !item.complete;
            setButtonImage(btnTodoFinished, item.complete);   
            renderTodo();
        });  

        const btnTodoRemove = li.querySelector('.todo-remove');  
        btnTodoRemove.addEventListener('click', event => {  
            todoDataStorage.splice(index, 1);  
            renderTodo();  
        });  
    });

    localStorage.data=JSON.stringify(todoDataStorage);
}


todoManagement.addEventListener('submit', event =>{
    event.preventDefault();

    if (headerInput.value != '') {
        const listTodo = {
            value:headerInput.value,
            complete: false
        }

        todoDataStorage.push(listTodo);
        headerInput.value = '';
        renderTodo();
    }
})

const headerTodoRemove = document.getElementById('remove')

headerTodoRemove.addEventListener('click', event =>{
    event.preventDefault();

    todoDataStorage.length = 0;
    renderTodo();
})

renderTodo();