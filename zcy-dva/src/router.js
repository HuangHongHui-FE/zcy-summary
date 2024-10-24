import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import App from "./routes/App";
import Film from "./routes/Film";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          render={() => (
            <App>
              <Switch>
                <Route path="/film" component={Film} />
                <Redirect from="/" to="/film"></Redirect>
              </Switch>
            </App>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
