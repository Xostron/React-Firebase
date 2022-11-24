import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MyRoutes } from './routes/Routes'


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {MyRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
