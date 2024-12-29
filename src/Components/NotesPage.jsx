import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import NoteCard from "./NoteCard";
import axios from "axios";

const NotesPage = () => {
  const { noteId } = useParams(); // Get noteId from URL
  const navigate = useNavigate(); // For updating the URL
  const [notes, setNotes] = useState("");
  const [heading, setHeading] = useState("");
  const username = "loki";
  const [allnotes, setAllNotes] = useState([]);
  const [showNotesList, setShowNotesList] = useState(false);


  const handleSaveNote = async () => {
    try {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      const res = await axios.post(
        "https://anynotes-backend.vercel.app/notes/createNote",
        {
          username: username,
          noteId: result,
          title: heading,
          content: notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        getAllNotes();
      }
    } catch (err) {
      console.error(err);
    }
    setNotes("");
    setHeading("");
  };

  const getAllNotes = async () => {
    try {
      const data = await axios.get("https://anynotes-backend.vercel.app/notes/getNotes", {
        headers: { "Content-Type": "application/json" },
      });
      setAllNotes(data.data.notes);
    } catch (e) {
      console.error("Error fetching notes:", e);
    }
  };

  const handleNoteClick = (id) => () => {
    const note = allnotes.find((note) => note.noteId === id);
    if (note) {
      setNotes(note.content);
      setHeading(note.title);
      navigate(`/notes/${id}`); 
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    if (noteId) {
      const note = allnotes.find((note) => note.noteId === noteId);
      if (note) {
        setNotes(note.content);
        setHeading(note.title);
      }
    }
  }, [noteId, allnotes]); 


  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <Nav />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-[#212121] pl-3 mt-2">
        <div
          className={`${
            showNotesList ? "block" : "hidden md:block"
          } md:w-1/5  p-4 border-r border-gray-700 bg-[#212121]`}
        >
          <button
            className=" bg-blue-600 text-white py-2 rounded-md mb-4 hover:bg-blue-700 w-[100%] "
            onClick={() => {
              setNotes("");
              setHeading("");
              navigate("/notes");
            }}
          >
            + Create Note
          </button>
          <div className="flex flex-col gap-2 bg-[#212121]  "  >
            {allnotes .map((note, index) => (
               <div key={index} onClick={handleNoteClick(note.noteId)} className="cursor-pointer">
               <NoteCard index={index + 1} heading={note.title} noteId = {note.noteId} />
             </div>

            ))}
          </div>
        </div>

        
        <button
          onClick={() => setShowNotesList(!showNotesList)}
          className="md:hidden bg-blue-600 rounded-lg text-white p-2 text-sm w-[20%] "
        >
          {showNotesList ? "Hide Notes" : "Show Notes"}
        </button>

        {/* Editor Section */}
        <div className="flex-grow p-4 h-full bg-[#212121]">
          <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
            <p className="text-base md:text-2xl font-semibold text-white">Title:</p>
            <input
              className="p-2 flex-grow focus:outline-none rounded text-xl font-bold bg-[#212121] text-white"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>


            <div className="w-full bg-gray-300 h-0.5"></div>
          <textarea
            className="w-full  h-[100%] p-3 focus:outline-none resize-none rounded overflow-y-auto bg-[#212121] text-white text-xl "
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
          ></textarea>

<div className="w-full flex justify-end">
            <button
              className="p-2 rounded-md bg-green-500 text-white font-semibold text-sm md:text-lg w-[80px]"
              onClick={handleSaveNote}
            >
              Save
            </button>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;