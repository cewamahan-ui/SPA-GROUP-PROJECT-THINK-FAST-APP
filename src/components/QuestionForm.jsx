import { useState } from 'react'

export default function QuestionForm({ onAdd }) {
  const [form, setForm] = useState({
    question: '',
    category: 'General Knowledge',
    correct_answer: '',
    incorrect_answers: ['', '', '']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(form)
    setForm({ question: '', category: 'General Knowledge', correct_answer: '', incorrect_answers: ['', '', ''] })
    alert('Added!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.question}
        onChange={e => setForm({...form, question: e.target.value})}
        placeholder="Question"
        required
      />
      <input
        value={form.correct_answer}
        onChange={e => setForm({...form, correct_answer: e.target.value})}
        placeholder="Correct Answer"
        required
      />
      {form.incorrect_answers.map((ans, i) => (
        <input
          key={i}
          value={ans}
          onChange={e => {
            const newAns = [...form.incorrect_answers]
            newAns[i] = e.target.value
            setForm({...form, incorrect_answers: newAns})
          }}
          placeholder={`Wrong Answer ${i + 1}`}
        />
      ))}
      <button type="submit">Add Question</button>
    </form>
  )
}