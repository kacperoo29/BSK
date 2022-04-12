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
        <div class="form-group">
          <label for="input">Value for input</label>
          <input readOnly={input} type="text" class="form-control" id="input" placeholder="Input"/>
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">Output</label>
          <input disabled value={output} type="text" class="form-control" id="output" placeholder="Output"/>
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">Key</label>
          <input readOnly={key} type="text" class="form-control" id="key" placeholder="Key"/>
        </div>
        <Button variant="primary" onClick={yourMom}>
          Submit
        </Button>
      </form>
  </Container>
  );
  function yourMom(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({"file": "a2","key": 0})
    }
    console.log()
    fetch('http://localhost:5090/api/example', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
         } );
    }
}
export default App;
