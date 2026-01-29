import { useState } from 'react'

export default function QuestionList({ questions, onDelete, onUpdate }) {
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
      <h2>Questions ({questions.length})</h2>
      {questions.map(q => (
        <div key={q.id} className="question-item">
          {editingId === q.id ? (
            <div>
              <input value={edit.question} onChange={e => setEdit({...edit, question: e.target.value})} />
              <input value={edit.correct_answer} onChange={e => setEdit({...edit, correct_answer: e.target.value})} />
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <p><strong>{q.question}</strong> → {q.correct_answer}</p>
              <button onClick={() => startEdit(q)}>Edit</button>
              <button onClick={() => onDelete(q.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}