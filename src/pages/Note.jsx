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
    const firstLine = content.replace(/<[^>]+>/g, "").trim().split('\n')[0];
    // const lines = content.split("\n");
    // const plainText = content[0].replace(/<p[^>]*>/g, "").trim();
    // const lines = plainText.split('\n')
    // const firstLine = lines[0].trim();
    // const lines = [];
    // const content = document.getElementById('content').value;
    //     content.split('\n').forEach((line) => {
    //         lines.push(line)
    //   })
    // const lines = content.split("\n");
    // const noteName = lines.length > 0 ? lines[0] : "Untitled";
    // const noteName = lines[0].replace(/<[^>]*>/g, "");
    // const noteName = lines[0].replace(/<[^>]*>/g, "").replace(/\n/g, "").trim()
    const noteName = firstLine;
    // const noteName =
    //   firstLine.indexOf("\n") !== -1 ? firstLine.split("\n")[0] : firstLine;

    const newNote = { name: noteName, content: content };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    // const range = document.createRange();
    // range.setStart(content.firstChild, 0);
    // range.setEnd(content, content.indexOf('\n'))
    // content.focus()
    // content.selectionStart = range.startOffset
    // content.selectionEnd = range.endOffset

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
