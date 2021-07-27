import './App.css';
import Login from './Login'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return code ? 
  <div className="app h-screen flex flex-1 flex-nowrap w-screen">
    <Sidebar />
    <Dashboard code={code} /> 
  </div>
  : 
  <Login />

}

export default App;
