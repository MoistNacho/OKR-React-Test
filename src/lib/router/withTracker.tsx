import React from "react";
import { RouteComponentProps } from "react-router-dom";

const withTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P) => {
    return <WrappedComponent {...props} />;
  };
};

export default withTracker;
