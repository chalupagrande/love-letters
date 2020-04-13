import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import Header from '../Header'
import Home from '../../pages/Home'
import Letter from '../../pages/Letter'
import Donate from '../../pages/Donate'
import About from '../../pages/About'
import {Store} from '../../store'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  let [posts, setPosts] = useState([])

  useEffect(() => {
    async function init() {
      let r = await axios({
        method: 'get',
        url: 'http://localhost:1337/posts',
      })
      setPosts(r.data)
    }
    init()
  }, [setPosts])


  return (
    <Router>
      <div className="App">
        <Header/>
        <Store.Provider value={posts}>
          <Switch>
            <Route path="/letter/:id">
              <Letter />
            </Route>
            <Route path="/donate">
              <Donate />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Store.Provider>
      </div>
    </Router>
  );
}

export default App;