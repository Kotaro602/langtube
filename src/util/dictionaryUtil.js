export function getSearchWordsArray(targetWord, dictionary) {

    if (!targetWord || !dictionary) return;

    //不要な文字を除却と小文字に整形
    const word = targetWord.replace(/\.|,| |…|\?|"|’s|’ve/g, '').toLowerCase();

    //
    let searchWordArray = [word];

    //名詞複数形のs 、動詞3単元のs
    if (word.endsWith('s')) {
        searchWordArray.push(word.slice(0, -1));

        if (word.endsWith('ies')) {
            searchWordArray.push(word.slice(0, -3) + 'y');

        } else if (word.endsWith('es')) {
            searchWordArray.push(word.slice(0, -2));
        }
    }

    //動詞の過去系、進行形
    if (word.endsWith('ed')) {
        searchWordArray.push(word.slice(0, -1));
        searchWordArray.push(word.slice(0, -2));

        if (word.endsWith('ied')) {
            searchWordArray.push(word.slice(0, -3) + 'y');
        }

    } else if (word.endsWith('ing')) {
        searchWordArray.push(word.slice(0, -3));
        searchWordArray.push(word.slice(0, -3) + 'e');
    }

    //形容詞の比較表、最大級
    if (word.endsWith('er')) {
        searchWordArray.push(word.slice(0, -1));
        searchWordArray.push(word.slice(0, -2));

    } else if (word.endsWith('est')) {
        searchWordArray.push(word.slice(0, -2));
        searchWordArray.push(word.slice(0, -3));

        if (word.endsWith('iest')) {
            searchWordArray.push(word.slice(0, -4) + 'y');
        }
    }

    //検索実行
    const searchResult = dictionary.filter(wordObj => {
        return searchWordArray.indexOf(wordObj.k) !== -1;
    });

    //各検索ワードに完全一致したやつは上部に来るように配列を入れ替える（部分一致は下部に行く）
    searchWordArray.forEach(resultWord => {
        const matchIndex = searchResult.findIndex(obj => obj.t === resultWord);
        if (matchIndex !== -1) {
            searchResult.unshift(searchResult[matchIndex]);
            searchResult.splice(matchIndex + 1, 1);
        }
    })

    // 元のワードに完全一致したやつは一番上に表示する
    const matchIndex = searchResult.findIndex(obj => obj.t === word);
    if (matchIndex !== -1) {
        searchResult.unshift(searchResult[matchIndex]);
        searchResult.splice(matchIndex + 1, 1);
    }

    return searchResult;
}