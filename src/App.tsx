import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateMeeting from './pages/CreateMeeting';
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/create-meeting" component={CreateMeeting} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;