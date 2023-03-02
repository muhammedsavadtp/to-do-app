import React, { Component } from "react";
import "./style.css";

class TodoApp extends Component {
  state = {
    input: "",
    items: [],
  };

  onHandleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  StoreItems = (event) => {
    event.preventDefault();
    const { input } = this.state;

    if (input.length === 0) {
      // input value is empty
      console.log("please enter something");
      alert("please enter something");
    } else {
      // input value is not empty
      this.setState({
        items: [...this.state.items, { text: input, completed: false }],
        input: "",
      });
    }
  };
  deleteItem = (key) => {
    console.log(key);

    this.setState({
      items: this.state.items.filter((data, index) => index !== key),
    });
  };
  handleCheckboxChange = (index) => {
    const newItems = [...this.state.items];
    newItems[index].completed = !newItems[index].completed;
    this.setState({ items: newItems });
  };

  render() {
    const { input, items } = this.state;

    return (
      <div className="container">
        <div className="heder">
          <h1>ToDo</h1>
        </div>

        <form className="input-container" onSubmit={this.StoreItems}>
          <input
            value={input}
            onChange={this.onHandleChange}
            type="text"
            placeholder="Type somthing..."
          />
          <button type="submit">Add</button>
        </form>

        {items.map((data, index) => {
          console.log(data.text);
          return (
            <div className="list-container">
              <div className="main-list">
                <input
                  type="checkbox"
                  className="google-style-checkbox"
                  id={`checkbox${index}`}
                  name={`checkbox${index}`}
                  onChange={() => this.handleCheckboxChange(index)}
                />

                <ul>
                  <li
                    key={index}
                    className={
                      this.state.items[index].completed ? "strikethrough" : ""
                    }
                  >
                    {data.text}
                  </li>
                </ul>
                <button onClick={() => this.deleteItem(index)}>X</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TodoApp;
