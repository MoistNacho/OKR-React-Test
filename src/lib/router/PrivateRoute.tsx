import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteProps, RouteComponentProps } from "react-router-dom";

const PrivateRoute = observer(
  ({ component: Component, ...rest }: RouteProps) => {
    const render = Component
      ? (props: RouteComponentProps) => <Component {...props} />
      : () => <></>;

    return <Route {...rest} render={render} />;
  },
);

export default PrivateRoute;
