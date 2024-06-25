import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        console.log('saving token', userToken);
        sessionStorage.setItem('token', JSON.stringify(userToken));
        const tokenString = sessionStorage.getItem('token');
        const logToken = JSON.parse(tokenString);
        console.log('saved token into session: ', logToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}