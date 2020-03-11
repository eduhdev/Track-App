import { AsyncStorage } from "react-native";
import createDataContext from "./CreateDataContext";
import api from "../services/api";
import { navigate } from "../navigationRefs";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "sign":
      return { ...state, errorMessage: "", token: action.payload };
    case "signout":
      return { ...state, token: null };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("SignUp");
  }
};

const clearErrorMessage = dispatch => () =>
  dispatch({ type: "clear_error_message" });

const signup = dispatch => {
  return async ({ email, password }) => {
    try {
      const { data: response } = await api.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.token);
      dispatch({ type: "sign", payload: response.token });
      navigate("mainFlow");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up"
      });
    }
  };
};

const signin = dispatch => {
  return async ({ email, password }) => {
    try {
      const { data: response } = await api.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.token);
      dispatch({ type: "sign", payload: response.token });
      navigate("mainFlow");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in"
      });
    }
  };
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
