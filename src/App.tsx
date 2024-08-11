import { Route, Routes } from "react-router-dom";
import { BASIC_ROUTES } from './routes/basicRouter';

const App = () => {
  return (
    <div className="w-full p-20">
      <Routes>
        {BASIC_ROUTES.map((route) => {
          return <Route key={route.name} path={route.path()} element={<route.component />} />;
        })}
      </Routes>
    </div>
  )
}

export default App