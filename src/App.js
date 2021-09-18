import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";

import mainPage from "./components/MainCard.jsx";
import loginButton from "./components/loginButton";

function App() {

    return (
        <div>
            <Router>
                <nav>
                    <h1>Swipo</h1>
                </nav>
                <div className="App">
                    <Route path="/" exact component={loginButton}/>
                    <Route path="/callback" exact component={mainPage}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
