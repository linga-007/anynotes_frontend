import logo from './logo.svg';
import './App.css';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import NotesPage from './Components/NotesPage';
import Note from './Components/Note';
import Signup from './Components/Signup';
import PrivateRoute from './Components/PrivateRoute';
import { Analytics } from "@vercel/analytics/react"
function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/notes",
      element: (
        <PrivateRoute>
          <NotesPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/notes/:id",
      element: (
        <PrivateRoute>
          <Note />
        </PrivateRoute>
      ),
    }
  ]);
  return (
    <>
    <Analytics />
      <RouterProvider router={route} />
    </>
  );
}

export default App;
