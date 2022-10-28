//Referencias en el html
import { Todo } from './../classes/todo.class';
import { todoList } from './../index';
const divTodoList   = document.querySelector('.todo-list')//selecciona al ul padre de los demas elementos
const txtInput      = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed')
const ulFiltros     = document.querySelector('.filters')
const anchoFiltros  = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo)=>{

    const htmlTodo = `
        <li class="${(todo.completado)? 'completed': ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado)? 'checked': ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.append(div.firstElementChild); //para poder ingresar solamente el primer hijo dentro del div y no insertar el div, sino directamente el li

    return div.firstElementChild;
};

//eventos
txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodoValor = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodoValor)
        crearTodoHtml(nuevoTodoValor);
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click',(event)=>{
    const nombreElemento = event.target.localName;// input, label, boton
    const todoElemento   = event.target.parentElement.parentElement;//se accede al li
    const todoId         = todoElemento.getAttribute('data-id'); //muestra el id

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed') //toggle agrega o quita la clase o la cambia
    }else if (nombreElemento.includes('button')){ //borramos la tarea
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        
    }
});

btnBorrar.addEventListener('click',()=>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1;i>=0;i--){
        const elemento = divTodoList.children[i];
        console.log(elemento);
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento)
        }
    }
});

ulFiltros.addEventListener('click', (event)=>{
    const filtro = event.target.text;
    if(!filtro) {return;}

    anchoFiltros.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed')

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
            if(!completado){
                elemento.classList.add('hidden')
            }
            break;
        }
    }
})