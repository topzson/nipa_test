import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/index";
import Ticket from "./components/Ticket";
import TicketCreate from "./components/TicketCreate";
export default function App() {

 return (

   <Router>

     <div>

       <Navbar />

       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/ticket" element={<Ticket />} />

       <Route path="/create" element={<TicketCreate />} />


       </Routes>

     </div>

   </Router>

 );

}