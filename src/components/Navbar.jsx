import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">🧠 ThinkFast</Link>
      </div>
      <div className="nav-links">
        <Link to="/highscore" className="nav-link">🏆 High Score</Link>
      </div>
    </nav>
  )
}
