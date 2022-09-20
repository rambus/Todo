

export class Todo {
    static formJson ({id, tarea, completado, creado}) {
        const jsonTodo = new Todo(tarea);

        jsonTodo.id         = id;
        jsonTodo.completado = completado;
        jsonTodo.creado     = creado;
        return jsonTodo;
    }
    constructor ( tarea ){

        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }
}