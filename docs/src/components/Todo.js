import React from 'react';

const Todo = props => (
  <div className="col-md-4">
    <div className="card mb-4">
      <div className="card-header">
        <h3>{props.todo.title}</h3>
        <span className="badge bnger ml-2">{props.todo.priority}</span>
      </div>
      <div className="card-body">
        <p>{props.todo.description}</p>
        <p>{props.todo.responsible}</p>
        <span>{props.todo.dateB}</span>
      </div> 
      <div className="card-footer">
        <div className="row">
          <div className="col pr-2 pl-3 span">
            <button
              disabled
              className="btn btn-primary btn-block"
              onClick={(e) => {
                
              }}>
              Edit
            </button>
          </div>
          <div className="col pr-3 pl-2">
            <button
              className="btn btn-danger btn-block"
              onClick={(e) => {
                props.handleRemoveTodo(props.index);
              }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>  
);

export default Todo;