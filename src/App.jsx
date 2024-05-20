import React, { Suspense, lazy } from 'react';

const RemoteComponent = lazy(() => import('remoteApp/MyComponent'));

function App() {
  return (
    <div>
      <h1>Vite Host App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponent />
      </Suspense>
    </div>
  );
}

export default App;
