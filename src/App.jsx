import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Signup from './Signup/Signup';
import Login from './Login/Login';
import Home from './Home/Home';

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/home', element: <Home/> }
  ])

  return (
    <>
     <h1>Splitwise Clone</h1>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
