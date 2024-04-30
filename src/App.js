import React, { useEffect, useState } from 'react';
import './App.css';

// App function to render the api data and fetch : 
function App() {
  const [user, setUser] = useState(null);

  // API fetch here : 
  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
      });
  }, []);

  // Function to format the DOB as "day-month-year"
  const formatDOB = (dob) => {
    const date = new Date(dob);
    const day = date.getDate(); // Get day
    const month = date.toLocaleString('default', { month: 'long' }); // Get month name
    const year = date.getFullYear(); // Get year
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="app">
      {user ? (
        <div className="user-card">
          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="user-photo" />
          <div className="user-details">
            <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
            <div className="contact-info">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Gender: {user.gender}</p>
              <p>{`DOB: ${formatDOB(user.dob.date)},     Age: ${user.dob.age}`}</p>

            </div>
            <p>
              Location: {`${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}- ${user.location.postcode}`}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

