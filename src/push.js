import {postRequest} from "./requests.js";

const publicVapidKey = "BDOLcqQ0rm4DNNyx-L8glLEqWkpnIsgzFkpVaJGABBEYmFR9qhdW6Wc9hyQGiyVBa1MUsqwyNAdcBEln0iVObOE";
//
// if ("serviceWorker" in navigator) {
//     send().catch((err) => console.error(err));
// } else {
//     console.error("Service workers are not supported in this browser");
// }

export async function send() {
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("./sw.js", {
        scope: "/",
    });
    console.log("Service Worker Registered...");

    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push Registered...");

    console.log("Sending Push...");
    await postRequest('subscribe', subscription);
    console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}