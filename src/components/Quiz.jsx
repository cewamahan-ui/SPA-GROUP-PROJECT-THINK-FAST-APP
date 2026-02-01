import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const decodeHtml = (html) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
//initial states
export default function Quiz({ externalQuestions }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)

  //side effects of the useStates
  useEffect(() => {
    setAnswers(new Array(externalQuestions.length).fill(null))
  }, [externalQuestions.length])

  if (!externalQuestions.length) {
    return (
      <div className="quiz">
        <button className="back-arrow" onClick={() => navigate('/')}>←</button>
        <h2>Loading...</h2>
      </div>
    )
  }

  const question = externalQuestions[current]
  const correctAnswer = decodeHtml(question.correct_answer)
  const allAnswers = [...question.incorrect_answers, question.correct_answer]
    .map(a => decodeHtml(a))
    .sort(() => Math.random() - 0.5)

  const handleAnswer = (answer) => {
    setSelected(answer)
    const newAnswers = [...answers]
    newAnswers[current] = answer === correctAnswer
    setAnswers(newAnswers)
    setTimeout(() => {
      setSelected(null)
      if (current < externalQuestions.length - 1) {
        setCurrent(c => c + 1)
      } else {
        const score = answers.filter(a => a === true).length
        localStorage.setItem('last_quiz_score', JSON.stringify({ score, total: externalQuestions.length }))
        navigate('/highscore')
      }
    }, 800)
  }

  const score = answers.filter(a => a === true).length

  return (
    <div className="quiz">
      <button className="back-arrow far-left" onClick={() => navigate('/')}>←</button>
      <div className="quiz-header">
        <span>Q: {current + 1}/{externalQuestions.length}</span>
        <span>Score: {score}</span>
      </div>
      <h3>{decodeHtml(question.question)}</h3>
      <div className="answers">
        {allAnswers.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(ans)}
            disabled={selected}
            className={selected ? (ans === correctAnswer ? 'correct' : ans === selected ? 'wrong' : '') : ''}
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  )
}
