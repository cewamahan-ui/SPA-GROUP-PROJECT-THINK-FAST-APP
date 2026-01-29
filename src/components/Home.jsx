import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({ fetchExternal }) {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState('easy')
  const [amount, setAmount] = useState(5)
  const [useTimer, setUseTimer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingCategory, setLoadingCategory] = useState(null)

  const categories = [
    { name: 'General Knowledge', id: 9 },
    { name: 'Entertainment: Books', id: 10 },
    { name: 'Entertainment: Film', id: 11 },
    { name: 'Entertainment: Music', id: 12 },
    { name: 'Entertainment: Musicals & Theatres', id: 13 },
    { name: 'Entertainment: Television', id: 14 },
    { name: 'Entertainment: Video Games', id: 15 },
    { name: 'Entertainment: Board Games', id: 16 },
    { name: 'Science & Nature', id: 17 },
    { name: 'Science: Computers', id: 18 },
    { name: 'Science: Mathematics', id: 19 },
    { name: 'Mythology', id: 20 },
    { name: 'Sports', id: 21 },
    { name: 'Geography', id: 22 },
    { name: 'History', id: 23 },
    { name: 'Politics', id: 24 },
    { name: 'Art', id: 25 },
    { name: 'Celebrities', id: 26 },
    { name: 'Animals', id: 27 },
    { name: 'Vehicles', id: 28 },
    { name: 'Entertainment: Comics', id: 29 },
    { name: 'Science: Gadgets', id: 30 },
    { name: 'Entertainment: Japanese Anime & Manga', id: 31 },
    { name: 'Entertainment: Cartoon & Animations', id: 32 }
  ]

  const startQuiz = async (id) => {
    setLoading(true)
    setLoadingCategory(id)
    
    // Determine if timer should be enabled
    // Easy: no timer (default), Medium: optional, Hard: always on
    let timerEnabled = useTimer
    if (difficulty === 'hard') {
      timerEnabled = true
    }
    
    await fetchExternal(id, difficulty, amount, timerEnabled)
    
    // Store category name for high score
    const category = categories.find(c => c.id === id)
    localStorage.setItem('current_quiz_info', JSON.stringify({
      category: category?.name || 'Unknown',
      difficulty: difficulty,
      useTimer: timerEnabled
    }))
    
    setLoading(false)
    setLoadingCategory(null)
    navigate('/quiz')
  }

  return (
    <div className="home">
      <h1>ThinkFast Trivia</h1>
      <div className="options">
        <label>
          Difficulty:
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Questions:
          <select value={amount} onChange={e => setAmount(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        {difficulty !== 'easy' && (
          <label className="timer-option">
            <input
              type="checkbox"
              checked={useTimer}
              onChange={e => setUseTimer(e.target.checked)}
            />
            Enable Timer
          </label>
        )}
      </div>
      
      {difficulty === 'easy' && (
        <p className="timer-info">⏱️ Timer disabled for Easy mode</p>
      )}
      {difficulty === 'medium' && useTimer && (
        <p className="timer-info">⏱️ Timer enabled (10 seconds per question)</p>
      )}
      {difficulty === 'hard' && (
        <p className="timer-info">⏱️ Timer enabled (10 seconds per question)</p>
      )}

      <h2>Select a Category</h2>
      <div className="categories">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => startQuiz(cat.id)}
            disabled={loading}
            className={loadingCategory === cat.id ? 'loading' : ''}
          >
            {loadingCategory === cat.id ? 'Loading...' : cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
