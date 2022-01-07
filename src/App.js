import { Fragment } from "react";
import TaskForm from "./components/TaskForm";
import Tasks from "./components/Tasks";

import "./css/sketchy/bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <TaskForm />
      <Tasks />
    </Fragment>
  );
}

export default App;
