import React from 'react';

// importing components
import { facebookLogin } from '../../components/FacebookSDK';

// importing styles
import './styles.css';

const Login = () => {
    return (
        <div className="mainWrapperLogin">
            <h1>Welcome to FB Helper</h1>
            <h4>To Continue, please login</h4>
            <div onClick={() => facebookLogin()}>
                Continue with Facebook
            </div>
        </div>
    );
};

export default Login;