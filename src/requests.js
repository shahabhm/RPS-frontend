export const postRequest = async function (endpoint, body) {
    const token = JSON.parse(sessionStorage.getItem('token'));

    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(body)
    });

    if (!response.ok) {
        console.error("endpoint: ", endpoint, ", body:", body, ", status:", response.status)
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const json = await response.json();
        console.log("endpoint: ", endpoint, ", body:", body, ", response: ", json);
        return json;
    }
}