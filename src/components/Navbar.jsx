import { Link } from 'react-router-dom'
//nav bar functionality
export default function NavBar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">🧠 ThinkFast</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/questions" className="nav-link">📝 Add Questions</Link>
        <Link to="/highscore" className="nav-link">🏆 High Score</Link>
      </div>
    </nav>
  )
}
