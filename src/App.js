import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { WeatherPage } from "./routes/WeatherPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:cityname" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}
