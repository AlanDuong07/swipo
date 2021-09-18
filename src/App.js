import './App.scss';
import {useState} from "react";
import MainCard from './components/MainCard.js';

function App() {
  // state variable for if logged in or not
  const isLoggedIn = useState(false);
  
  return (
    <div className="App">

        {
            isLoggedIn && <MainCard/>
        }

    </div>
  );
}

export default App;
