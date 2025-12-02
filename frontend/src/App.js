import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/feed";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import MyAdds from "./pages/MyAdds";
import Pokemon from "./pages/Pokemon";
import Logout from "./pages/Logout";
import CarCollection from "./pages/AllCarListing";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Layout>
                <Feed />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-car"
          element={
            <Layout>
              <AddCar />
            </Layout>
          }
        />
        <Route
          path="/get/user/car"
          element={
            <Layout>
              <MyAdds />
            </Layout>
          }
        />
        <Route
          path="/cars"
          element={
            <Layout>
              <CarCollection />
            </Layout>
          }
        />
        <Route
          path="/pokemon"
          element={
            <Layout>
              <Pokemon/>
            </Layout>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
