//应用全局
// import logo from './logo.svg';
import './App.css';
// import Login from './components/begin/Login';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from './components/main/main'
// import { browserHistory } from 'react-router'
import Loyout from './keycomponents/Layout'
import { BrowserRouter, Routes, Route ,HashRouter} from "react-router-dom";
// const path = `/repos/${userName}/${repo}`
//     browserHistory.push(path)
function App() {
  return (
    // <BrowserRouter>
    //   <Routes >
    //     <Route path="/" element={<Login />}>
    //     </Route>
    //     <Route path='/main' element={<Main />}>

    //     </Route>
    //   </Routes>
    // </BrowserRouter>
<BrowserRouter>
<Loyout />
    </BrowserRouter>


  );
}

export default App;

