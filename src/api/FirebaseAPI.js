import {
    firestore
} from '../../config.js';
import ellipsis from 'text-ellipsis';

export function registerViewHistory(user, video) {
    firestore
        .collection('viewHistory')
        .doc(user.uid + video.id)
        .set({
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnails: video.snippet.thumbnails.medium.url,
            date: new Date(),
            userId: user.uid
        })
        .then(() => {
            console.log('success');
        });
}

export function ReadViewHisoty(user) {
    console.log('tessss')
    return firestore
        .collection('viewHistory')
        .where("userId", "==", user.uid)
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const item = {
                    id: {
                        videoId: data.videoId
                    },
                    snippet: {
                        title: data.title,
                        description: ellipsis(data.description, 160, {
                            ellipsis: '...'
                        }),
                        thumbnails: {
                            medium: {
                                url: data.thumbnails
                            }
                        }
                    }
                }
                result.push(item);
            })
            return result;
        });
}