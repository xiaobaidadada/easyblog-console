//应用全局
// import logo from './logo.svg';
// import Login from './components/begin/Login';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from './components/main/main'
// import { browserHistory } from 'react-router'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@components/begin/Login";
import Loyout from "@keycomponents/Layout";
import "./App.css";
// const path = `/repos/${userName}/${repo}`
//     browserHistory.push(path)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="*" element={<Loyout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

