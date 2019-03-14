var express = require('express');
var app = express();
const path = require('path');
var fs = require('fs')
var getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node')
var getYoutubeSubtitleUrl = require('@joegesualdo/get-youtube-subtitle-url-node').default;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getsubtitleurl', function (req, res) {
    getYoutubeSubtitleUrl(req.query.videoId, {
            type: 'auto'
        })
        .then((result) => {
            res.json(result.url.replace('fmt=vtt', 'fmt=srv3'));
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

// app.get('/api/getautosubtitle', function (req, res) {

//     getYoutubeSubtitles(req.query.videoId, {
//             type: 'auto'
//         })
//         .then((result) => {
//             var subtitleList = [],
//                 start,
//                 text;

//             subtitleList.push(subtitleElement(result[0].start / 1000, result[0].part))

//             for (var i = 3; i < result.length; i++) {
//                 if (i % 4 === 3) start = result[i].start / 1000;
//                 if (i % 4 === 1) text = result[i].part;
//                 if (i % 4 === 2) {
//                     subtitleList.push(subtitleElement(start, text));
//                 }

//             }
//             res.json(subtitleList);
//         })
//         .catch(err => {
//             // Executed if subtitles are not available for this video.
//         })
// })

// app.get('/api/test', function (req, res) {

//     getYoutubeSubtitles(req.query.videoId, {
//             type: 'auto'
//         })
//         .then((result) => {
//             var subtitleList = [],
//                 start,
//                 text;

//             for (var i = 0; i < result.length; i++) {
//                 start = result[i].start / 1000;
//                 text = result[i].part;
//                 subtitleList.push(subtitleElement(start, text));
//             }
//             res.json(subtitleList);
//         })
//         .catch(err => {
//             // Executed if subtitles are not available for this video.
//         })
// })



// function subtitleElement(start, text) {
//     return {
//         attributes: {
//             start: start
//         },
//         elements: [{
//             text: text
//         }]
//     }
// }