import { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { PartnerDrawer } from "./components/layout/PartnerDrawer";
import { SignupModal } from "./components/ui/SignupModal";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import { WhatWeDo } from "./pages/WhatWeDo";
import type { UIState } from "./types";

type Action =
  | { type: "OPEN_PARTNER" }
  | { type: "CLOSE_PARTNER" }
  | { type: "OPEN_SIGNUP"; program?: string | null }
  | { type: "CLOSE_SIGNUP" };

const initialState: UIState = {
  isPartnerDrawerOpen: false,
  signupModal: {
    isOpen: false,
    preSelectedProgram: null,
  },
};

function reducer(state: UIState, action: Action): UIState {
  switch (action.type) {
    case "OPEN_PARTNER":
      return { ...state, isPartnerDrawerOpen: true };
    case "CLOSE_PARTNER":
      return { ...state, isPartnerDrawerOpen: false };
    case "OPEN_SIGNUP":
      return { ...state, signupModal: { isOpen: true, preSelectedProgram: action.program ?? null } };
    case "CLOSE_SIGNUP":
      return { ...state, signupModal: { ...state.signupModal, isOpen: false } };
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function AppShell() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openSignup = (program?: string) => dispatch({ type: "OPEN_SIGNUP", program });

  return (
    <>
      <ScrollToTop />
      <Navbar onPartnerClick={() => dispatch({ type: "OPEN_PARTNER" })} />
      <Routes>
        <Route path="/" element={<Home onEnroll={openSignup} onPartnerClick={() => dispatch({ type: "OPEN_PARTNER" })} />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/programs" element={<Programs onEnroll={openSignup} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
      <PartnerDrawer isOpen={state.isPartnerDrawerOpen} onClose={() => dispatch({ type: "CLOSE_PARTNER" })} />
      <SignupModal isOpen={state.signupModal.isOpen} preSelectedProgram={state.signupModal.preSelectedProgram} onClose={() => dispatch({ type: "CLOSE_SIGNUP" })} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
