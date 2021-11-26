   import React, { Component } from 'react';
import update from 'immutability-helper';
import GeoMap from './components/Map';
import GeoQuiz from './components/GeoQuiz';
import Result from './components/Result';
import { correctRandomCountries, gameLength, populateQuizQuestions, quizQuestions } from '../../api/quizQuestions';
// import annyang from 'annyang';

class GeoQuizApp extends Component {

    constructor(props) {
      super(props);

      this.state = {
        gameLength: gameLength,
        counter: 0,
        correctCountryName: '',
        correctCountryLatLong: null,
        styles: {},
        questionId: 1,
        question: '',
        answerOptions: [],
        answer: '',
        playerAnswers: [],
        answersCount: {
          correct: 0,
          // TODO: Obfuscate correct from incorrect through an API microservice call
          // TODO: Remove unused state props
          incorrect1: 0,
          incorrect2: 0,
          incorrect3: 0,
          incorrect4: 0
        },
        result: ''
      };

      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    // componentDidMount() {
    //   if (annyang) {
    //     // Let's define a command.
        
    //     const commands = {
    //       1 : () => document.getElementsByTagName('input')[0].click(),
    //       2 : () => document.getElementsByTagName('input')[1].click(),
    //       3 : () => document.getElementsByTagName('input')[2].click(),
    //       4 : () => document.getElementsByTagName('input')[3].click(),
    //       5 : () => document.getElementsByTagName('input')[4].click()
    //     };

    //     // Add our commands to annyang
    //     annyang.addCommands(commands);

    //     // Start listening.
    //     annyang.start();
    //   }
    // }

    componentWillMount() {
      populateQuizQuestions(gameLength)

      const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
      this.setState({
        question: quizQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        correctCountryName: correctRandomCountries[0].content[3],
        correctCountryLatLong: [correctRandomCountries[0].content[2], correctRandomCountries[0].content[1]] 
      });

    //   if (annyang) {
    //     // Let's define our first command. First the text we expect, and then the function it should call
    //     var commands = {
    //       "Posts": () => {
    //         window.location('/#Posts')
    //       }
    //     };

    //     // Add our commands to annyang
    //     annyang.addCommands(commands);

    //     // Start listening. You can call this here, or attach this call to an event, button, etc.
    //     annyang.start();
    //   }
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
      this.setUserAnswer(event.currentTarget.id, event.currentTarget.value
        );
      if (this.state.questionId < quizQuestions.length) {
          setTimeout(() => this.setNextQuestion(), 300);
        } else {
          setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setUserAnswer(answer, countryName) {
      const updatedAnswersCount = update(this.state.answersCount, {
       [answer]: {$apply: (currentValue) => currentValue + 1}
      });
      const updatedPlayerAnswers = update(this.state.playerAnswers, {
       [answer]: {$apply: () => this.state.playerAnswers.push(countryName)}
      });

      this.setState({
       answersCount: updatedAnswersCount,
       answer: answer === "correct" ? "correct" : "incorrect",
       playerAnswers: updatedPlayerAnswers,
      });
    }


    setNextQuestion() {
      const counter = this.state.counter + 1;
      const questionId = this.state.questionId + 1;
      this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          answer: '',
          correctCountryName: correctRandomCountries[counter].content[3],
          correctCountryLatLong: [correctRandomCountries[counter].content[2], correctRandomCountries[counter].content[1]]
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
      if (result.length >= 0) {
        this.setState({ result: <span id="correctResults">: {this.state.answersCount.correct}</span> });
      }
    }

    renderQuiz() {
      return (
        <div>
          <GeoMap className="flexcontainer bigitem" 
            counter={this.state.counter}
            correctCountryLatLong={this.state.correctCountryLatLong}
            correctCountryName={this.state.correctCountryName}
          />
          <GeoQuiz className="flexcontainer smallitem"
            counter={this.state.counter}
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            answersCount={this.state.answersCount}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
        </div>
      );
    }

    renderResult() {
      return (
        <Result
          counter={this.state.counter}
          playerAnswers={this.state.playerAnswers}
          answersCount={this.state.answersCount}
          quizResult={this.state.result}
          correctCountryName={this.state.correctCountryName}
          reload={setTimeout(() => window.location.reload(), 7000)}
        />
      );
    }

    render() {
      return (
        <div id="GeoQuizContainer">
          <div id="GeoQuizApp">
            {this.state.result ? this.renderResult() : this.renderQuiz()}
          </div>
        </div>
      );
    }
}

export default GeoQuizApp;