import React, { useEffect } from 'react';

function TestGetRequest() {
  useEffect(() => {
    fetch('http://localhost:5000/api/rsvp')
      .then(response => response.json())
      .then(data => console.log('GET request success:', data))
      .catch(error => console.error('GET request error:', error));
  }, []);

  return <div>Check console for GET request result</div>;
}

export default TestGetRequest;
