import '../assets/css/App.css'
import React, { useState } from 'react'
import { remote, ipcMain } from 'electron';
import main from './csde/src/index';
import "./index.scss"

const dialogOptions = {
  type: 'info',
  title: 'Information',
  message: "This is an information dialog. Isn't it nice?",
  buttons: ['Yes', 'No']
};

function App() {
  const [surveyFile, setSurveyFile] = useState("");
  const [publicFile, setPublicFile] = useState("");
  const [privateFile, setPrivateFile] = useState("");
  const [resFile, setResFile] = useState("");
  const [status, setStatus] = useState("");

  function openFile(setter) {
    remote.dialog.showOpenDialog(remote.BrowserWindow, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      setter(result.filePaths);
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1>Upload Survey</h1>
          <button
            onClick={() => openFile(setSurveyFile)}
            className="button is-primary">
            Open File
        </button>
          <p>{surveyFile}</p>
        </div>
        <div className="column">
          <h1>Public Schools</h1>
          <button
            onClick={() => openFile(setPublicFile)}
            className="button is-primary">
            Open File
        </button>
          <p>{publicFile}</p>
        </div>
        <div className="column">
          <h1>Private Schools</h1>
          <button
            onClick={() => openFile(setPrivateFile)}
            className="button is-primary">
            Open File
        </button>
          <p>{privateFile}</p>
        </div>
      </div>

      <div className="generate">
        <h1>Save new file as: </h1>
        <input placeholder="file name" value={resFile} onChange={(e) => setResFile(e.target.value)} /> <br />
        <button
          onClick={() => main(surveyFile[0],
            publicFile[0],
            privateFile[0],
            `${remote.app.getPath('desktop')}/${resFile}.csv`,
            setStatus)}
          className="button is-primary">
          Generate new csv</button>
        <p>{status}</p>
      </div>
    </div>
  )
}

export default App;
