import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { ErrorBoundary, GlobalError } from './components';
import * as serviceWorker from './serviceWorker';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <ErrorBoundary component={(error, info) => <GlobalError error={error} info={info} />}>
            <Helmet>
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0" ></script>
            </Helmet>  
            <App />
  </ErrorBoundary>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
