// import axios from "axios";

// // The getRecipes method retrieves recipes from the server
// // It accepts a "query" or term to search the recipe api for
// export default {
//   getRecipes: function(query) {
//     return axios.get("/api/recipes", { params: { q: query } });
//   }
// };


import axios from "axios";

const BASEURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
const APIKEY = "&api_key=0RZS2TDL048HER8Y";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};