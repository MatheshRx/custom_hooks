import { useRef, useState } from "react";

const TaskForm = () => {
  const taskInput = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const url =
    "https://react-http-c8897-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json";

  const addTaskHandler = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(false);
    const task = { text: taskInput.current.value };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();

      setLoading(true);

      console.log(data);

      taskInput.current.value = "";
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form
      className="card col-8 col-md-6 mx-auto p-3 pt-5 my-3"
      onSubmit={addTaskHandler}
    >
      <div className="form-floating">
        <input type="text" className="form-control" ref={taskInput} />
        <label className="form-label">New Task</label>
      </div>
      <div className="text-center my-3">
        <button className="btn btn-dark">
          {error ? error : loading ? "Loading" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
