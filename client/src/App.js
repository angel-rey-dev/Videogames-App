import './App.css';
import HomePage from './components/HomePage'
import LandingPage from './components/LandingPage'

// react-rouder-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Videogames</h1>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
