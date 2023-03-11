import * as L from './libs/leaflet/dist/leaflet-src.esm.js';

/**
 * @typedef {Object} FluxEcoUiMapElement
 * @property {function} new
 * @property {function} onStatePublished
 */

export class FluxEcoUiMapElement extends HTMLElement {
    /**
     * @type {string}
     */
    id;
    /**
     * @type {FluxEcoUiMapElement.State|null}
     */
    state = null;
    /**
     * @type {FluxEcoUiMapElement.Settings}
     */
    settings;
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * @type {FluxEcoUiMapElement.Configs}
     */
    configs;
    contentContainerId

    /**
     * @param {ResourceIdentifier} idPath
     * @param {FluxEcoUiMapElementConfigs} configs
     */
    constructor(idPath, configs) {
        super();
        this.id = idPath;
        this.settings = configs.settings;
        this.state = configs.initialState;

        this.#shadow = this.attachShadow({mode: 'closed'});

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./flux-eco-ui-map-element/assets/stylesheet.css";
        this.#shadow.appendChild(link);

        const contentContainerId = [idPath, 'map'].join("/")
        this.contentContainerId = contentContainerId;
        const contentContainer = document.createElement("div");
        contentContainer.id = contentContainerId;



        this.#shadow.appendChild(contentContainer);
    }

    /**
     * @param {ResourceIdentifier} idPath
     * @param {FluxEcoUiMapElementConfigs} configs
     * @returns {FluxEcoUiMapElement}
     */
    static new(idPath, configs) {
        return new FluxEcoUiMapElement(idPath, configs);
    }

    connectedCallback() {
        if(this.state) {
            const mapContainerElement = this.#createMapContainerElement();
            this.contentContainer.appendChild(mapContainerElement);
            this.#renderMap(mapContainerElement, this.state);
        }
    }

    /**
     * @param {FluxEcoUiMapElementState} elementState
     * @return {void}
     */
    changeState(elementState) {
        const mapContainerElement = this.#createMapContainerElement();
        this.contentContainer.innerHTML = "";
        this.contentContainer.appendChild(mapContainerElement);
        this.#renderMap(mapContainerElement, elementState);
    }


    /**
     * @param {HTMLElement} mapContainer
     * @param {FluxEcoUiMapElementState} elementState
     */
    #renderMap(mapContainer, elementState) {
        const {mapView, mapLayers, mapMarkers} = elementState

        const map = L.map(mapContainer)
        this.#renderMapView(map, mapView)
        if (mapLayers.length > 0) {
            this.#renderMapLayers(map, mapLayers);
        }
        if (mapMarkers.length > 0) {
            this.#renderMapMarkers(map, mapMarkers);
        }
    }

    /**
     *
     * @param parentMapElement
     * @param {FluxEcoUiMapElementState.MapView} mapView
     */
    #renderMapView(parentMapElement, mapView) {
        parentMapElement.setView([mapView.center.lat, mapView.center.lng], mapView.zoom);
    }


    /**
     * @param parentMapElement
     * @param {FluxEcoUiMapElementState.MapLayer[]} mapLayers
     */
    #renderMapLayers(parentMapElement, mapLayers) {
        mapLayers.forEach((mapLayer) => {
            this.#renderMapLayer(parentMapElement, mapLayer)
        });
    }

    /**
     *
     * @param parentMapElement
     * @param {FluxEcoUiMapElement.State.MapLayer} mapLayer
     */
    #renderMapLayer(parentMapElement, mapLayer) {
        L.tileLayer(mapLayer.layerUrl, mapLayer.layerOptions).addTo(parentMapElement)
    }

    /**
     *
     * @param parentMapElement
     * @param {FluxEcoUiMapElement.State.MapMarker[]} mapMarkers
     */
    #renderMapMarkers(parentMapElement, mapMarkers) {
        mapMarkers.forEach((mapMarker) => {
            this.#renderMapLayer(parentMapElement, mapMarker)
        });
    }

    /**
     *
     * @param parentMapElement
     * @param {FluxEcoUiMapElement.State.MapMarker} mapMarker
     */
    #renderMapMarker(parentMapElement, mapMarker) {
        L.marker([mapMarker.lat, mapMarker.lng]).addTo(parentMapElement)
        /* todo
                   L.marker([link.lat, link.lng]).addTo(map)
                   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                    .openPopup();
                 */
    }


    /**
     * @returns {HTMLElement}
     */
    get contentContainer() {
        return this.#shadow.getElementById(this.contentContainerId);
    }

    /**
     * @returns {HTMLElement}
     */
    #createMapContainerElement() {
        const mapContainer = document.createElement('div');
        const {height, width} = this.settings.mapContainerDimensions;
        mapContainer.style.height = height;
        mapContainer.style.width = width;
        return mapContainer;
    }

}

customElements.define('flux-eco-ui-map-element', FluxEcoUiMapElement);
