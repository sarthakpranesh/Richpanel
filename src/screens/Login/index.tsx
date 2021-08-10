import React from 'react';

// importing styles
import './styles.css';

const Login = () => {
    const onlogin = () => window.document.location.reload();
    return (
        <div className="mainWrapperLogin">
            <h1>Welcome to FB Helper</h1>
            <h4>To Continue, please login</h4>
            <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-onlogin={onlogin}></div>
        </div>
    );
};

export default Login;