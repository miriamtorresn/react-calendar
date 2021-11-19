import { NavLink } from 'react-router-dom';

import './styles.scss';

const Navigation = () => (
  <nav className="main-navigation">
    <ul>
      <li>
        <NavLink
          to="/dashboard"
          activeClassName="main-navigation__active"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/create-meeting"
          activeClassName="main-navigation__active"
        >
          Create Meeting
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Navigation;