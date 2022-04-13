import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);
  const [key, setKey] = useState(0);

  return (
    <Container>
      <form>
        <div className="form-group">
          <label for="input">Value for input</label>
          <input value={input} onChange={handleChange} type="text" className="form-control" id="input" placeholder="Input"/>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Output</label>
          <input disabled value={output} type="text" className="form-control" id="output" placeholder="Output"/>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Key</label>
          <input value={key} onChange={handleChange2} type="text" className="form-control" id="key" placeholder="Key"/>
        </div>
        <Button variant="primary" onClick={yourMom}>
          Submit
        </Button>
      </form>
  </Container>
  );
  function handleChange(event){
    setInput(event.target.value)
  }
  function handleChange2(event){
    setKey(event.target.value)
  }
  function yourMom(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"file": input, "key": key})
    }
    fetch('http://localhost:5090/api/example', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setOutput(data)
         } );
    }
}
export default App;
