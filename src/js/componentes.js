import { todoList } from '../index';
import {Todo} from './classes';
// referencias en HTML
const divTodoList       = document.querySelector(".todo-list");
const txtInput          = document.querySelector(".new-todo");
const borrarCompletados = document.querySelector('.clear-completed');
const filtros           = document.querySelector('.filters');
const anclasFiltros     = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
 <div class="view">
     <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
     <label>${todo.tarea}</label>
     <button class="destroy"></button>
 </div>
 <input class="edit" value="Create a TodoMVC template">
</li>`;
  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};


// eventos

txtInput.addEventListener('keyup', (event)=> {
    if(event.keyCode === 13 && event.target.value != '') {
        const valorInput = new Todo(event.target.value);
        todoList.nuevoTodo(valorInput);

        crearTodoHtml(valorInput);
        txtInput.value='';
        console.log(todoList);
    }
});
divTodoList.addEventListener('click', (event) => {
    console.log('click');
    // esto será un input un label o un botón
    const nombreElemento = event.target.localName;
    const todoEemento    = event.target.parentElement.parentElement;
    const todoId         = todoEemento.getAttribute('data-id');
    if ( nombreElemento.includes('input')) {//hace click en el check para indicar la tarea completada
        todoList.marcarCompletado(todoId);
        todoEemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoEemento);
        console.log(nombreElemento, todoId);
    }

    console.log(todoList);
});

borrarCompletados.addEventListener('click', (event)=>{
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if ( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});
filtros.addEventListener('click', (event)=> {
    const filtro = event.target.text;
    if (!filtro) return;
    anclasFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch ( filtro ) {
            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado) {
                    elemento.classList.add('hidden');
                }
            break;   
        }
    }

})