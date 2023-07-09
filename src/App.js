import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './components/Posts';
import PostPage from './components/PostPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}


export default App;
