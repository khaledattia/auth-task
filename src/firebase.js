import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app =  initializeApp({
    apiKey: "AIzaSyCdCbc2TQOYFKRVyQhKgw3xE94zqbNIu0o",
    authDomain: "auth-development-60106.firebaseapp.com",
    projectId: "auth-development-60106",
    storageBucket: "auth-development-60106.appspot.com",
    messagingSenderId: "636498542026",
    appId: "1:636498542026:web:d40e959b4e43c3ce10e333"
});

export const auth = getAuth( app );
export default app;

auth.languageCode = 'it';