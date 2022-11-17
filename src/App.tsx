import React, { useState } from 'react';
import { ReactQuery } from './server-state-sync/ReactQuery';

function App() {
  const [demo, setDemo] = useState<string>('');

  return (
    <>
      <nav>
        <button onClick={() => setDemo('reactQuery')}>React Query</button>
      </nav>
      {demo === 'reactQuery' && <ReactQuery />}
    </>
  );
}

export default App;
