import React, { useEffect, useState } from 'react';

const App = () => {
  const [RemoteComponent, setRemoteComponent] = useState(null);

  useEffect(() => {
    const loadRemoteComponent = async () => {
      try {
        const response = await fetch('http://localhost:3000/remoteEntry.js'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch remote entry file.');
        }
        const remoteScript = await response.text();
        // Evaluate the remote script using eval()
        eval(remoteScript);
        const remoteContainer = window.remoteApp;
        if (!remoteContainer) {
          throw new Error('Remote container is not available.');
        }
        const remoteModule = await remoteContainer.get('./remoteApp');
        setRemoteComponent(() => remoteModule.default);
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
