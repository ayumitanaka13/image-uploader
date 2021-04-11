import React, { useState } from "react";
import firebase, { storage } from "./firebase/firebase";

function App() {
  // styling
  const styles = {
    margin: 40,
  };

  // UseState
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // event handler
  const onSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      console.log("Not selected");
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, complete);
  };

  const onChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  // function
  const complete = () => {
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((firebaseUrl) => {
        setImageUrl(firebaseUrl);
      });
  };

  return (
    <div className="App">
      <div style={styles}>
        <h1>React Image Uploader</h1>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onChange} />
          <button>Upload</button>
        </form>
        <img src={imageUrl} alt="uploaded" width="300" height="300" />
      </div>
    </div>
  );
}

export default App;
