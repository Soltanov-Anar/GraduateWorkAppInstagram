import { FC, useState, useEffect, useContext, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";
import { AppRoutes } from "../constants/contants";

const SignUpPage: FC = () => {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const isInvalid = (password === "" || email === "");

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: email.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now()
          });

        return history.push(AppRoutes.DASHBOARD);

      } catch (error: unknown) {
        setFullName("");
        setEmail("");
        setPassword("");
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    } else {
      setUsername("");
      setFullName("");
      setEmail("");
      setPassword("");
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      <div className="hidden lg:flex w-full lg:w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="IPhone with Instagram app"
          className="object-scale-down"
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Logo instagram app"
              className="mt-2 mb-4 object-scale-down"
            />
          </h1>
          {error &&
            <p data-testid="error" className="mb-4 text-xs text-red-primary">
              {error}
            </p>}

          <form onSubmit={handleSignUp} method="POST" data-testid="sign-up">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setUsername(value)}
              value={username}
            />

            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setFullName(value)}
              value={fullName}
            />

            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setEmail(value)}
              value={email}
            />

            <input
              aria-label="Enter your password"
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
                `bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`
              }
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{" "}
            <Link
              to={AppRoutes.LOGIN}
              className="font-bold text-blue-medium"
              data-testid="login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

SignUpPage.displayName = "SignUpPage";

export default SignUpPage;