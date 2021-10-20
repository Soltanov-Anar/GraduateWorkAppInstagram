import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import Firebase from "firebase/compat/app";

const useAuthListener: () => { user: Firebase.User } = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser") || "{}")
  );

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser: Firebase.User) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();

  }, [firebase]);

  return { user };
};

export default useAuthListener;