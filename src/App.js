import Navigationbar from "./components/Navigationbar";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import { Route, Routes } from "react-router-dom";
import Registerpage from "./pages/Registerpage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
        </Routes>
    );
}

export default App;
