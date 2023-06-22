import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import About from "./pages/About";
import Note from "./pages/Note";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/app" element={<Note />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
