import "../definitions/types.mjs";
import * as L from '../libs/leaflet/dist/leaflet-src.esm.js';

/**
 * @typedef {Object} FluxEcoUiMapElement
 * @property {function} new
 * @property {function} onStatePublished
 */


export class FluxEcoUiMapElement extends HTMLElement {
    /**
     * @type {string}
     */
    idPath;
    /**
     * @type {MapElementState}
     */
    state
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * FluxEcoUiMapElementConfigs
     */
    configs;

    /**
     * @param {ResourceIdentifier} idPath
     * @param {FluxEcoUiMapElementConfigs} configs
     */
    constructor(idPath, configs) {
        super();
        this.idPath = idPath;
        this.configs = configs;
        this.#shadow = this.attachShadow({mode: 'closed'});
    }

    /**
     * @param
     * @param configs
     * @returns {FluxEcoUiMapElement}
     */
    static async new(idPath, configs) {
        return new FluxEcoUiMapElement(idPath, configs);
    }

    connectedCallback() {
        const mapContainer = this.#createMapContainer(this.mapContainerIdPath, this.configs.settings);
        this.#shadow.appendChild(mapContainer);
        this.#applyStateChanged(this.configs.initialState, mapContainer);
    }


    /**
     * @param {HTMLElement} parent
     */
    render(parent) {
        const element = document.createElement('flux-eco-ui-map-element');
        element.idPath = this.idPath;
        element.configs = this.configs;
        parent.appendChild(element);
    }

    /**
     * @param {MapElementState} elementState
     * @return {Promise<void>}
     */
    async onStatePublished(elementState) {
        this.#applyStateChanged(elementState, this.mapContainer)
    }

    /**
     *
     * @param {string} mapContainerIdPath
     * @param {FluxEcoUiMapElementSettings} settings
     * @returns {HTMLDivElement}
     */
    #createMapContainer(mapContainerIdPath, settings) {
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('idPath', mapContainerIdPath);
        const {height, width} = settings.mapContainerDimensions;
        mapContainer.style.height = height;
        mapContainer.style.width = width;
        return mapContainer;
    }


    /**
     * @param {MapElementState} mapElementState
     */
    #applyStateChanged(mapElementState, mapContainer) {
        console.log(mapElementState);
        const {mapElementViewState, mapElementLayerStates, mapElementMarkerStates} = mapElementState
        const {center, zoom, viewOptions} = mapElementViewState;

        const map = L.map(mapContainer).setView([center.lat, center.lng], zoom);

        if (mapElementLayerStates.length > 0) {
            mapElementLayerStates.forEach((layer) => {
                const {layerUrl, layerOptions} = layer;
                L.tileLayer(layerUrl, layerOptions).addTo(map);
            });
        }

        if (mapElementMarkerStates.length > 0) {
            mapElementMarkerStates.forEach((marker) => {
                const {link} = marker;
                L.marker([link.lat, link.lng]).addTo(map)

                /* todo
                    L.marker([link.lat, link.lng]).addTo(map)
                    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                     .openPopup();
                  */
            });
        }
    }

    get mapContainerIdPath() {
        return [this.idPath, 'map'].join("/")
    }

    /**
     * @returns {HTMLElement}
     */
    get mapContainer() {
        return this.#shadow.getElementById(this.mapContainerIdPath);
    }

}

customElements.define('flux-eco-ui-map-element', FluxEcoUiMapElement);
