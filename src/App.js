import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";
function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={loginButton} /> 
        <Route path="/callback" exact component={mainPage} /> 
      </div>
    </Router>
  );
}

export default App;
