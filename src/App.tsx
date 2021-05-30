import React from 'react';
import logo from './logo.svg';
import Menu from "./Menu/Menu"
import './App.css';
import {AuthProvider} from "./firebase/Auth"
import InboxArea from "./Pages/Inbox"

function App() {
  return (
    <AuthProvider>

      <div className="App">
          <Menu/>
      </div>
    </AuthProvider>

  );
}

export default App;
