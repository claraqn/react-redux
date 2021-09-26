import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createSelectorHook, createStoreHook, Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();
//applyMiddleware(a, b)=>a와b라는 여러개의 미들웨어를 적용 할 수 있습니다.
// const store = createStore(rootReducer, applyMiddleware(myLogger, logger));
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger
    )
  )
);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
