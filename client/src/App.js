import React, { Component } from "react";
import axios from 'axios';
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
// import API from "./utils/API";
// import { RecipeList, RecipeListItem } from "./components/RecipeList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      stocksearch: "",
      today: [],
      low: [],
      high: []
    };
  }

  stockPrice = query => {
    // console.log(query);
    var pointArray = [];
    var stockArray = [];
    var price= [];

    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
    // var symbol = "MSFT";
    var api_key = "&apikey=0RZS2TDL048HER8Y"
    axios.get(url+query+api_key)
      .then(function (response) {
        var end = new Date();
        var dateArray = [];
        // var stockArray = [];
        const febHoliday = ["2019-02-18"]
        
        for (var d = new Date("2019-02-01"); d <= end; d.setDate(d.getDate() + 1)) {
          if (d.getDay() === 5) {
            // console.log("Saturday")
          } else if (d.getDay() === 6) {
            // console.log("Sunday");
          }
          else {
            dateArray.push(new Date(d).toISOString().slice(0, 10));
          }
        }
        // console.log(dateArray);
        const newdateArray = dateArray.filter(dateArray => !febHoliday.includes(dateArray));
        // console.log(newdateArray);
        for (var i = 0; i < newdateArray.length - 1; i++) {
          stockArray.push(parseFloat(response.data["Time Series (Daily)"][newdateArray[i]]["4. close"]));
        }
        // console.log(stockArray);
        console.log(Math.max(...stockArray));
        // console.log(Math.min(...stockArray));
        price.push(stockArray[stockArray.length-1].toString());
        price.push(Math.min(...stockArray).toString());
        price.push(Math.max(...stockArray).toString());
        // highPrice = Math.max(...stockArray)
        // high = Math.max(...stockArray);
        console.log(price);
        console.log(price[0]);
        

        for (var a = 0; a < stockArray.length; a++) {
          var p = stockArray[a];
          // console.log(y);
          // data.push({a,p});
          pointArray.push({ x: a, y: p });
        }

      }).then(
        console.log("done"),
        this.setState({
          today: price,
          low: price,
          high: price
        })
      )
  }



  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    this.stockPrice(this.state.stockSearch)
  };


  render() {
      // console.log(this.state)
      console.log(this.state.high)

      return (
        <div>
          <Nav />
          <Jumbotron />
          <Container>
            <Row>
              <Col size="md-12">
                <form>
                  <Container>
                    <Row>
                      <Col size="xs-9 sm-10">
                        <Input
                          name="stockSearch"
                          // value={this.state.stocks}
                          onChange={this.handleInputChange}
                          placeholder="Search For a Stock"
                        />
                      </Col>
                      <Col size="xs-3 sm-2">
                        <Button
                          onClick={this.handleFormSubmit}
                          type="success"
                          className="input-lg"
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </form>
              </Col>
            </Row>
            <Row>
              <Col size="sm-3">

                  <h3 className="text-center">Today's Price</h3>
                  <h3 className="text-center">{this.state.today}</h3>     
              </Col>
              <Col size="sm-3">

                  <h3 className="text-center">Lowest Price</h3>
                  <h3 className="text-center">{this.state.low}</h3>   
               
              </Col>
              <Col size="sm-3">

                  <h3 className="text-center">Highest Price</h3>
                  <h3 className="text-center">{this.state.high}</h3>   
               
              </Col>
            </Row>
          </Container>
        </div>
      );

  }
}

export default App;
