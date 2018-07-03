import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

class TodoForm extends Component {
  constructor() {
    super();
    this.order = {
      'low': 3,
      'medium': 2,
      'high': 1
    }
    this.state = {
      id: 0,
      title: '',
      responsible: '',
      description: '',
      date: moment(),
      dateB: moment().format('DD/MM/YYYY'),
      priority: 'low'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
    const id = JSON.parse(localStorage.getItem("id"));

    if(id) this.setState({ id });
  }

  componentDidUpdate() {
    localStorage.setItem("id", JSON.stringify(this.state.id));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleAddTodo(this.state, this.order);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      title: '',
      responsible: '',
      description: '',
      date: moment(),
      dateB: moment().format('DD/MM/YYYY'),
      priority: 'low'
    }));
  }

  handleDayChange(day) {    
    this.setState({ 
      date: day,
      dateB: moment(day).format('DD/MM/YYYY')
    });
  }

  handleInputChange(e) {
    const {value, name} = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="card">
        <form onSubmit={this.handleSubmit} className="card-body">
          <div className="form-group">
          <label lang="en" for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="form-group">
          <label lang="en" for="responsible">Responsible</label>
            <input
              type="text"
              name="responsible"
              id="responsible"
              className="form-control"
              value={this.state.responsible}
              onChange={this.handleInputChange}
              placeholder="Responsible"
              required
            />
          </div>
          <div className="form-group">
          <label  lang="en" for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Description"
              required
            />
          </div>
          <div className="form-group">
          <label for="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              className="form-control"
              value={this.state.priority}
              onChange={this.handleInputChange}
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
          <div className="form-group">
          <label lang="en" for="date">Date</label>
            <DatePicker
              name="date"
              id="date"
              className="form-control"
              dateFormat="DD/MM/YYYY"
              selected={this.state.date}
              onChange={this.handleDayChange}
              calendarClassName="rasta-stripes"
            />
          </div>
          <button lang="en" type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default TodoForm;