import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDB } from "../lib/db";
import { api } from "../lib/api";

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

    let user = null;
    if (session?.user) user = session.user;
    else if (session?.email) user = db.users.find((u) => u.email === session.email);

    return {
      user,
      isAuthed: !!user,
      // login can be called as login(email) for local/mock auth,
      // or login(email, password) to authenticate against the backend.
      login: async (email, password) => {
        if (password) {
          try {
            const data = await api.post("/api/auth/login", { email, password });
            api.setToken(data.token);
            setSession({ user: data.user, token: data.token });
            return data;
          } catch (err) {
            // fallback to local/mock DB when backend login fails
            try {
              const db = getDB();
              const localUser = db.users.find((u) => u.email === email);
              if (localUser) {
                setSession({ user: localUser });
                return { user: localUser };
              }
            } catch (e) {
              // ignore local fallback errors
            }
            throw err;
          }
        }
        // fallback to local/mock DB login
        setSession({ email });
      },
      logout: () => {
        api.setToken(null);
        setSession(null);
      },
    };
  }, [session]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}