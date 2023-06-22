import { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Note = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([])

  const handleChange = (value) => {
    setContent(value);
  };

  
  const handleSave = () => {
    const lines = content.split('\n');
    const noteName = lines.length > 0 ? lines[0] : 'Untitled';

    const newNote = {name: noteName, content: content};
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    alert('Note saved successfully!');
  };

  return (
    <>
      <Nav />
      <h1 className="p-5 text-2xl text-theme font-extrabold">My Notes</h1>
      <div className="flex justify-between m-5">
        <div className="w-2/6">note one</div>
        <div className="w-4/6">
          <ReactQuill theme="snow" value={content} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Note;
