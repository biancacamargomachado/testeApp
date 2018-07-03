import React, { Component } from 'react';
import moment from 'moment';

import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import logo from './task-done-outline.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if(tasks) this.setState({ tasks });
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  handleAddTodo(todo, order) {    
    let tasksAux = this.state.tasks;

    tasksAux.push(todo);
    tasksAux.sort((a, b) => {
      const date = moment(a.dateB, 'DD/MM/YYYY').diff(moment(b.dateB, 'DD/MM/YYYY'));

      if(date !== 0) return date;
      return order[a.priority] > order[b.priority];
    });

    this.setState({ tasks: tasksAux });
  }

  handleRemoveTodo(i) {    
    let tasksAux = this.state.tasks;
    
    tasksAux.splice(i,1);

    this.setState({ tasks : tasksAux });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar -dark bg-dark">
          <a lang="en" href="" className="text-white"> 
            Tasks
            <span lang="en" className="badge badge-pill badge-light ml-2">
              {this.state.tasks.length}
            </span>  
          </a>
        </nav> 
        <div className="container">
          <div className="row mt-4">  
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <TodoForm 
                handleAddTodo={this.handleAddTodo}>
              </TodoForm>
            </div>
            <div className="col-md-8">
              <div className="row a">
                {this.state.tasks.map((todo, i) => {
                  return <Todo 
                    todo={todo}
                    index={i}
                    key={todo.id}
                    handleRemoveTodo={this.handleRemoveTodo}
                  />;
                })}
              </div>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

export default App;