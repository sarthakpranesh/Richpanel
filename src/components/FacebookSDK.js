export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '4094663610629633',
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus((resp) => {
                console.log(resp.status);
                resolve(resp.authResponse);
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}

export function facebookLogin() {
    window.FB.login((resp) => {
        console.log(resp);
        window.document.location.reload();
    }, {
        scope: 'public_profile,email,pages_messaging,pages_read_user_content',
    })
}

export function facebookLogout() {
    window.FB.logout(() => {
        window.document.location.reload();
    });
}

export function facebookGetPageAccessToken(userAccessToken) {
    return new Promise(async (resolve, reject) => {
        window.FB.api('/me/accounts', (resp) => {
            console.log(resp);
            resolve();
        })
    })
}
