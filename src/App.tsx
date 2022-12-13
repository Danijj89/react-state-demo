import React, { useState } from 'react';
import { ReactQuery } from './server-state-sync/ReactQuery';
import { CommonStrategy } from './state-update-strategy/CommonStrategy';

function App() {
  const [demo, setDemo] = useState<string>('');

  return (
    <>
      <nav>
        <button onClick={() => setDemo('reactQuery')}>React Query</button>
        <button onClick={() => setDemo('stateUpdateStrategy')}>State Update Strategy</button>
      </nav>
      {demo === 'reactQuery' && <ReactQuery />}
      {demo === 'stateUpdateStrategy' && <CommonStrategy />}
    </>
  );
}

export default App;
