import { Check } from "@mui/icons-material";
import { Checkbox, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import Todo from "../models/Todo";

interface TodoViewProps {
  todo: Todo;
  onEditTodo: (todo: Todo) => void;
}

function TodoView({ todo, onEditTodo }: TodoViewProps) {
  function onToggleCompleted() {
    onEditTodo({ ...todo, completed: !todo.completed });
  }

  function onRename() {
    const task = prompt("Nombre de la tarea", todo.task) || todo.task;
    onEditTodo({ ...todo, task });
  }

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox onChange={onToggleCompleted} checkedIcon={<Check />} />
      </ListItemIcon>
      <ListItemText
        onDoubleClick={onRename}
        primary={todo.task}
        secondary={todo.assignee?.name ?? ""}
      />
    </ListItem>
  );
}

export default observer(TodoView);
