import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import { Route, Routes } from "react-router-dom";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
  );
}
