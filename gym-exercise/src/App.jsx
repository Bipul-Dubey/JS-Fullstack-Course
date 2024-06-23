import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import ExerciseDetails from "./pages/ExerciseDetails";
import Footer from "./components/Footer";

const App = ({}) => {
  return (
    <Box
      width="400px"
      component="section"
      sx={{ width: { xl: "1488px" } }}
      m={"auto"}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
