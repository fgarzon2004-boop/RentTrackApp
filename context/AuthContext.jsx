import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { getUserProfile } from "../services/authService";

const AuthContext = createContext({
  user: null,
  profile: null,
  initializing: true,
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const applyFirebaseUser = async (firebaseUser) => {
    if (firebaseUser) {
      const userProfile = await getUserProfile(firebaseUser.uid);
      setUser({ uid: firebaseUser.uid });
      setProfile(userProfile);
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  const refreshUser = async () => {
    await applyFirebaseUser(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await applyFirebaseUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, initializing, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
