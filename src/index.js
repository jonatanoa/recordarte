import './styles.css'
import {Todo,TodoList} from './classes/main';
import { crearTodoHtml, numPendientes } from './js/componentes';


 export const todoList = new TodoList();

 todoList.todos.forEach(todo=> crearTodoHtml(todo));

 numPendientes();