import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="main-navigation">
    <NavLink
      to="/create-meeting"
      activeClassName="main-navigation__active"
    >
      Create Meeting
    </NavLink>
    <NavLink
      to="/dashboard"
      activeClassName="main-navigation__active"
    >
      Dashboard
    </NavLink>
  </nav>
)

export default Navigation;