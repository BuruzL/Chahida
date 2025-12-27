import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDB } from "../lib/db";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() =>
    JSON.parse(localStorage.getItem("campus_session") || "null")
  );

  useEffect(() => {
    localStorage.setItem("campus_session", JSON.stringify(session));
  }, [session]);

  const value = useMemo(() => {
    const db = getDB();
    const user = session?.email ? db.users.find((u) => u.email === session.email) : null;

    return {
      user,
      isAuthed: !!user,
      login: (email) => setSession({ email }),
      logout: () => setSession(null),
    };
  }, [session]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}