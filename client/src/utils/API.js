import axios from "axios";
import env from "./keys";
const api = {
  // Query NYT API
  searchNYT: function(topic, startYear, endYear) {
    const authKey =  env.apikey ||  process.env.NYTAPIKEY;
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },
  // Retrieves saved articles from the mongodb
  getArticle: function() {
    return axios.get("/api/saved");
  },
  // Saves a new article to the mongodb
  saveArticle: function(articleObj) {
    return axios.post("/api/saved", articleObj);
  },
  // Deletes an article from the mongodb
  deleteArticle: function(id) {
    return axios.delete(`/api/saved/${id}`);
  }
};

export default api;
