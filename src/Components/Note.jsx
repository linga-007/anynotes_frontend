import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
const Note = () => {

  const { id } = useParams();
  const [note , setNote] = useState({});

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    try{
        const data = await axios.get(`https://anynotes-backend.vercel.app/notes/note/${id}`,
            {
                headers: { 'Content-Type': 'application/json'}
            }
        )
        if(data){
            console.log(data);
            setNote(data.data.note[0]);
            console.log(data.data.note[0]);
        }
        else{
            console.log('Note not found');
        }
    }
    catch(error){
        console.error('Error fetching note:', error);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#212121]">
      <Nav />
      <div className="w-full h-[90%] flex justify-center items-center ">
        <div className="w-[80%] border-white border-l-2 border-r-2 h-[100%]  flex flex-col gap-5 justify-start items-center">
          <p className="font-semibold w-[50%] text-4xl flex justify-center items-center mt-3 text-white">
            {note.title}
          </p>
          <pre className="w-full  h-[100%] p-1 overflow-auto border-t border-t-white text-white pl-5">{note.content}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Note;
