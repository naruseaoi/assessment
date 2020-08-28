'use strict';
const myNameInput = document.getElementById('myName');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもをすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }
assessmentButton.onclick = () => {
    const myName = myNameInput.value;
    if (myName.length === 0) { // 入力が空の時は処理を終了する
        return;
      }
    
    //TODO　診断結果表示エリアの作成 
    removeAllChildren(resultDivided);
    const header = document.createElement('h4');
    header.innerText = '<日記>';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(myName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //TODO　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('私と齋藤さんの日記')   
        +'&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #私と齋藤さんの日記';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};


const answers = [
    '私が齋藤さんとご飯行きたいけどはずかしくて誘えないと相談していた同級生に「齋藤からも同じ内容を相談されてる」って言われた。',
    '齋藤さんのお母さんは霊感が強くて普通にものとか揺れるらしい。私は幽霊とか信じないけど，これから信じることにした。',
    '寮の同室になった齋藤さん，私の出身地と齋藤さんの親の出身地が一緒で地味な地元トークをした。これから仲良くなれたらいいな。',
    '齋藤さんと恋愛の話になってお互い今まで恋人がいなかったことが分かり，「愛ってなんだろうね」と話しながら先輩から貰ったポテチを食べた。',
    '大事な試験の日，齋藤さんが私の分のお弁当をつくってくれて，それを試験会場で食べた。おいしかったし，写真撮った。',
    '齋藤さんがスパイスからスパイスカレー作ってた。2人分のほうが作りやすいらしく，今後もごちそうになることになった。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} myName 私の名前
 * @return {string} 診断結果
 */
function assessment(myName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < myName.length; i++){
        sumOfCharCode = sumOfCharCode + myName.charCodeAt(i);
    }
    //文字コードの合計を回答数で割り，添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    
    return　result;
}

//エンターでも反応するようにする
myNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
          assessmentButton.onclick();
        }
    };
