import { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import TaskList from "./TaskList";

const Tasks = () => {
  const [tasksData, setTaskData] = useState([]);

  const { error, loading, sendRequest: fetchTask } = useHttp();

  const resultHandler = (data) => {
    const fetchedTask = [];

    for (let task in data) {
      fetchedTask.push({
        id: task,
        text: data[task].text,
      });
    }

    setTaskData(fetchedTask);
  };
  useEffect(() => {
    fetchTask(
      {
        url: "https://react-http-c8897-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      resultHandler
    );
  }, [fetchTask]);

  // const fetchTask = async () => {
  //   setLoading(false);
  //   setError(false);
  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error("Something Went Wrong ..!");
  //     }

  //     const data = await response.json();

  //     const fetchedTask = [];

  //     for (let task in data) {
  //       fetchedTask.push({
  //         id: task,
  //         text: data[task].text,
  //       });
  //     }

  //     setTaskData(fetchedTask);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <ul className="list-group card col-8 mx-auto">
      {tasksData.map((task) => {
        return <TaskList key={task.id} task={task.text} />;
      })}
    </ul>
  );
};

export default Tasks;
