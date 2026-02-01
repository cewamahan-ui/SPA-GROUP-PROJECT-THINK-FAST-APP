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

  // adding question to json-server
  const addQuestion = (newQ) => {
    console.log('Adding question:', newQ)
    fetch('http://localhost:3001/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQ)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add question')
        return res.json()
      })
      .then(data => {
        console.log('Question added:', data)
        setQuestions(prevQuestions => [...prevQuestions, data])
      })
      .catch(err => {
        console.error('Error adding question:', err)
        alert('Failed to add question. Make sure JSON server is running (npm run server)')
      })
  }

  // DELETE from json-server
  const deleteQuestion = (id) => {
    fetch(`http://localhost:3001/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter(q => q.id !== id)))
  }
 
  // UPDATE to json-server
  const updateQuestion = (id, updated) => {
    const updatedWithId = { ...updated, id }
    fetch(`http://localhost:3001/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWithId)
    })
      .then(res => res.json())
      .then(data => setQuestions(questions.map(q => q.id === id ? data : q)))
      .catch(err => console.error('Update failed:', err))
  }

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home fetchExternal={fetchExternalQuestions} />} />
          <Route path="/quiz" element={<Quiz externalQuestions={externalQuestions} />} />
          <Route path="/highscore" element={<HighScore />} />
          <Route path="/questions" element={<QuestionList questions={questions} onDelete={deleteQuestion} onUpdate={updateQuestion} onAdd={addQuestion} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
