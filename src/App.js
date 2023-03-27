//应用全局
// import logo from './logo.svg';
import './App.css';
// import Login from './components/begin/Login';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from './components/main/main'
// import { browserHistory } from 'react-router'
import Loyout from './keycomponents/Layout'
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Login from './components/begin/Login';
import Main from './components/main/main'
import Essay from './components/essay/Essay'
import Ace from './components/Editor/AceEditor'
import Css from './components/plug/css'
import Js from './components/plug/Js'
import Comment from './components/comment/comment'
import File from './components/file/file'

function App() {
  return (

    <BrowserRouter>
      {/* <Loyout /> */}
      <Routes >
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/" element={<Loyout />}>
          <Route path='main' element={<Main />}>
          </Route>
          <Route path='essay' element={<Essay  />}>

          </Route>
          <Route path='eaitor' element={<Ace   />} />
          <Route path='plug/css' element={<Css />} />
          <Route path='plug/js' element={<Js  />} />
          <Route path='comment' element={<Comment  />} />
          <Route path='file' element={<File />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;

