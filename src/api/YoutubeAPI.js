import appConst from '../../app-const.js';
import config from '../../config.js';
import getQueryString from '../util/urlParameterUtil'
import convert from 'xml-js'

export function getVideoInfo(videoId) {
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

export function getSubtitle(videoId, langage) {

    const params = {
        'type': 'list',
        'v': videoId
    };
    const query = getQueryString(params);

    return fetch(appConst.youtube.subtitleUrl + query)
        .then(res => res.text())
        .then(textData => {
            const subtitleList = convert.xml2js(textData).elements[0].elements;
            const searchLang = langage ? langage : 'en';
            const subtitleInfoAttributes = subtitleList.find(item => {
                return item.attributes.lang_code === searchLang;
            })
            const subtitleInfo = subtitleInfoAttributes.attributes;

            const params = {
                'hl': subtitleInfo.lang_code,
                'lang': subtitleInfo.lang_code,
                'name': subtitleInfo.name,
                'v': videoId,
            };
            const query = getQueryString(params);

            return fetch(appConst.youtube.subtitleUrl + query)
                .then(res => res.text())
                .then(textData => {

                    const subtitle = convert.xml2js(textData).elements[0].elements;

                    return {
                        subtitleList: subtitleList,
                        subtitleInfo: subtitleInfo,
                        subtitle: subtitle
                    }
                });

        });
}