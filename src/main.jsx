import ReactDOM from 'react-dom/client'
import './index.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AuthProvider } from './AuthMidContext.jsx'
import { routes } from './routes/web.jsx'
import { applyMiddleware, createStore } from 'redux'
import storeStates from './redux/store/index.js'
import { thunk } from 'redux-thunk'

const store = createStore(storeStates, applyMiddleware(thunk))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <Routes>
          {routes.map((item, index) => (
            <Route key={index} path={item.path} element={item.content}/>
          ))}
        </Routes>
      </AuthProvider>
    </Router>
  </Provider>
)
