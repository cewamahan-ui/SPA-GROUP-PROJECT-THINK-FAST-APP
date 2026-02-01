import { useState } from 'react'
import QuestionForm from './QuestionForm'

export default function QuestionList({ questions, onDelete, onUpdate, onAdd }) {
  const [editingId, setEditingId] = useState(null)
  const [edit, setEdit] = useState({})

  const startEdit = (q) => {
    setEditingId(q.id)
    setEdit(q)
  }

  const saveEdit = () => {
    onUpdate(editingId, edit)
    setEditingId(null)
  }

  return (
    <div>
      <h2>Add New Question</h2>
      <QuestionForm onAdd={onAdd} />
      <h2>Existing Questions ({questions.length})</h2>
      {questions.map(q => (
        <div key={q.id} className="question-item">
          {editingId === q.id ? (
            <div className="edit-form">
              <input value={edit.question || ''} onChange={e => setEdit({...edit, question: e.target.value})} placeholder="Question" />
              <input value={edit.answer || ''} onChange={e => setEdit({...edit, answer: e.target.value})} placeholder="Answer" />
              <select value={edit.category || 'General Knowledge'} onChange={e => setEdit({...edit, category: e.target.value})}>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
              </select>
              <select value={edit.difficulty || 'easy'} onChange={e => setEdit({...edit, difficulty: e.target.value})}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <div className="edit-buttons">
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>{q.question}</strong></p>
              <p>Answer: {q.answer} | Category: {q.category} | Difficulty: {q.difficulty}</p>
              <button onClick={() => startEdit(q)}>Edit</button>
              <button onClick={() => onDelete(q.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}