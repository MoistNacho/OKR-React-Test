import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { PrivateRoute } from "lib/router";

import Layout from "../Layout";

const TodoPage = lazy(() => import("./todo/TodoPage"));
const NotFound = lazy(() => import("./NotFound"));

const Routes = () => {
  return (
    <Layout>
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/(home)/" component={TodoPage} />
          <PrivateRoute
            path="/"
            component={() => (
              <>
                <Switch>
                  <Route component={NotFound} />
                </Switch>
              </>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default Routes;
