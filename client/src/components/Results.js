import React from "react";

const Results = (props) => (
  
    <li className="list-group-item">
      <h4>{props.title}</h4>
        <div className="btn-group float-right">
          <a href={props.url} target="_blank">
            <button className="btn btn-default ">View Article</button>
          </a>
          <button className="btn btn-primary" onClick={() => props.handleSaveButton(props._id)}>Save</button>
        </div>      
      <p>Date Published: {props.date}</p>
    </li>
  
  );

export default Results;
