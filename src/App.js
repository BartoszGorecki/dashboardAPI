import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from './component/Header';
import UsersDashboard from './component/UsersDashboard';
const EditUser = React.lazy(() => import("./component/EditUser"));

const App = () => {
  return (
    <div className="container">
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          <Switch>
          <Route
            path="/edit"
            exact
            render={() => (
              <Suspense fallback={<p>Loading...</p>}>
                <EditUser />
              </Suspense>
            )}
          />
            <Route path="/" exact component={UsersDashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
