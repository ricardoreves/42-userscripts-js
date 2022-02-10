// ==UserScript==
// @name         42 Video Hotkeys
// @namespace    71f4c2cf-54be-4c6d-db38-a04be65633f4
// @version      0.1
// @description  A plugin for Video.js that enables keyboard hotkeys when the player has focus.
// @author       rpinto-r
// @match        https://elearning.intra.42.fr/*
// @icon         https://icons.duckduckgo.com/ip3/42.fr.ico
// @downloadURL  https://github.com/ricardoreves/42-userscripts-js/scripts/raw/master/42-video-hotkeys.user.js
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const script = document.createElement("script");
    script.src = "//cdn.sc.gl/videojs-hotkeys/latest/videojs.hotkeys.min.js";
    script.onload = () => {
        const script = document.createElement("script");
        script.innerHTML = `
        const _videoElement = document.querySelector('video[id^="video-"]');
        if (_videoElement)
        {
            const _currentPlayer = videojs(_videoElement)
            //console.log(_videoElement, _currentPlayer)

            _currentPlayer.hotkeys({
                volumeStep: 0.1,
                seekStep: 5,
                enableModifiersForNumbers: false
            });
         }
        `;
        document.body.appendChild(script)
    }
    document.head.appendChild(script)
})();
