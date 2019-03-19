import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

export const youtube = {
    apiKey: 'AIzaSyDenRjxW_dLIb4r-GyEVPTVJA1ZRjubiNM',
    clientId: '258334721728-v7i279noug32l1q1ci8chjikq4m4kled.apps.googleusercontent.com'
}

const firebaseConfig = {
    apiKey: "AIzaSyDk20lvALhFB1VKz2wzUJdznWmYaOGwhk4",
    authDomain: "langtube-21570.firebaseapp.com",
    databaseURL: "https://langtube-21570.firebaseio.com",
    projectId: "langtube-21570",
    storageBucket: "langtube-21570.appspot.com",
    messagingSenderId: "1041953238403"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();

export const category = [
    'Sports',
    'Travel',
    'Game Play',
    'Comedy',
    'Entertainment',
    'Howto',
    'Education',
    'Science',
    'Technology',
    'Ted',
    'Movies',
    'Anime',
    'Foreign',
    'Culture',
    'TalkShow',
    'Interview',
    'Cooking'






    // {
    //     id: 17,
    //     name: 'Sports'
    // },
    // {
    //     id: 19,
    //     name: 'Travel & Events'
    // },
]