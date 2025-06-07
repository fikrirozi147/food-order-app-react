import React, { useState } from "react";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/UI/Footer";
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      {isAdmin ? <AdminPage /> : <UserPage />}
      <Footer toggleRole={() => setIsAdmin(!isAdmin)} isAdmin={isAdmin} />
    </>
  );
}


export default App;
