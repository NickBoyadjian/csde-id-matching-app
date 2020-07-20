import React from 'react'

function Instructions() {
  return (
    <div className="box">
      <h1 className="title">Instructions</h1>
      <ol className="list">
        <li>Choose a survey file to process *<i>Make sure it has a <b>NAME</b> and <b>CITY</b> field</i></li>
        <li>Choose your public and private school data sets to match with</li>
        <li>Specify the name of your new CSV file</li>
        <li>Click <b>Generate new csv</b> and the program will download the new csv to your Dektop</li>
        <li>Before running the program you can optionally open a side window by clicking on <b>Show program output</b>. This will let you see the school names as they are being processed</li>
      </ol>
    </div>
  )
}

export default Instructions;
