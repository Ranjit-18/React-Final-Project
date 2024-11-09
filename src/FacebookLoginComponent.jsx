// FacebookLoginComponent.js
import { useEffect } from 'react';

function FacebookLoginComponent() {
  useEffect(() => {
    // Load the Facebook SDK
    (function(d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      element.parentNode.insertBefore(js, element);
    }(document, 'script', 'facebook-jssdk'));

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1285500226231058', // Replace with your actual Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v17.0'
      });
    };
  }, []);

  const handleFacebookLogin = () => {
    FB.login(response => {
      if (response.status === 'connected') {
        getUserData();
      } else {
        alert('Facebook login failed');
      }
    }, { scope: 'public_profile,email' });
  };

  const getUserData = () => {
    FB.api('/me', { fields: 'id,name,email' }, function(response) {
      console.log('Facebook User data:', response);
      // Handle the Facebook user data here (e.g., save to Redux store or send to backend)
    });
  };

  return (
    <button onClick={handleFacebookLogin}>Login with Facebook</button>
  );
}

export default FacebookLoginComponent;
