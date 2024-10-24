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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>App Link Redirect Form</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="mobile" style={styles.label}>
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>
        ) : (
          // Pass the name and mobile as props to AppLinkHandler after submission
          <AppLinkHandler param1={name} param2={mobile} />
        )}

        <p style={styles.infoText}>
          If the app is installed, it should open automatically after you
          submit. Otherwise, you'll be redirected to the app store.
        </p>
      </div>
    </div>
  );
};

// Styles object for the components
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    display: "block",
    fontSize: "16px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  infoText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#777",
  },
};

export default App;
