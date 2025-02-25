import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import StudentProfile from "./components/StudentProfile.tsx";
import "./App.css";
function App() {
  const { } = useAuthenticator();

  return (
    <main>
      


      <BrowserRouter>
        <nav>
          <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          <Route path="/profile" element={<StudentProfile />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
