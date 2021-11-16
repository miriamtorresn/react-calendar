import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from "./redux/configStore";
import initialState from './redux/reducers/initialState';
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore(initialState);

ReactDOM.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReduxProvider>,
  document.getElementById('root')
);

reportWebVitals();
