import "./styles/App.css";
import { INIT_TODOS } from "../config";
import Todo from "../components/Todo";

function App() {
  return <Todo initState={INIT_TODOS}></Todo>;
}

export default App;
