import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import GeoQuiz from './components/GeoQuiz';
import update from 'immutability-helper';
import Result from './components/Result';
import { correctRandomCountriesArray, quizQuestion } from './api/quizQuestion';
import withLabels from "./components/mapStylesWithLabels.json";
import withoutLabels from "./components/mapStylesWithoutLabels.json";

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        counter: 0,
        randomCountryName: '',
        randomCountryLatLong: null,
        styles: { styles: withoutLabels },
        questionId: 1,
        question: '',
        answerOptions: [],
        answer: '',
        answersCount: {
          correct: 0,
          incorrect1: 0,
          incorrect2: 0,
          incorrect3: 0,
          incorrect4: 0
        },
        result: ''
      };

      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }


    componentWillMount() {
      const shuffledAnswerOptions = quizQuestion.map((question) => this.shuffleArray(question.answers));
      this.setState({
        question: quizQuestion[0].question,
        answerOptions: shuffledAnswerOptions[0],
        randomCountryName: correctRandomCountriesArray[0][3],
        randomCountryLatLong: { lat: correctRandomCountriesArray[0][1], lng: correctRandomCountriesArray[0][2] }
      });
    }

    shuffleArray(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    handleAnswerSelected(event) {
      this.setUserAnswer(event.currentTarget.value);
      if (this.state.questionId < quizQuestion.length) {
          setTimeout(() => this.setNextQuestion(), 300);
        } else {
          setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setUserAnswer(answer) {
      const updatedAnswersCount = update(this.state.answersCount, {
       [answer]: {$apply: (currentValue) => currentValue + 1}
      });
      this.setState({
       answersCount: updatedAnswersCount,
       answer: answer
      });
    }


    setNextQuestion() {
      const counter = this.state.counter + 1;
      const questionId = this.state.questionId + 1;
      this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestion[counter].question,
          answerOptions: quizQuestion[counter].answers,
          answer: ''
      });
    }

    getResults() {
      const answersCount = this.state.answersCount;
      const answersCountKeys = Object.keys(answersCount);
      const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
      const maxAnswerCount = Math.max.apply(null, answersCountValues);

      return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }


    setResults(result) {
      if (result.length === 1) {
        this.setState({ result: result[0] === "correct" ? 'correct' : 'incorrect'});

      } else {
        this.setState({ result: 'Undetermined' });
      }
    }

    renderQuiz() {
      return (
        <div>
          <Map
            counter={this.state.counter}
            randomCountryLatLong={this.state.randomCountryLatLong}
            randomCountryName={this.state.randomCountryName}
            defaultOptions={{ styles: withoutLabels }}
          />
          <GeoQuiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestion.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
        </div>
      );
    }

    renderResult() {
      return (
        <div>
          <div>
            <Map
              counter={this.state.counter}
              randomCountryLatLong={this.state.randomCountryLatLong}
              randomCountryName={this.state.randomCountryName}
              defaultOptions={{ styles: withLabels }}
            />
            <Result
              quizResult={this.state.result}
              randomCountryName={this.state.randomCountryName}
              reload={setTimeout(() => window.location.href = window.location.href, 2500)}
            />
          </div>
        </div>
      );
    }

    render() {
      return (
        <div className="App">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      );
    }
}

export default App;
