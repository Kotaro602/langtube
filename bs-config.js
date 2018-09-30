/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "files": ["ste.html", "./public/*.js"],
    "watchEvents": [
        "change"
    ],
    "watch": true,
    "ignore": [],
    "single": false,
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": false,
    "proxy": 'localhost',
    "port": 9999,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "location": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    }
};