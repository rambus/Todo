import './styles.css';
import  {Todo,  TodoList} from './js/classes';
import {crearTodoHtml} from './js/componentes'


const tarea = new Todo('Aprender JavaScript :)');
// const tarea2 = new Todo('visitar al dentista');
 export const todoList = new TodoList();

 todoList.todos.forEach( todo => crearTodoHtml( todo ) );