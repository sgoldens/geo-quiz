import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
  return (
    <div className="question">
      {props.content}
    </div>
  )
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
