import { useState } from 'react'

export default function QuestionForm({ onAdd }) {
  const [form, setForm] = useState({
    question: '',
    category: 'General Knowledge',
    answer: '',
    difficulty: 'easy'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(form)
    setForm({ question: '', category: 'General Knowledge', answer: '', difficulty: 'easy' })
    alert('Question Added!')
  }

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <input
        value={form.question}
        onChange={e => setForm({...form, question: e.target.value})}
        placeholder="Enter your question"
        required
      />
      <input
        value={form.answer}
        onChange={e => setForm({...form, answer: e.target.value})}
        placeholder="Correct Answer"
        required
      />
      <select
        value={form.category}
        onChange={e => setForm({...form, category: e.target.value})}
      >
        <option value="General Knowledge">General Knowledge</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="Geography">Geography</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Sports">Sports</option>
      </select>
      <select
        value={form.difficulty}
        onChange={e => setForm({...form, difficulty: e.target.value})}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Add Question</button>
    </form>
  )
}