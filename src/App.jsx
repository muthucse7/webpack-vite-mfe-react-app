import React, { useEffect, useState } from 'react';

const App = () => {
  const [RemoteComponent, setRemoteComponent] = useState(null);

  useEffect(() => {
    const loadRemoteComponent = async () => {
      try {
        // Create a script element
        const script = document.createElement('script');
        // Set the source URL of the remoteEntry.js file
        script.src = 'http://localhost:3000/remoteEntry.js'; // Adjust the URL as needed
        // Set the onload event handler to handle script loading
        script.onload = async () => {
          // After the script is loaded, access the remote container and load the remote module
          const remoteContainer = window.remoteApp;
          if (!remoteContainer) {
            console.error('Remote container is not available.');
            return;
          }
          const component = await remoteContainer.get('./remoteApp');
          setRemoteComponent(() => component.default);
        };
        // Append the script tag to the document's head to initiate loading
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading remote component:', error);
      }
    };

    loadRemoteComponent();
  }, []);

  return (
    <div>
      {RemoteComponent && <RemoteComponent />}
    </div>
  );
};

export default App;
