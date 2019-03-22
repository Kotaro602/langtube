import {
    firestore
} from '../../config.js';
import ellipsis from 'text-ellipsis';

export function registerViewHistory(user, video) {

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

    ReadViewHisoty(user).then(latestHistoryList => {
        let historyList = latestHistoryList.filter(item => item.id.videoId != video.id);
        historyList.unshift(info);

        firestore
            .collection('history')
            .doc(user.uid)
            .set({
                historyList: historyList
            })
            .then(() => {
                console.log('history write success');
            });
    })

}

export function ReadViewHisoty(user) {
    console.log('readStart')
    return firestore
        .collection('history')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
            return querySnapshot.data() ? querySnapshot.data().historyList : [];
        });
}