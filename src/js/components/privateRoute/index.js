import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const mapStateToProps = state => {
  return { isConnected: state.control.isConnected };
};

const PrivateRoute = ({component: Component, isConnected , ...rest}) => {
    return <Route
        {...rest}
        render={
            props => {
                return isConnected ?
                    (
                        <Component {...props} />
                    )
                    :
                    (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />
                    )
            }
        }
    />
};

export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);
