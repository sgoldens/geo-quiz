import React from 'react';

function Question(props) {
  return (
      <h3 className="question">{props.content}</h3>
  )
}

Question.propTypes = {
  content: React.PropTypes.string.isRequired
};

export default Question;
