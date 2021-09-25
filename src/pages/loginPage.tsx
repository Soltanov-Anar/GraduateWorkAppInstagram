import { FC, useState, useEffect, useContext, FormEvent } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constants/contants";
import FirebaseContext from "../context/firebase";

const LoginPage: FC = () => {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const isInvalid = (password === "" || email === "");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    console.log("hi", event);
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(AppRoutes.DASHBOARD);
    } catch (error: any) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram"
  }, []);


  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="IPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col item-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Logo instagram app"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error &&
            <p className="mb-4 text-xs text-red-primary">
              {error}
            </p>}

          <form
            onSubmit={handleLogin}
            method="POST"
          >
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setEmail(value)}
              value={email}
            />

            <input
              aria-label="Enter your email password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setPassword(value)}
              value={password}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={
                `bg-blue-medium text-white w-full rounded h8 font-bold ${isInvalid && "opacity-50"}`
              }
            >
              Log in
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don`t have an account?{' '}
            <Link
              to={AppRoutes.SIGN_UP}
              className="font-bold text-blue-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

LoginPage.displayName = "LoginPage";

export default LoginPage;