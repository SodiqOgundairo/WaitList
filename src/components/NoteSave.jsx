import React, { useState, useEffect } from "react";

const NoteSave = () => {
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([])

  const handleSave = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const firstLine = doc.querySelector('body > *')

    let noteName = ""
    if (firstLine) {
      noteName = firstLine.textContent.trim()
    }

    const newNote = { name: noteName, content: content };

    const existingNoteIndex = notes.findIndex(note => note.name === noteName)

    if (existingNoteIndex !== -1) {
      // If the note already exists, update it
      notes[existingNoteIndex] = newNote
      setNotes(notes)
      localStorage.setItem("notes", JSON.stringify(notes));
      alert("Note saved successfully!");
    } else {
      // If note doesn't exist, add it to the notes array
      notes.push(newNote)
      setNotes(notes)
      localStorage.setItem("notes", JSON.stringify(notes));
      alert("Note added successfully!");
    }
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  return (
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteSave;
