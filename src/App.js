import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {

    return (
        <div>
            <h1>Swipo</h1>
            <Router>
                <div className="App">
                    <Route path="/" exact component={loginButton}/>
                    <Route path="/callback" exact component={mainPage}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
