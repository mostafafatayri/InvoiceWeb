import "./i18n"; // Language config
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './Reducers/UserReducer/UserContext'; // ✅ Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Wrap App in the UserProvider here */}
      <App />
    </UserProvider>
  </React.StrictMode>
);



/*import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import "./i18n"; // Language config
import { UserProvider } from './Reducers/UserReducer/UserContext'; // 👈 Import the context

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> {
      <App />
    </UserProvider>
  </StrictMode>
);
*/