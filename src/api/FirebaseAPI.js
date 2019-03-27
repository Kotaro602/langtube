import {
    firestore
} from '../../config.js';
import ellipsis from 'text-ellipsis';

export const registerHistory = (user, video) => {

    const info = {
        id: {
            videoId: video.id
        },
        snippet: {
            title: video.snippet.title,
            description: ellipsis(video.snippet.description, 160, {
                ellipsis: '...'
            }),
        },
        date: new Date()
    }
    window.historyList = window.historyList.filter(item => item.id.videoId != video.id);
    window.historyList.unshift(info);

    firestore
        .collection('history')
        .doc(user.uid)
        .set({
            list: window.historyList
        })
        .then(() => {
            console.log('history write success');
        });
}

export const registerBookmark = (user, video, delFlg) => {

    const info = {
        id: {
            videoId: video.id
        },
        snippet: {
            title: video.snippet.title,
            description: ellipsis(video.snippet.description, 160, {
                ellipsis: '...'
            }),
        },
        date: new Date()
    }
    window.bookmarkList = window.bookmarkList.filter(item => item.id.videoId != video.id);
    if (!delFlg) window.bookmarkList.unshift(info);

    firestore
        .collection('bookmark')
        .doc(user.uid)
        .set({
            list: window.bookmarkList
        })
        .then(() => {
            console.log('bookmark write success');
        });
}

export const readHistory = (user) => {
    console.log('readHistoryStart')
    return firestore
        .collection('history')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
            return querySnapshot.data() ? querySnapshot.data().list : [];
        });
}

export const readBookmark = (user) => {
    console.log('readBookmarkStart')
    return firestore
        .collection('bookmark')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
            console.log(querySnapshot.data())
            return querySnapshot.data() ? querySnapshot.data().list : [];
        });
}