import { action, computed, makeObservable, observable } from "mobx";
import Todo from "./models/Todo";

class ObservableTodoStore {
  @observable todos: Array<Todo> = [];

  @observable pendingRequests: number = 0;

  constructor() {
    makeObservable(this);
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter((t) => t.completed).length;
  }

  @computed
  get report() {
    if (this.todos.length === 0) return "Sin tareas";

    const nextTodo = this.todos.find((t) => t.completed === false);
    return (
      `Próxima tarea: "${nextTodo ? nextTodo.task : "Ninguna"}". ` +
      `Progreso: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  @action
  addTodo = (task: string) => {
    this.todos.push({
      task,
      id: Date.now().toString(),
      completed: false,
    });
  };

  @action
  editTodo = (todo: Todo) => {
    const todoToUpdate = this.todos.find((t) => t.id === todo.id);
    if (todoToUpdate) Object.assign(todoToUpdate, todo);
  };
}

export const observableTodoStore = new ObservableTodoStore();
