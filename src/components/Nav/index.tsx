import React from 'react';

// import components
import { People, Inbox, Logout } from '../Icons';
import { facebookLogout } from '../FacebookSDK';

// importing Images
import Logo from '../../assets/rp.png';

// import styles
import './styles.css'

const Nav = () => {
    return (
        <div className="mainWrapperNav">
            <div className="navItem">
                <img className="navItemLogo" src={Logo} alt="Richpanel logo" />
            </div>
            <div className="navItem navItemSelected">
                <Inbox />
            </div>
            <div className="navItem">
                <People />
            </div>
            <div className="navItem">
                <Logout onClick={() => {
                    facebookLogout();
                    console.log('logout');
                }} />
            </div>
            <div className="navItem navProfile">
                <div className="navProfileIcon" />
            </div>
        </div>
    )
};

export default Nav;
