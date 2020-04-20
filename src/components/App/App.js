import React, {useEffect, useState} from 'react';
import './App.css';
import {Helmet} from 'react-helmet'
import axios from 'axios'
import Header from '../Header'
import Home from '../../pages/Home'
import Letter from '../../pages/Letter'
import Donate from '../../pages/Donate'
import About from '../../pages/About'
import Store from '../../store'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  let [data, setData] = useState({posts: [], pages: []})

  useEffect(() => {
    async function init() {
      let r = await axios({
        method: 'post',
        url: `/admin/api`,
        data: {
          query: `
            query {
              allPages {
                name
                content
                photo {
                  file {
                    publicUrl
                  }
                }
              }
              allPosts {
                id
                city
                lat
                lng
                photos {
                  id
                  tag
                  file {
                      publicUrl
                  }
                }
                audio {
                  id
                  file {
                      publicUrl
                  }
                }
              }
            }
          `
        }
      })
      const {allPosts, allPages} = r.data.data
      setData({posts: allPosts, pages: allPages})
    }
    try {
      init()
    } catch (err) {
      console.log('ERROR FETCHING URL', err)
    }
  }, [setData])

  console.log('POSTS', data)
  return (
    <Router>
      <Helmet>
        <title>Love Letters</title>
        <meta name="description" content="Love letters to our essential workers. All around the world people are practicing social-distancing in order to flatten the curve. These collective efforts can be easily overlooked. Our goal is to send a message to the essential workers, and show them how much we care." />
      </Helmet>
      <div className="App">
        <Header/>
        <Store.Provider value={data}>
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
