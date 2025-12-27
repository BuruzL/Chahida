import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import AuthLogin from "./pages/AuthLogin";
import AuthSignup from "./pages/AuthSignup";
import Profile from "./pages/Profile";
import BloodBank from "./pages/blood-bank";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Category from "./pages/Category";
import LostFound from "./pages/LostFound";
import BuySell from "./pages/BuySell";
import Buddy from "./pages/Buddy";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import SupportChatbot from "./components/Chatbot/SupportChatbot";

export default function App() {
  return (
    <>
      {/* Floating AI Support Widget */}
      <SupportChatbot />

      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthLogin />} />
              <Route path="/signup" element={<AuthSignup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blood-bank" element={<BloodBank />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/category/:tag" element={<Category />} />
              <Route path="/lost-found" element={<LostFound />} />
              <Route path="/buy-sell" element={<BuySell />} />
              <Route path="/buddy" element={<Buddy />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
