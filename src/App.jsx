import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "./store/AppAuthSlice";
import Client from "./Components/Client";
import Login from "./Components/Login";
import RequireUser from "./Components/RequireUser";
import AdminProfile from "./Components/AdminProfile";
import NotRequireUser from "./Components/NotRequireUser";
import Home from "./Components/Home";
import CustomerQuery from "./Components/CustomerQuery";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(setAuthData(token));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Client />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
            <Route path="/query" element={<CustomerQuery />} />
          </Route>
        </Route>
        <Route element={<NotRequireUser />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
