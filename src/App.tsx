import React from 'react';
import { Route, Routes } from "react-router-dom";
import { BASIC_ROUTES } from './routes/basicRouter';


const App = () => {
  return (
    <div>
      <Routes>
        {BASIC_ROUTES.map((route) => {
          return <Route key={route.name} path={route.path()} element={<route.component />} />;
        })}
      </Routes>
    </div>
  )
}

export default App