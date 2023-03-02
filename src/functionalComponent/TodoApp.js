import React, { useState, useEffect } from "react";
import "./style.css";

function TodoItem(props) {
  return (
    <div className="check-box">
      <label className="custom-checkbox">
        <input
          className="input-check"
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.handleChange(props.todo.id)}
        />
        <span className="checkmark"></span>
      </label>

      <span
        className="text-box"
        style={{
          textDecoration: props.todo.completed ? "line-through" : "none",
          color: props.todo.completed ? "black" : "white",
          fontSize: props.todo.completed ? "13px" : "14px",
        }}
      >
        {props.todo.text}
      </span>

      <button
        className="edit-btn"
        onClick={() => props.editTodo(props.todo.id)}
      >
        Edit
      </button>
      <button
        className="delete-btn"
        onClick={() => props.deleteTodo(props.todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

function TodoList(props) {
  return (
    <div className="list">
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChange={props.handleChange}
          editTodo={props.editTodo}
          deleteTodo={props.deleteTodo}
        />
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "sample ToDo", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "What needs to be done?",
    "Enter task here",
    "What's next?",
    "What needs to be accomplished?",
  ];
  const [date] = useState(new Date());
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((placeholderIndex + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderIndex]);

  function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <p style={{ fontWeight: "bold", color: "white" }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    );
  }

  function handleAdd() {
    if (newTodo.length === 0) {
      alert("Please enter something");
    } else {
      const newId = todos.length + 1;
      setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
      setNewTodo("");
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleAdd();
    }
  }

  function handleChange(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function editTodo(id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const todo = todos[todoIndex];
    const newTodoText = prompt("Enter the new to-do text:", todo.text);
    if (newTodoText) {
      todo.text = newTodoText;
      setTodos([
        ...todos.slice(0, todoIndex),
        todo,
        ...todos.slice(todoIndex + 1),
      ]);
    }
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="top-bar">
        <Clock />
        <div>
          <span style={{ fontWeight: "bold", color: "white" }}>
            woops it's{" "}
          </span>
          <span
            style={{ fontWeight: "bold", color: "lightblue" }}
          >{`${day}`}</span>
        </div>
        <p
          style={{ fontWeight: "bold", color: "white" }}
        >{` ${date.getDate()}-${month}-${year}`}</p>
      </div>
      <div className="input-box">
        <div className="input-main">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIndex]}
          />
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <TodoList
        todos={todos}
        handleChange={handleChange}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
