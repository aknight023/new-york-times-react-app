import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/API";
import moment from "moment";

class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }
  // Using Momentjs to parse date and time
  dateFormat = (dateA) => {    
     let date = moment(dateA);
    return  date.utc().format('MM-DD-YYYY'); 
  }

  // Rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={this.dateFormat(article.pub_date)}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }
 
  // Keep track of what user types for topic
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // Keep track of what user types for start year
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types for end year
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();

    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });        
      });
  }

  // When save article button is clicked, add article to db in mongo DB
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // When delete article button is clicked, remove article from mongo db
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

        <div className="container">
          {/* Jumbotron main section */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h3 className="text-center">This App was created with React</h3>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
            results={this.state.articles}
          />
          {/* Saved Articles Section */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <strong>Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">                      
                      {this.state.saved.map(save => (
                      <Saved
                        _id={save._id}
                        key={save._id}
                        title={save.title}
                        date={this.dateFormat(save.date)}
                        url={save.url}
                        handleDeleteButton={this.handleDeleteButton}
                        getSavedArticles={this.getSavedArticles}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>          
        </div>
      

    );
  }

}

export default Main;
