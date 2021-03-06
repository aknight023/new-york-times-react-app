import React from "react";

const Search = (props) => (
  <div>
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <strong>Search</strong> <i className="fas fa-search"></i>
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year</label>
                <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year</label>
                <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
              </div>
              <button onClick={props.handleFormSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <br/><br/>
  {props.results.length ? (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <strong>Results</strong> <i className="far fa-newspaper"></i>
            </h3>
          </div>
          <div className="card-body">
            {props.renderArticles()}
          </div>
        </div>
      </div>
    </div>
  ) : (<div></div>) }
    <br/><br/>
  </div>
);

export default Search;
