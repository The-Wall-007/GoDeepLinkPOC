import React, { useState } from "react";
import AppLinkHandler from "./AppLinkHandler"; // Import the AppLinkHandler component

const App = () => {
  // State to store form input values
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  // State to track if the form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Trigger AppLinkHandler to open the app
  };

  return (
    <div>
      <h1>App Link Redirect Form</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        // Pass the name and mobile as props to AppLinkHandler after submission
        <AppLinkHandler param1={name} param2={mobile} />
      )}

      <p>
        If the app is installed, it should open automatically after you submit.
        Otherwise, you'll be redirected to the app store.
      </p>
    </div>
  );
};

export default App;
