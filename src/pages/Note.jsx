import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Note = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const firstLine = doc.querySelector("body > *");

    let noteName = "";
    if (firstLine) {
      noteName = firstLine.textContent.trim();
    }

    const newNote = { name: noteName, content: content };

    const existingNoteIndex = notes.findIndex((note) => note.name === noteName);

    if (existingNoteIndex !== -1) {
      // If the note already exists, update it
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = newNote;
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      alert("Note saved successfully!");
    } else {
      // If note doesn't exist, add it to the notes array
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      alert("Note saved successfully!");
    }
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    alert("Note deleted successfully!");
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setContent(note.content);
    setEditingIndex(index);
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
              <li className="my-4" key={index}>
                {note.name}
                <div className="flex justify-between gap-5 w-full">
                  <button
                    className="text-sm text-white px-2 bg-theme py-1 rounded-md"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-white px-2 bg-red-600 py-1 rounded-md"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-4/6">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            editing={{
              value: editingIndex !== -1,
            }}
          />
          <button onClick={() => handleSave()}>Save My Note</button>
        </div>
      </div>
    </>
  );
};

export default Note;
