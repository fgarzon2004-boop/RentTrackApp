import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function Index() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <Loading message="Starting RentTrack..." />;
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
