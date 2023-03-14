import {FluxEcoUiMapElement} from "./flux-eco-ui-map-element/FluxEcoUiMapElement.mjs";

const parentElement = document.createElement("div");
document.body.appendChild(parentElement);

const settings = await (await fetch("settings.json")).json();
const id = "some/id-path";

const state =  /** @type {FluxEcoUiMapElementState} */  ({
    mapElementView: {
        "center": {
            "lat": 10.238972,
            "lng": -23.433449
        },
        "zoom": 13
    },
    mapElementMarkers: []
})

const mapElement = FluxEcoUiMapElement.new({
    id: id,
    settings: settings,
    initialState: state
})
parentElement.appendChild(mapElement);

const newState = state;
newState.mapElementView = {
    center: {
        lat: 34.238972,
        lng: -118.433449
    },
    zoom: 13
};

setTimeout(function () {
    const rerender = () => mapElement.setAttribute(
        "state", JSON.stringify(newState)
    )
    rerender();
}, 10000);
