import logo from './logo.svg';
import './App.css';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import NotesPage from './Components/NotesPage';
import Note from './Components/Note';
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
      path: "/notes",
      element: <NotesPage />,
    },
    {
      path: "/notes/:id",
      element: <Note />,
    }
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
