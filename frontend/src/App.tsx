
import React, {  useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./components/index";
import Ticket from "./components/Ticket";
import NavBar from './components/Navbar';
import SignIn from "./components/Signin";
import Create from "./components/TicketCreate";

function App() {
  const [token, setToken] = React.useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);
  console.log("Token", token)
  if (!token) {
    return <SignIn />
  }

  return (
    <BrowserRouter>
      <>
        <div>


          <NavBar />
          <Routes>

            <Route path="/" element={<Ticket />} />
            {/* <Route path="/ticket" element={<Ticket />} /> */}
            <Route path="/create" element={<Create />} />
          </Routes>

        </div>
      </>
    </BrowserRouter>
  );
}

export default App;