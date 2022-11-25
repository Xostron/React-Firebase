import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { MyRoutes } from './routes/Routes'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {MyRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
