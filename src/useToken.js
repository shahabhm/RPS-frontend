import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const getRole = () => {
        const tokenString = sessionStorage.getItem('role');
        const userToken = JSON.parse(tokenString);
        return userToken?.role
    };

    const getAccountId = () => {
        const tokenString = sessionStorage.getItem('accountId');
        const userToken = JSON.parse(tokenString);
        return userToken?.account_id
    }

    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState(getRole());
    const [accountId, setAccountId] = useState(getAccountId());

    const saveToken = userToken => {
        console.log('saving token', userToken);
        sessionStorage.setItem('token', JSON.stringify(userToken.token));
        sessionStorage.setItem('role', JSON.stringify(userToken.role));
        sessionStorage.setItem('account_id', JSON.stringify(userToken.account_id));
        const tokenString = sessionStorage.getItem('token');
        const logToken = JSON.parse(tokenString);
        console.log('saved token into session: ', logToken);
        setToken(userToken);
        setRole(userToken.role);
        setAccountId(userToken.account_id);
    };

    return {
        setToken: saveToken,
        token,
        role,
        accountId
    }
}