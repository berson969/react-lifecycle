import React, {useEffect, useState} from 'react';
import NoteType from "./NoteType.ts";
import NoteCard from "./NoteCard.tsx";
import AddNote from "./AddNote.tsx";

const baseUrl = import.meta.env.VITE_BASE_URL;


const Crud : React.FC = () => {
	const [notes, setNotes] = useState<NoteType[]>([]);

	useEffect( () => {
		document.title = "CRUD";
		listNotes();
	}, []);


	const listNotes = async () => {
		try {
			const response = await fetch(baseUrl);
			const data = await response.json();
			setNotes(data);
		} catch (error) {
			console.error('Error fetching notes:', error);
		}
	}

	const addNote = async (text: string) => {
		try {
			const response = await fetch(baseUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: Math.floor(Math.random() * 1000000),
					content: text
				})
			});
			const newNote = await response.json();
			setNotes([...notes, newNote]);
		} catch (error) {
			console.error('Error fetching notes:', error);
		}
	};

	const removeNote = async (id: number) => {
		try {
			await fetch(`${baseUrl}/${id}`, {
				method: 'DELETE'
			});
			setNotes(notes.filter(note => note.id !== id));
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

    return (
        <div className="flex flex-col justify-center gap-12 p-14">
			<h1 className="uppercase font-bold text-center text-3xl p-2">Notes</h1>
			<div className="flex flex-wrap gap-4 justify-center ">
			{notes.map(note => (
				<NoteCard key={note.id} note={note} onDelete={removeNote}/>
				)
			)}
			</div>
			<div>
				<AddNote onAdd={addNote} />
			</div>
        </div>
    );
};

export default Crud;
