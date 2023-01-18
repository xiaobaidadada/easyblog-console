import logo from './logo.svg';
import './App.css';
import Login from './components/begin/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/main/main'
import { browserHistory } from 'react-router'
// const path = `/repos/${userName}/${repo}`
//     browserHistory.push(path)
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Login />}>
          {/* <Route index element={<Home />} />
          <Route path="/menu" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path='/main' element={<Main />}>

        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

