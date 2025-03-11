import { Box, Button, List, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { observableTodoStore } from "../store";
import TodoItem from "./TodoItem";

interface TodoListProps {
  store: typeof observableTodoStore;
}

function TodoList({ store }: TodoListProps) {
  function onAddTodo() {
    store.addTodo(prompt("Ingresa una nueva tarea:", "café por dios")!);
  }

  return (
    <Box p={4}>
      <Typography gutterBottom variant="h4">
        Lista de tareas
      </Typography>
      <Typography variant="subtitle1">{store.report}</Typography>
      <List>
        {store.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEditTodo={store.editTodo} />
        ))}
      </List>
      <Button onClick={onAddTodo} variant="contained">
        Añadir tarea
      </Button>
    </Box>
  );
}

export default observer(TodoList);
