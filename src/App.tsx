import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
// import { Provider } from 'react-redux';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <Home />
    {/* </Provider> */}
  </StrictMode>
);
