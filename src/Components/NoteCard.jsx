import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";

const NoteCard = ({ index, heading, noteId }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShareClick = (e) => {
    e.stopPropagation();
    const noteUrl = `${window.location.origin}/notes/${noteId}`;
    navigator.clipboard
      .writeText(noteUrl)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000);
      })
      .catch((err) => console.error("Failed to copy URL", err));
  };

  return (
    <div className="relative flex  w-full p-4 border border-gray-500 rounded-md justify-between items-center gap-4 bg-[#2c2c2c] text-white">
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <p className="font-bold">{index}. {heading}</p>
      </div>
      <button
        onClick={handleShareClick}
        className=" text-white text-2xl rounded-md hover:bg-gray-300 transition"
      >
        <FaRegCopy />
      </button>
      <button
        onClick={handleShareClick}
        className=" text-white rounded-md text-2xl hover:bg-gray-300 transition"
      >
        <MdDelete />
      </button>
      
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-[30%] flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-1 rounded-md">
            <p className="text-center text-black">URL copied to clipboard!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
