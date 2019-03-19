import {
    youtube
} from '../../app-const.js';
import {
    youtube
} from '../../config.js';
import getQueryString from '../util/urlParameterUtil'
import convert from 'xml-js'

export function getVideoInfo(videoId) {
    const params = {
        'part': 'snippet,statistics',
        'id': videoId,
        'key': youtube.apiKey
    };
    const query = getQueryString(params);

    return fetch(youtube.videoUrl + query).then(res => res.json());
}

export function getRelatedVideo(categoryId, resultCount) {

    const params = {
        'part': 'snippet',
        'type': 'video',
        'videoCaption': 'closedCaption',
        'videoCategoryId': categoryId,
        'maxResults': resultCount,
        'key': youtube.apiKey
    };
    const query = getQueryString(params);

    return fetch(youtube.searchUrl + query).then(res => res.json());
}

export function getSearchResult(q, resultCount) {

    console.log(q)
    const params = {
        'part': 'snippet',
        'type': 'video',
        'videoCaption': 'closedCaption',
        'q': q,
        'maxResults': resultCount,
        'key': youtube.apiKey
    };
    const query = getQueryString(params);

    return fetch(youtube.searchUrl + query).then(res => res.json());
}

// F9To5UjWhUA : closed captures
// D0C0blDHUkg : not english closed capture + auto script AUTOのフォーマットが違い
// giKeNoAWpOA : only auto
// T0Z73Zbtlyg : Germany and auto 一度変えた後にAUTOが消える。
// TODO: No subtitle
export async function getSubtitle(videoId, langage) {

    const listParams = {
        'type': 'list',
        'v': videoId
    };
    const listQuery = getQueryString(listParams);
    const listRes = await fetch(youtube.subtitleUrl + listQuery);
    const listData = await listRes.text();

    let targetSubtitle;
    let subtitle;
    let subtitleList = convert.xml2js(listData).elements[0].elements;

    //指定したスクリプトがあるか確認
    if (subtitleList) {
        targetSubtitle = subtitleList.find(item => {
            return item.attributes.lang_code.startsWith(langage);
        })
    }

    if (targetSubtitle) { //targetがある場合
        subtitle = await getClosedCaption(videoId, targetSubtitle.attributes);

    } else { //targetがない場合
        //Autoの字幕を取得
        subtitle = await getAutoSubtitle(videoId);

        if (subtitle) { //取得できたら

            //listにSubtitleListとAutoを追加
            const elem = [{
                attributes: {
                    lang_code: "auto",
                    lang_original: "English(auto-generated)"
                }
            }];
            subtitleList = subtitleList ? subtitleList.concat(elem) : elem;
            targetSubtitle = elem[0];

        } else { //取得できなかったら

            if (subtitleList[0]) {
                //listの中からどれか取得
                targetSubtitle = subtitleList[0];
                subtitle = await getClosedCaption(videoId, targetSubtitle.attributes);
            }
        }
    }

    return {
        subtitleList: subtitleList,
        subtitleLang: targetSubtitle.attributes.lang_code,
        subtitle: subtitle
    }
}

async function getClosedCaption(videoId, subtitleInfo) {

    const closedCapParams = {
        'hl': subtitleInfo.lang_code,
        'lang': subtitleInfo.lang_code,
        'name': subtitleInfo.name,
        'v': videoId,
    };
    const closedCapQuery = getQueryString(closedCapParams);

    let closedCapRes = await fetch(youtube.subtitleUrl + closedCapQuery)
    let closedCapData = await closedCapRes.text()
    const subtitle = convert.xml2js(closedCapData).elements[0].elements;

    return subtitle;
}

async function getAutoSubtitle(videoId) {

    const autoSubtitleUrlRes = await fetch('/api/getsubtitleurl/?videoId=' + videoId);
    const url = await autoSubtitleUrlRes.json();

    const autoSubtitleRes = await fetch(url);
    const autoSubtitleXml = await autoSubtitleRes.text();

    const autoSubtitleRow = convert.xml2js(autoSubtitleXml, {
        compact: true
    }).timedtext.body.p

    let autoSubtitle = []
    autoSubtitleRow.forEach(item => {

        if (!item.s) return;

        let text = new String();
        if (item.s._text) {
            text += item.s._text
        } else {
            item.s.forEach(word => text += word._text);
        }

        const elem = {
            attributes: {
                start: item._attributes.t / 1000
            },
            elements: [{
                text: text
            }]
        }
        autoSubtitle.push(elem);
    })

    return autoSubtitle;
}