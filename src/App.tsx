import React, { createElement } from 'react';
import logo from './logo.svg';
import Home from './Home';
import Dev from './Dev';
import './App.css';
import './Home.css';
import CreateUser from './CreateUser'
import Node from './Node'
import Test from './Test'
import { useState, useEffect, useRef } from 'react'
import { forEachChild } from 'typescript';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Game from "./Game";
import Can from "./Canvas"
function App() : JSX.Element {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
   // canvas.width = window.innerWidth * 2;
    
  }, [])
  
  const startDrawing = () => {

  }

  const finishDrawing = () => {


  }

  const draw = () =>{

  }


  const TempGameHolder = () => {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }

  return (
    <TempGameHolder/>
  );
}

export default App;
