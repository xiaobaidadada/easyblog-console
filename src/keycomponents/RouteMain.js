// import React from "react";
import Login from "../components/begin/Login";
import { Routes, Route } from "react-router-dom";
import Main from "../components/main/main";
import Essay from "../components/essay/Essay";
import Ace from "../components/Editor/AceEditor";
import Css from "../components/plug/css";
import Js from "../components/plug/Js";
import Comment from "../components/comment/comment";
import File from "../components/file/file";
import Setting from "../components/setting/Setting";

function RouteMain(props) {
  return (
    <Routes>
      <Route path="/" key="/" element={<Login />}></Route>
      <Route path="/main" key="/main" element={<Main />}></Route>
      <Route path="/essay" key="/essay" element={<Essay />}></Route>
      <Route path="/eaitor" key="/eaitor" element={<Ace />} />
      <Route path="/plug/css" key="/plug/css" element={<Css />} />
      <Route path="/plug/js" key="/plug/js" element={<Js />} />
      <Route path="/comment" key="/comment" element={<Comment />} />
      <Route path="/file" key="/file" element={<File />} />
      <Route path="/system/setting" key="/system/setting" element={<Setting />} />
    </Routes>
  );
}

//默认接受props属性

// class RouteMain extends React.Component {

//   constructor(props) {
//     super(props);
//     // this.state = {path: '/'};

//   }
//   componentDidUpdate(){
//     console.log(1)

//   }
//   componentDidMount() {
//     console.log(1)

//   }
//   render() {
//     return (
//       <BrowserRouter>
//       <Routes >
//         <Route path="/" element={<Login />}>
//         </Route>
//         <Route path='/main/' element={<Main />}>

//         </Route>
//       </Routes>
//     </BrowserRouter>
//     );
//   }
// }
export default RouteMain;
