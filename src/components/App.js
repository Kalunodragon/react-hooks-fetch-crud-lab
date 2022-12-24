import React, { useEffect ,useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [list, setList] = useState(null)

  const API_URL = "http://localhost:4000/questions"

  useEffect(()=> {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => setList(data))
      
  }, [list])

  // function handleStateOfListOfQuestions(information){
  //   setList(information)
  // }

  function handleStateUpdate(info){
    console.log(info)
    setList([...list, info])
  }

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"
    })
      .then((r) => r.json())
      .then(() => {
        setList(list.filter((q) => q.id !== id))
      })
  }

  function handleOnChangeFetch(currentId, newAnswerIndex){
    const updatedBodyInfo = { "correctIndex": newAnswerIndex }

    fetch(`http://localhost:4000/questions/${currentId}`, {
      method: "PATCH",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify(updatedBodyInfo)
    })
    .then(r => r.json())
    .then(updatedData => {
      const updatedList = list.map((question) => question.id === currentId ? updatedData : question)
      setList(updatedList)
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {
        page === "Form" ?
          <QuestionForm 
            onStateUpdate={handleStateUpdate}
          /> :
          <QuestionList 
            list={list}
            handleDeleteClick={handleDeleteClick}
            hOCF={handleOnChangeFetch}
          />
      }
    </main>
  );
}

export default App;
