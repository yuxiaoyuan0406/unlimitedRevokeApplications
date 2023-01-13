// ==UserScript==
// @name         出入校无限制撤销
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  随时随地撤销出入校申请
// @license      WTFPL
// @author       Dennis
// @match        https://service.muc.edu.cn/v2/matter/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var pageContent;

(function () {
    'use strict';

    onDocReady();
})();

function main() {
    let content = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > h1");
    if (content == null) { return; }
    if (content.textContent != '学生临时出入校申请') { return; }
    
    // alert('检测到临时出入校申请界面');

    let buttonList = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns");
    let exampleButton = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns > button:nth-child(1)");
    let lastElementInList = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns > div");

    let newRevokeButton = exampleButton.cloneNode(false);
    newRevokeButton.textContent = ' my revoke ';
    newRevokeButton.addEventListener('click', onNewRevokeButtonClick);
    newRevokeButton.style = exampleButton.style;
    newRevokeButton.appendChild(exampleButton.querySelector('i'));
    buttonList.insertBefore(newRevokeButton, lastElementInList);
}

function onNewRevokeButtonClick(){
    alert('revoke');
}

function onDocReady(){
    let state = document.readyState;
    console.log(state)
    if(state != 'complete') {
        document.onreadystatechange = onDocReady;
    } else {
        pageContent = document.querySelector("body > div.app.layout_two > div.content");
        pageContent.addEventListener('DOMNodeInserted', onDOMInsert);
    }

    function onDOMInsert() {
        console.log('insert some shit');
        let buttonList = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns");
        let exampleButton = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns > button:nth-child(1)");
        let lastElementInList = document.querySelector("body > div.app.layout_two > div.content > div.examine_matter > div.operation_box > div.content > div.btns > div");
        if(buttonList != null && exampleButton != null && lastElementInList != null) {
            pageContent.removeEventListener('DOMNodeInserted', onDOMInsert);
            main()
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
