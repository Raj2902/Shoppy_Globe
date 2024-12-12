import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { getPrdFromCart } from "./utils/Redux/reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  dispatch(getPrdFromCart());
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <ToastContainer />
        {/* <NotFound /> */}
      </div>
    </>
  );
}

export default App;
