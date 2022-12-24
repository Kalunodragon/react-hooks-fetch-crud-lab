import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ list, handleDeleteClick, hOCF }) {

  if(!list){
    return <h3>Loading...</h3>
  }

  const liElement = list.map((question) => {
    return <QuestionItem
              question={question}
              key={question.id}
              handleDeleteClick={handleDeleteClick}
              list={list}
              hOCF={hOCF}
            />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {liElement}
      </ul>
    </section>
  );
}

export default QuestionList;
