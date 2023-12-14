import React from 'react';

export default function ReactPyComp() {
  function handleSendMail() {
    fetch('http://127.0.0.1:5000/send-mail', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Summary from React' }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  return (
    <div>
      <p>Rendered by React</p>
      <button onClick={handleSendMail}>Send Email to Python</button>
    </div>
  );
}
