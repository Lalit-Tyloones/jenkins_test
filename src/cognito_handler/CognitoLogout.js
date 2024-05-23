import React from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';


const Logout = (email) => {
    const poolData = {
        UserPoolId: 'ap-south-1_XIzhTBXNy',
        ClientId: '1c1oqt32o3672o2bss96ma2jj9'
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: email, 
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut(() => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        console.log('Successfully logged out');
       
    });
};



export default Logout;
