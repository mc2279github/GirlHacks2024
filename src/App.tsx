import "./App.css";
import "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
