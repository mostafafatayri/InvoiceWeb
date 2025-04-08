import React, { useEffect, useState } from 'react';
import newRequest from '../../Utils/newRequest'



export const Home = () => {
  const [message, setMessage] = useState('');

  console.log("before the request");
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("hello guys this is  an working file ")
        const response = await newRequest.get('/');
        setMessage(response.data);
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error connecting to the server:', error);
        setMessage('Failed to connect');
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>Server response: {message}</p>
    </div>
  );
};

export default Home;
