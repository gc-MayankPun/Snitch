import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { register } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    fullname,
    email,
    password,
    contact,
    isSeller = false,
  }) { 
    const data = await register({
      fullname,
      email,
      password,
      contact,
      isSeller,
    });
    console.log(data);
    dispatch(setUser(data.user));
  }

  return { handleRegister };
};
