import "./styles/App.css";
import { INIT_LIST } from "../config";
import Page from "../components/Page";

function App() {
  return <Page initState={INIT_LIST} />;
}

export default App;
