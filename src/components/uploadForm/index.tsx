import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UploadForm() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		console.log(files);
	}, [files]);

	function sendFile(e: any) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", e.target[0].files[0]);
		axios.post("/api/uploadFile", formData, {}).then((res) => {
			setFiles(res.data);
			console.log(res);
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
				<button type="submit">Submit</button>
			</form>
			<button onClick={() => dropDB()} type="button">
				Clear database
			</button>
		</div>
	);
}
