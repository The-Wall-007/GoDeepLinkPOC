import React, { useEffect } from "react";

const AppLinkHandler = () => {
  // URLs for your app links and app store links
  const androidAppLink = "https://go-deep-link-poc.vercel.app/"; // Custom scheme for Android app
  const iOSAppLink = "https://www.apple.com/in/app-store/"; // Universal link for iOS
  const playStoreLink = "https://play.google.com/store/games?hl=en"; // Android Play Store URL
  const appStoreLink = "https://www.apple.com/in/app-store/"; // iOS App Store URL

  // Function to attempt to open the app or redirect to the store
  const openAppOrRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Create a hidden iframe to try to open the app
    const openAppInIframe = (appLink) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appLink;
      document.body.appendChild(iframe);

      // Remove the iframe after some time
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };

    // Detect iOS
    if (isIOS()) {
      // Attempt to open the app using the custom scheme
      openAppInIframe(iOSAppLink);

      // Redirect to App Store if app isn't installed
      setTimeout(() => {
        window.location.href = appStoreLink;
      }, 1500); // Adjust the delay if necessary
    } else if (isAndroid()) {
      // Attempt to open the app using the custom scheme
      openAppInIframe(androidAppLink);

      // Redirect to Play Store if app isn't installed
      setTimeout(() => {
        window.location.href = playStoreLink;
      }, 1500); // Adjust the delay if necessary
    } else {
      console.log("Unsupported platform");
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    openAppOrRedirect();
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>
        If the app is installed, it should open automatically. Otherwise, you'll
        be redirected to the app store.
      </p>
    </div>
  );
};

// Utility functions to detect the platform
const isAndroid = () => /Android/i.test(navigator.userAgent);
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default AppLinkHandler;
