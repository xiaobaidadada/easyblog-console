
import React from 'react';
import Login from '../components/begin/Login';
import {  Routes, Route } from "react-router-dom";
import Main from '../components/main/main'
import Essay from '../components/essay/Essay'
import Ace from '../components/Editor/AceEditor'
import Css from '../components/plug/css'
import Js from '../components/plug/Js'
import Comment from '../components/comment/comment'
import File from '../components/file/file'


function RouteMain(props) {

  return (
    
      <Routes >
        {/* <Route path="/" element={<Login />}>
        </Route> */}
        <Route path='main' element={<Main />}>

        </Route>
        <Route path='essay' element={<Essay header_f={props.header_f}/>}>

        </Route>
        <Route path='/eaitor' element={<Ace mode={props.mode} />} />
        <Route path='/plug/css' element={<Css header_f={props.header_f} />} />
        <Route path='/plug/js' element={<Js header_f={props.header_f} />} />
        <Route path='/comment' element={<Comment header_f={props.header_f}/>} />
        <Route path='/file' element={<File />} />
      </Routes>


  );
}

export default RouteMain;

