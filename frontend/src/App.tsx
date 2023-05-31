import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home/Index";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePersist from "./hooks/usePersist";

function Private() {
  const [auth] = usePersist("user_info");
  return auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route index path="/Register" element={<Register />} />
          <Route element={<Private />}>
            <Route path="/Home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
