import { FC, useState, useEffect, useContext, FormEvent } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constants/contants";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";

const SignUpPage: FC = () => {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUserName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const isInvalid = (password === "" || email === "");

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    console.log("usernameExists", usernameExists);

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
            email: email.toLowerCase(),
            following: [],
            dateCreated: Date.now()
          })

        history.push(AppRoutes.DASHBOARD);

      } catch (error: any) {
        setFullName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUserName("");
      setError("That username is already taken, please try another.");
    }

  }

  useEffect(() => {
    document.title = "Sign Up - Instagram"
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
            onSubmit={handleSignUp}
            method="POST"
          >

            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target: { value } }) => setUserName(value)}
              value={username}
            />


            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
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
                `bg-blue-medium text-white w-full rounded h8 font-bold ${isInvalid && "opacity-50"}`
              }
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{' '}
            <Link
              to={AppRoutes.LOGIN}
              className="font-bold text-blue-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

SignUpPage.displayName = "SignUpPage";

export default SignUpPage;