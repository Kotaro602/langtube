import appConst from '../../app-const.js';
import config from '../../config.js';
import getQueryString from '../util/urlParameterUtil'

export function getVideoInfo(videoId) {
    console.log('ss')
    const params = {
        'part': 'snippet,statistics',
        'id': videoId,
        'key': config.youtube.apiKey
    };
    const query = getQueryString(params);

    return fetch(appConst.youtube.videoUrl + query).then(res => res.json());
}

export function getRelatedVideo(relatedVideoId, resultCount) {

    const params = {
        'part': 'snippet',
        'type': 'video,',
        'videoCaption': 'closedCaption',
        'relatedToVideoId': relatedVideoId,
        'maxResults': resultCount,
        'key': config.youtube.apiKey
    };
    const query = getQueryString(params);

    return fetch(appConst.youtube.searchUrl + query).then(res => res.json());
}

export function getSubtitle(videoId) {

    const params = {
        'hl': 'en',
        'lang': 'en',
        'v': videoId,
    };
    const query = getQueryString(params);
    return fetch(appConst.youtube.subtitleUrl + query)
        .then(res => res.text())
        .then(textData => {

            const parser = new DOMParser();
            return parser.parseFromString(textData, "text/xml");
        });
}