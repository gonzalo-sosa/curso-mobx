import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { observable } from "mobx";
import TodoList from "./components/TodoList";
import Person from "./models/Person";
// import { observableTodoStore } from "./store";
// import { observableTodoStore } from "./store.decorators.experimental";
import { observableTodoStore } from "./store.decorators.proposal";

const store = observableTodoStore;
store.addTodo("read MobX tutorial");
store.addTodo("try MobX");
store.todos[0].completed = true;
store.todos[1].task = "try MobX in own project";
store.todos[0].task = "grok MobX tutorial";

store.todos[0].completed = !store.todos[0].completed;
store.todos[1].task = "Random todo " + Math.random();

const peopleStore = observable<Person>([
  { id: Date.now().toString() + Math.random().toString(), name: "Michel" },
  { id: Date.now().toString() + Math.random().toString(), name: "Me" },
]);

store.todos[0].assignee = peopleStore[0];
store.todos[1].assignee = peopleStore[1];

function App() {
  return (
    <CssBaseline>
      <TodoList store={store} />
    </CssBaseline>
  );
}

export default App;
