import '../assets/css/App.css';
import React, { useState, useEffect } from 'react';
import Instructions from './Instructions';
import { remote } from 'electron';
import calculate from './csde/src/index';
import './style.css'

function App() {
  const [surveyFile, setSurveyFile] = useState("");
  const [publicFile, setPublicFile] = useState("");
  const [privateFile, setPrivateFile] = useState("");
  const [resFile, setResFile] = useState("");
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);

  function openFile(setter) {
    remote.dialog.showOpenDialog(remote.BrowserWindow, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      setter(result.filePaths);
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.clear();
    remote.Menu.setApplicationMenu(null)
  }, [])

  function toggleTools() {
    console.clear();
    remote.getCurrentWindow().toggleDevTools();
  }

  return (
    <div className="container">
      <h1 className="title is-1">Id Matching</h1>
      <Instructions />
      <div className="button is-warning" onClick={toggleTools}>Show program output</div>
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
        <input className="input" placeholder="file name (without .csv)" value={resFile} onChange={(e) => setResFile(e.target.value)} /> <br />
        <button
          onClick={() => calculate(surveyFile[0],
            publicFile[0],
            privateFile[0],
            `${remote.app.getPath('desktop')}/${resFile}.csv`)}
          className="button is-primary">
          Generate new csv</button>
        <p id="status"></p>
        <p id="status2"></p>
      </div>
    </div>
  )
}

export default App;
