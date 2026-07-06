import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hook/useAuth";
import "./App.css";
import { useEffect } from "react";

function App() {
  const { handleGetMe } = useAuth();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    handleGetMe();
  }, []);
  
  console.log(user);

  return <RouterProvider router={routes} />;
}

export default App;
