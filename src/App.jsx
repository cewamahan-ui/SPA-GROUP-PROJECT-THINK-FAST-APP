import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/Navbar'
import Home from './components/Home'
import Quiz from './components/Quiz'
import HighScore from './components/HighScore'
import QuestionList from './components/QuestionList'
import QuestionForm from './components/QuestionForm'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [externalQuestions, setExternalQuestions] = useState([])

  // GET from json-server
  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  // GET from external API (Open Trivia)
  const fetchExternalQuestions = async (categoryId, difficulty = 'easy', amount = 5, useTimer = false) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`)
    const data = await res.json()
    setExternalQuestions(data.results || [])
  }

  // POST to json-server
  const addQuestion = (newQ) => {
    fetch('http://localhost:3001/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQ)
    })
      .then(res => res.json())
      .then(data => setQuestions([...questions, data]))
  }

  // DELETE from json-server
  const deleteQuestion = (id) => {
    fetch(`http://localhost:3001/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter(q => q.id !== id)))
  }

  // UPDATE to json-server
  const updateQuestion = (id, updated) => {
    fetch(`http://localhost:3001/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(() => setQuestions(questions.map(q => q.id === id ? updated : q)))
  }

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home fetchExternal={fetchExternalQuestions} />} />
          <Route path="/quiz" element={<Quiz externalQuestions={externalQuestions} />} />
          <Route path="/highscore" element={<HighScore />} />
          <Route path="/questions" element={<QuestionList questions={questions} onDelete={deleteQuestion} onUpdate={updateQuestion} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
