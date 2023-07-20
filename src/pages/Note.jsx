import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineShareAlt,
} from "react-icons/ai";

const Note = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  const handleShareNote = (noteIndex) => {
    const note = notes[noteIndex];
    const shareLink = window.location.origin + "/notes/" + note.id;
    const shareModal = document.getElementById("share-modal");
    shareModal.style.display = "block";
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = shareLink;
  };

  const shareModal = document.getElementById("share-modal");
  const shareLinkInput = document.getElementById("share-link");

  const handleCloseShareModal = () => {
    shareModal.style.display = "none";
  };

  const handleShowShareModal = () => {
    shareModal.style.display = "block";
  };

  return (
    <>
      <Nav />
      <h1 className="p-5 text-2xl text-theme font-extrabold">My Notes</h1>
      <div className="md:flex gap-2 justify-between m-5">
        <div className="w-2/6 px-10">
          <input
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul>
            {filteredNotes.map((note, index) => (
              // {notes.map((note, index) => (
              <li className="my-4 flex justify-between" key={index}>
                <div className="w-[80%]">{note.name}</div>
                <div className="flex justify-between gap-1 w-[20%]">
                  <button
                    className="text-sm text-white px-2 bg-theme py-2 h-fit rounded-md"
                    onClick={() => handleEdit(index)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className=" text-lg text-white px-2 bg-red-600 py-2 h-fit rounded-md"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete />
                  </button>
                  {/* <button
                    className="text-sm text-white px-2 bg-blue-500 py-2 h-fit rounded-md"
                    onClick={() => handleShareNote(index)}
                  >
                    <AiOutlineShareAlt />
                  </button> */}
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
          <div className="mr-auto">
            <button className="mr-auto" onClick={() => handleSave()}>
              {" "}
              <AiOutlineSave className="inline text-lg" /> Save My Note
            </button>
          </div>
        </div>
        <div
          className="modal absolute top-[50%] left-[50%] w-fit h-fit z-50 hidden bg-theme text-white p-[50px]"
          id="share-modal"
        >
          <div className="modal-content">
            <h2>Share Note</h2>
            <input
              type="text"
              id="share-link"
              value=""
              placeholder="Your share link"
            />
            <button onClick={handleCloseShareModal}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
