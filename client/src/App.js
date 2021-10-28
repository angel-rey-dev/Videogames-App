import './App.scss';
import HomePage from './components/HomePage/HomePage'
import LandingPage from './components/LandingPage/LandingPage'

// react-rouder-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="sr-only">THE GAMEROOM</h1>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
