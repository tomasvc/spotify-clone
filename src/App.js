import './App.css';
import Login from './Login'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import PlaylistPage from './PlaylistPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: 'bfcaf900cafd40f7b674c44052d6ea97'
})

const code = new URLSearchParams(window.location.search).get('code')
sessionStorage.setItem('code', code)

function App() {

  return code ? 
  <Router>
    <div className="app h-screen flex flex-1 flex-nowrap w-screen">
      <Sidebar />
      <Switch>
        <Route path='/'>
          <Dashboard code={code} spotifyApi={spotifyApi} /> 
        </Route>
        <Route path='/playlist/:playlistID'>
          <PlaylistPage code={code} spotifyApi={spotifyApi} />
        </Route>
      </Switch>
    </div>
  </Router>
  : 
  <Login />

}

export default App