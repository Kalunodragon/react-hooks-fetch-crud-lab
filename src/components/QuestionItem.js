import React from "react";

function QuestionItem({ question, handleDeleteClick, hOCF }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteButton(event){
    const questionId = event.target.parentNode.id
    handleDeleteClick(questionId)
  }

  function handleOnChange(event){
    const correctAnswerId = event.target.parentNode.parentNode.id
    const newCorrectAnswer = event.target.value
    hOCF(correctAnswerId, newCorrectAnswer)
  }

  return (
    <li id={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleOnChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteButton}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
