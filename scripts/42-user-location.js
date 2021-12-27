// ==UserScript==
// @name         42 User Location
// @namespace    776303e5-70e8-49a3-cb7f-f036c47f1a9b
// @version      0.1
// @description  Add user location in cluster in profile.
// @author       rpinto-r
// @match        https://profile.intra.42.fr/users/*
// @icon         https://icons.duckduckgo.com/ip3/42.fr.ico
// @downloadURL  https://github.com/ricardoreves/42-userscripts-js/scripts/raw/master/42-user-location.user.js
// @grant        none
// ==/UserScript==

(async () =>
{
    'use strict';
    try
    {
        const element = document.querySelector(".user-poste-infos");
        const poste = element.innerText;
        const clusters = [{
            id: "c1",
            name: "Gotham",
            door: "540,270,550,260,550,280",
            mapUrl: "https://cdn.intra.42.fr/cluster/image/91/c1-manual.svg"
        }, {
            id: "c2",
            name: "Asgard",
            door: "360,70,380,70,370,80",
            mapUrl: "https://cdn.intra.42.fr/cluster/image/90/c2-1.svg"
        }];
        if (poste === "-")
            return;
        const cluster = clusters.find(item => item.id == poste.slice(0, 2));
        const res = await fetch(cluster.mapUrl);
        const svgText = await res.text();
        const parser = new DOMParser();
        const svg = parser.parseFromString(svgText, "image/svg+xml");
        svg.querySelectorAll(`rect, image, text`).forEach(el =>
        {
            if (el.nodeName === "rect" && el.id === poste)
            {
                const h = +el.getAttribute('height');
                const w = +el.getAttribute('width');
                const cx = +el.getAttribute('x') + w * .5;
                const cy = +el.getAttribute('y') + h * .5;
                el.insertAdjacentHTML('afterend', `<polygon points="${cluster.door}" style="fill:red;"/>`);
                el.insertAdjacentHTML('afterend', `<circle cx="${cx}" cy="${cy}" r="6" fill="red"><animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite"/></circle>`);
            }
            if (el.nodeName === "text")
                el.setAttribute("fill", "grey");
        });
        const serializer = new XMLSerializer();
        const svgXml = serializer.serializeToString(svg);
        element.insertAdjacentHTML('afterend', `${cluster.name}${svgXml}`);
    }
    catch (error)
    {
        console.log(`Error:`, error)
    }
})();