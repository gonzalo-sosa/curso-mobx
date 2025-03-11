import { action, computed, makeObservable, observable } from "mobx";
import Todo from "./models/Todo";

class ObservableTodoStore {
  constructor(
    public todos: Array<Todo> = [],
    public pendingRequests: number = 0
  ) {
    makeObservable(this, {
      todos: observable, // variable
      pendingRequests: observable, // variable
      completedTodosCount: computed, // valor calculado
      report: computed, // valor calculado
      addTodo: action, // función
      editTodo: action, // función
    });
  }

  get completedTodosCount() {
    return this.todos.filter((t) => t.completed).length;
  }

  get report() {
    if (this.todos.length === 0) return "Sin tareas";

    const nextTodo = this.todos.find((t) => t.completed === false);
    return (
      `Próxima tarea: "${nextTodo ? nextTodo.task : "Ninguna"}". ` +
      `Progreso: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo = (task: string) => {
    this.todos.push({
      task,
      id: Date.now().toString(),
      completed: false,
    });
  };

  editTodo = (todo: Todo) => {
    const todoToUpdate = this.todos.find((t) => t.id === todo.id);
    if (todoToUpdate) Object.assign(todoToUpdate, todo);
  };
}

export const observableTodoStore = new ObservableTodoStore();
