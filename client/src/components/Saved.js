import React from "react";

const Saved = (props) => (
  
    <li className="list-group-item">
      <h5>{props.title}</h5>
        <div className="btn-group float-right">
          <a href={props.url} target="_blank">
            <button className="btn btn-default ">View Article</button>
          </a>
          <button className="btn btn-primary" onClick={() => props.handleDeleteButton(props._id)}>Delete</button>
        </div>
      
      <p>Date Published: {props.date}</p>
    </li>
  
);  
export default Saved
