import {FluxEcoUiMapElement} from "./flux-eco-ui-map-element/FluxEcoUiMapElement.mjs";



const parentElement = document.createElement("div");
document.body.appendChild(parentElement);

const settings = await (await fetch("settings.json")).json();

const outbounds = /** @type {FluxEcoUiMapElement.Outbounds} */ {
    createStyleSheetLink: () => {

    }
}


const idPath = "some/id-path";

const state =  /** @type {FluxEcoUiMapElement.State} */  ({
    mapView: {
        "center": {
            "lat": 34.238972,
            "lng": -118.433449
        },
        "zoom": 13
    },
    mapLayers: [
        {
            "layerOptions": {
                "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
            },
            "layerUrl": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
    ],
    mapMarkers: []
})

const configs = /** @type {FluxEcoUiMapElement.Configs} */ {
    settings: settings,
    outbounds: {
        createStyleSheetLink: () => {

        }
    },
    initialState: state
}

const element = await FluxEcoUiMapElement.new(idPath, configs);
parentElement.appendChild(element);


const changeState =  /** @type {FluxEcoUiMapElement.State} */  ({
    link: "test",
    title: "test",
    mapView: {
        "center": {
            "lat": 10.238972,
            "lng": -23.433449
        },
        "zoom": 13
    },
    mapLayers: [
        {
            "layerOptions": {
                "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
            },
            "layerUrl": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
    ],
    mapMarkers: []
})

setTimeout(function () {
    const rerender = () => element.changeState(changeState);
    rerender();
}, 10000); // 10000 Millisekunden entsprechen 10 Sekunden


setTimeout(function () {
    const rerender = () => element.changeState(state);
    rerender();
}, 20000); // 20000 Millisekunden entsprechen 10 Sekunden
