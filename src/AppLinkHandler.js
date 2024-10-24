import React, { useEffect } from "react";

const AppLinkHandler = () => {
  // URLs for your app links and app store links
  const androidAppLink = "goapp://Home?param1=1234&param2=4321"; // Custom scheme for Android app
  const iOSAppLink = "https://www.apple.com/in/app-store/"; // Universal link for iOS
  const playStoreLink =
    "https://expo.dev/accounts/go_rentals/projects/goapp/builds/e07ca35a-aa09-492a-8bd1-a415092424aa"; // Android Play Store URL
  const appStoreLink = "https://www.apple.com/in/app-store/"; // iOS App Store URL

  // Function to attempt to open the app or redirect to the store
  const openAppOrRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if user is on an iOS device
    if (isIOS()) {
      // Attempt to open the app using Universal Link (iOS)
      window.location.href = iOSAppLink;

      // If the app is not installed, redirect to the App Store after a delay
      setTimeout(() => {
        window.location.href = appStoreLink;
      }, 2000); // Adjust the delay if necessary
    } else if (isAndroid()) {
      // Attempt to open the app using a custom URL scheme (Android)
      window.location.href = androidAppLink;

      // If the app is not installed, redirect to the Play Store after a delay
      setTimeout(() => {
        window.location.href = playStoreLink;
      }, 2000); // Adjust the delay if necessary
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
