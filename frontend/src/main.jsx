import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/Store.jsx'
import { Provider } from 'react-redux'
import { Authpovider } from './context/Authcontext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Authpovider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Authpovider>
    </StrictMode>,
  </Provider>
)
