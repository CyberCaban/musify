import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UploadForm() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		console.log(files);
	}, [files]);

	function sendFile(e: any) {
		const trackTitle: string = e.target[0].files[0].name;
		console.log(trackTitle.split(".")[0], e.target[1].value);
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", e.target[0].files[0]);
		// formData.set("originalname", e.target[1].value);
		formData.append("newName", e.target[1].value);

		axios.post("/api/uploadFile", formData, {}).then((res) => {
			setFiles(res.data);
			console.log(formData);
		});
	}

	function dropDB() {
		axios.post("/api/clearDB");
		console.log("database cleared");
	}

	return (
		<div>
			<form onSubmit={(e) => sendFile(e)} encType="multipart/form-data">
				<input type="file" name="file" id="fileInput" />
				<input type="text" name="title" id="trackTitle" />
				<button type="submit">Submit</button>
			</form>
			<button onClick={() => dropDB()} type="button">
				Clear database
			</button>
		</div>
	);
}
