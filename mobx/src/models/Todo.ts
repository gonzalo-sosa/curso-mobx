import Person from "./Person";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  assignee?: Person;
};
export default Todo;
