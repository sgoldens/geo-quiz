import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { correctRandomCountries } from '../../../api/quizQuestions';
import 'react-table/react-table.css'
import { Table } from 'react-bootstrap';

export class Result extends Component {

  renderRows(country, index) {
    if (country.content[3] === this.props.playerAnswers[index]) {
      return <td className='green'>{this.props.playerAnswers[index]}</td>
    } else {
      return <td className='red'>{this.props.playerAnswers[index]}</td>
    }
  }

  render() {

    return (
      <ReactCSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div id="container-result">
          <Table id="results-table" condensed bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>Your Guess</th>
                </tr>
            </thead>
            <tbody>
                {correctRandomCountries !== null ?
                    correctRandomCountries.map((country, index) => {
                        return(
                          <tr>
                              <td>{(index +1)}</td>
                              <td>{country.content[3]}</td>
                              {this.renderRows(country, index)}
                          </tr>)
                    }) : (<tr><td></td><td></td><td></td><td></td></tr>)}
            </tbody>
          </Table>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Result.propTypes = {
  quizResult: PropTypes.object.isRequired,
};

export default Result;
