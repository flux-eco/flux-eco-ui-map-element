import * as L from  "https://unpkg.com/leaflet/dist/leaflet-src.esm.js"; //todo

export class FluxEcoUiMapElement extends HTMLElement {
    /**
     * @type {string|null}
     */
    #id = null;
    /**
     * @type {FluxEcoUiMapElementSettings}
     */
    #settings;
    /**
     * @type {FluxEcoUiMapElementState|null}
     */
    #state;
    /**
     * @type {HTMLElement}
     */
    #contentContainer;
    /**
     * @type {ShadowRoot}
     */
    #shadow;


    static get observedAttributes() {
        return ["state"];
    }

    /**
     * @param {FluxEcoUiMapElementConfig} validatedConfig
     */
    constructor(validatedConfig) {
        super();

        if (validatedConfig.hasOwnProperty("id")) {
            this.#id = validatedConfig.id;
        }
        this.#settings = validatedConfig.settings;
        if (validatedConfig.hasOwnProperty("initialState")) {
            this.#state = validatedConfig.initialState;
        }

        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#shadow.appendChild(FluxEcoUiMapElement.linkStyleSheet);
    }

    static get linkStyleSheet() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./flux-eco-ui-map-element/assets/stylesheet.css";
        return link;
    }

    static get tagName() {
        return 'flux-eco-ui-map-element'
    }

    /**
     * @param {FluxEcoUiMapElementConfig} validatedConfig
     * @returns {FluxEcoUiMapElement}
     */
    static new(validatedConfig) {
        return new FluxEcoUiMapElement(validatedConfig);
    }

    connectedCallback() {
        if (this.#id === null) {
            this.#id = [this.parentElement.id, FluxEcoUiMapElement.tagName].join("/");
        }
        this.setAttribute("id", this.#id);

        this.#contentContainer = this.#createContentContainerElement(this.#id)
        this.#shadow.appendChild(this.#contentContainer);

        if (this.#state) {
            this.#applyStateChanged(this.#state)
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "state":
                this.changeState(JSON.parse(newValue));
                break;
            default:
                break;
        }
    }

    changeState(newState) {
        //todo validate

        this.#applyStateChanged(newState);
    }

    #applyStateChanged(validatedState) {
        const {mapContainerDimensions, mapElementLayers} = this.#settings;
        const {mapElementView, mapElementMarkers} = validatedState

        const mapContainer = this.#createMapContainerElement(mapContainerDimensions);
        this.#contentContainer.innerHTML = "";
        this.#contentContainer.appendChild(mapContainer);

        const map = L.map(mapContainer);
        this.#renderMapLayers(map, mapElementLayers);
        this.#renderMapView(map, mapElementView)
        this.#renderMapMarkers(map, mapElementMarkers)

        this.#state = validatedState;
        const stateStringified = JSON.stringify(this.#state)
        if (this.getAttribute("state") !== stateStringified) {
            this.setAttribute("state", stateStringified);
        }
    }

    /**
     * @param map
     * @param {MapElementView} mapView
     */
    #renderMapView(map, mapView) {
        map.setView([mapView.center.lat, mapView.center.lng], mapView.zoom);
    }


    /**
     * @param map
     * @param {MapElementLayer[]} mapLayers
     */
    #renderMapLayers(map, mapLayers) {
        mapLayers.forEach((mapLayer) => {
            this.#renderMapLayer(map, mapLayer)
        });
    }

    /**
     *
     * @param map
     * @param {MapElementLayer} mapLayer
     */
    #renderMapLayer(map, mapLayer) {
        L.tileLayer(mapLayer.layerUrl, mapLayer.layerOptions).addTo(map)
    }

    /**
     *
     * @param map
     * @param {MapElementMarker[]} mapMarkers
     */
    #renderMapMarkers(map, mapMarkers) {
        mapMarkers.forEach((mapMarker) => {
            this.#renderMapLayer(map, mapMarker)
        });
    }

    /**
     *
     * @param map
     * @param {MapElementMarker} mapMarker
     */
    #renderMapMarker(map, mapMarker) {
        L.marker([mapMarker.lat, mapMarker.lng]).addTo(map)
        /* todo
                   L.marker([link.lat, link.lng]).addTo(map)
                   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                    .openPopup();
                 */
    }


    /**
     * @returns {HTMLElement}
     */
    #createContentContainerElement(id) {
        const contentContainerId = [id, 'content'].join("/");
        const contentContainer = document.createElement("div");
        contentContainer.id = contentContainerId;
        return contentContainer;
    }

    /**
     * @returns {HTMLElement}
     */
    #createMapContainerElement(mapContainerDimensions) {
        const mapContainer = document.createElement('div');
        const {height, width} = mapContainerDimensions;
        mapContainer.style.height = height;
        mapContainer.style.width = width;
        return mapContainer;
    }

}

customElements.define(FluxEcoUiMapElement.tagName, FluxEcoUiMapElement);
