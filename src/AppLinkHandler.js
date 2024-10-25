import React, { useEffect } from "react";

const AppLinkHandler = ({ param1, param2 }) => {
  // URLs for your app links and app store links
  const androidAppLink = `goapp://Home?name=${param1}&mobile=${param2}`; // Custom scheme for Android app
  const iOSAppLink = `https://go-deep-link-poc.vercel.app/Home?name=${param1}&mobile=${param2}`; // Universal link for iOS
  const playStoreLink =
    "https://expo.dev/accounts/go_rentals/projects/goapp/builds/e07ca35a-aa09-492a-8bd1-a415092424aa"; // Android Play Store URL
  const appStoreLink = "https://www.apple.com/in/app-store/"; // iOS App Store URL

  // Function to attempt to open the app or redirect to the store
  const openAppOrRedirect = () => {
    let timeoutId;
    let hasAppOpened = false;

    // Check if app opens using a custom scheme (Android) or Universal Link (iOS)
    if (isIOS()) {
      window.location.href = iOSAppLink;
      timeoutId = setTimeout(() => {
        if (!hasAppOpened) {
          window.location.href = appStoreLink;
        }
      }, 1000);
    } else if (isAndroid()) {
      const start = Date.now();
      window.location.href = androidAppLink;
      timeoutId = setTimeout(() => {
        if (Date.now() - start < 1500) {
          hasAppOpened = true;
        }
        if (!hasAppOpened) {
          window.location.href = playStoreLink;
        }
      }, 1500);
    } else {
      console.log("Unsupported platform");
    }

    window.addEventListener("blur", () => {
      hasAppOpened = true;
      clearTimeout(timeoutId);
    });
  };

  useEffect(() => {
    openAppOrRedirect();
  }, [param1, param2]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Redirecting...</h1>
    </div>
  );
};

// Utility functions to detect the platform
const isAndroid = () => /Android/i.test(navigator.userAgent);
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default AppLinkHandler;

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "600px",
    lineHeight: "1.6",
    padding: "0 20px",
    margin: "0 auto",
  },
};
