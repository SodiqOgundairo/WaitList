import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Note = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const handleChange = (value) => {
    // const plainText = value.replace(/\n/g, "").trim();
    setContent(value);
  };

  const handleSave = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const firstLine = doc.querySelector('body > *')

    let noteName = ""
    if(firstLine) {
      noteName = firstLine.textContent.trim()
    }

    const newNote = { name: noteName, content: content };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    alert("Note saved successfully!");
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    alert("Note deleted successfully!");
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  return (
    <>
      <Nav />
      <h1 className="p-5 text-2xl text-theme font-extrabold">My Notes</h1>
      <div className="flex justify-between m-5">
        <div className="w-2/6 px-10">
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                {note.name}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-4/6">
          <ReactQuill theme="snow" value={content} onChange={handleChange} />
          <button onClick={() => handleSave()}>Save MY note</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Note;