import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  //link
  const [link, setLink] = useState("http://localhost:3000");
  // "https://assignment-11-server-orpin-beta.vercel.app"
  // "http://localhost:3000"

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser?.email) {
          const user = { email: currentUser.email };

          axios
            .post(`${link}/jwt-auth`, user, {
              withCredentials: true,
            })
            .then((response) => {
              toast.success("user authenticated successfully!");
              // console.log(response);
            })
            .catch((error) => {
              toast.success("user authenticated failed!");

              // console.log(error);
            });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    //component unmount , clean up
    return () => {
      unSubscribe();
    };
  }, []);

  const logoutUser = () => {
    setLoading(true);
    axios
      .post(`${link}/logout`, {}, { withCredentials: true })
      .then((response) => {
        toast.success("Logged out successfully!");
        // console.log(response);
      })
      .catch((error) => {
        toast.error("An error occurred during logout.");
        // console.log(error);
      });
    return signOut(auth);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const authInfo = {
    user,
    loading,
    link,
    filteredMovies,
    setFilteredMovies,
    createUser,
    loginUser,
    logoutUser,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
