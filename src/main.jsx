import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import './styles/pacha-stealth-icons.css';
import './styles/custom.css';
import './styles/gallery.css';
import './index.css';
import './styles/event-detail.css';
import './styles/guides.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

import './styles/editorial.css';
import './styles/spacing.css'; // keep last: spacing system
