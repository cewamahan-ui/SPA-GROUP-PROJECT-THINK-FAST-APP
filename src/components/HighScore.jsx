import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HighScore() {
  const navigate = useNavigate()
  const [scores, setScores] = useState([])
  const [lastScore, setLastScore] = useState(null)
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('thinkfast_scores') || '[]')
    setScores(savedScores.sort((a, b) => b.score - a.score).slice(0, 10))
    
    const lastQuizScore = JSON.parse(localStorage.getItem('last_quiz_score'))
    if (lastQuizScore) {
      setLastScore(lastQuizScore)
      localStorage.removeItem('last_quiz_score')
    }
  }, [])

  //event listening
  const saveScore = (e) => {
    e.preventDefault()
    if (!playerName.trim()) return

    const newScore = {
      name: playerName.trim(),
      score: lastScore.score,
      total: lastScore.total
    }

    const updatedScores = [...scores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    localStorage.setItem('thinkfast_scores', JSON.stringify(updatedScores))
    setScores(updatedScores)
    setLastScore(null)
    setPlayerName('')
  }

  return (
    <div className="highscore">
      <button className="back-arrow" onClick={() => navigate('/')}>←</button>
      <h1>🏆 High Scores</h1>
      
      {lastScore && (
        <div className="save-score-section">
          <div className="last-score-card">
            <p>Your Score: {lastScore.score}/{lastScore.total}</p>
          </div>
          <form onSubmit={saveScore} className="save-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={15}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      
      {scores.length === 0 && !lastScore ? (
        <p className="no-scores">No scores yet! Complete a quiz to play.</p>
      ) : (
        <div className="scores-grid">
          {scores.map((s, i) => (
            <div key={i} className={`score-card ${i < 3 ? 'top-three' : ''}`}>
              <div className="rank">#{i + 1}</div>
              <div className="name">{s.name}</div>
              <div className="score">{s.score}/{s.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
