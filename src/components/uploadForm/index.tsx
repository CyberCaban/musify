import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function UploadForm() {
  const [message, setMessage] = useState("");
  const fileInput = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const resetMessage = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(resetMessage);
  }, [message]);

  function sendFile(e: any) {
    e.preventDefault();

    const form = fileInput.current;

    const [file] = form?.fileInput.files;
    const newName: string = form?.trackTitle.value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("newName", newName);

    axios.post("/api/uploadFile", formData).then((res) => {
      //   console.log(res);
      setMessage(res.data.message);
    });
  }

  function test() {
    console.log(fileInput);
    console.log(fileInput.current?.trackTitle.value);
  }

  return (
    <div>
      <form
        onSubmit={(e) => sendFile(e)}
        encType="multipart/form-data"
        ref={fileInput}
      >
        <input type="file" name="fileInput" id="fileInput" required />
        <input type="text" name="trackTitle" id="trackTitle" required />
        <button type="submit">Submit</button>
      </form>
      <h2>{message}</h2>
      {/* <button onClick={test} type="button">
        test
      </button> */}
    </div>
  );
}
