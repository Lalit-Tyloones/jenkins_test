import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';


const signIn = (email, password) => {
    const poolData = {
        UserPoolId: 'ap-south-1_XIzhTBXNy',
        ClientId: '1c1oqt32o3672o2bss96ma2jj9'
    };
    const userPool = new CognitoUserPool(poolData);
    const authenticationData = {
        Username: email,
        Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
        Username: email,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
            console.log('Authentication successful');
            const accessToken = session.getAccessToken().getJwtToken();
            const refreshToken = session.getRefreshToken().getToken();
            console.log('Access Token: ', accessToken);
            console.log('Refresh Token: ', refreshToken);
            sessionStorage.setItem('access_token', accessToken)
            sessionStorage.setItem('refresh_token', refreshToken)
        },
        onFailure: (error) => {
            console.log('Authentication failed:', error);
        },
        newPasswordRequired: (userAttributes) => {
            console.log('New password required');
        }
    });
};


export default signIn