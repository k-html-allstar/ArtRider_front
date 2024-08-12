import { Route, Routes } from "react-router-dom";
import { BASIC_ROUTES } from './routes/basicRouter';

const App = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-[390px] h-[780px]">
        <Routes>
          {BASIC_ROUTES.map((route) => {
            return <Route key={route.name} path={route.path()} element={<route.component />} />;
          })}
        </Routes>
      </div>
    </div>
  )
}

export default App