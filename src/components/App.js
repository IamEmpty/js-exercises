import React, { Component } from 'react';

import Home from "../scenes/Home/Home";
import Exam from '../scenes/Exam/Exam';
import Train from '../scenes/Train/Train';
import FinalResults from '../scenes/FinalResults';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true,
      exam: false,
      train: false,
      results: false,
    };

    this.userAnswers = [];
  }

  handleExamClick = () => {
    this.setState({
      home: false,
      exam: true,
    });
  };

  handleTrainClick = () => {
    this.setState({
      home: false,
      train: true,
    });
  };

  handleCloseExamClick = () => {
    this.setState({
      home: true,
      exam: false,
      train: false
    });
  };

  handleShowResults = () => {
    this.setState({
      home: false,
      exam: false,
      train: false,
      results: true,
    });
  };

  returnHome = () => {
    this.setState({
      home: true,
      exam: false,
      train: false,
      results: false,
    });
  };

  render() {
    let screen;
    if (this.state.home) screen = <Home exam={this.handleExamClick} train={this.handleTrainClick}/>;
    if (this.state.exam) screen = <Exam home={this.handleCloseExamClick} results={this.handleShowResults} uss={this.userAnswers}/>;
    if (this.state.train) screen = <Train home={this.handleCloseExamClick} results={this.handleShowResults} uss={this.userAnswers}/>;
    if (this.state.results) screen = <FinalResults userAnswers={this.userAnswers} tryAgain={this.handleExamClick} returnHome={this.returnHome}/>;

    return (
      <div>{screen}</div>
    );
  }
}

export default App;
