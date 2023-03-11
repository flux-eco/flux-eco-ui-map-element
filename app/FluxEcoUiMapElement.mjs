import * as L from './libs/leaflet/dist/leaflet-src.esm.js';

export class FluxEcoUiMapElement extends HTMLElement {
    /**
     * @type {string}
     */
    #id;
    /**
     * @type {FluxEcoUiMapElementState|null}
     */
    #state = null;
    /**
     * @type {FluxEcoUiMapElementSettings}
     */
    #settings;
    /**
     * @type {HTMLElement}
     */
    #contentContainer;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    static get AttributeName() {
        return {
            MapView: 'map-view',
            MapMarkers: 'map-markers',
            MapLayers: 'map-layers',
        };
    }

    static get AttributeNames() {
        return Object.values(this.AttributeName);
    }

    static get observedAttributes() {
        return this.AttributeNames;
    }


    /**
     * @param {string} id
     * @param {FluxEcoUiMapElementConfigs} configs
     */
    constructor(id, configs) {
        super();
        this.setAttribute("id", id);
        this.#id = id;
        this.#settings = configs.settings;
        this.#state = configs.initialState;

        this.#shadow = this.attachShadow({mode: 'closed'});

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./flux-eco-ui-map-element/assets/stylesheet.css";
        this.#shadow.appendChild(link);

        this.#contentContainer = this.#createContentContainerElement(id)
        this.#shadow.appendChild(this.#contentContainer);
    }

    /**
     * @param {string} id
     * @param {FluxEcoUiMapElementConfigs} configs
     * @returns {FluxEcoUiMapElement}
     */
    static new(id, configs) {
        return new FluxEcoUiMapElement(id, configs);
    }

    connectedCallback() {
        if (this.#state) {
            this.#applyStateChanged(this.#state)
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case FluxEcoUiMapElement.AttributeName.MapView:
                this.changeMapView(JSON.parse(newValue));
                break;
            case FluxEcoUiMapElement.AttributeName.MapLayers:
                this.changeMapLayers(JSON.parse(newValue));
                break;
            case FluxEcoUiMapElement.AttributeName.MapMarkers:
                this.changeMapMarkers(JSON.parse(newValue));
                break;
            default:
                break;
        }
    }

    /**
     * @param {FluxEcoUiMapElementState} newState
     * @return {void}
     */
    changeState(newState) {
        this.#applyStateChanged(newState)
    }

    /**
     * @param {MapElementViewState} newMapViewState
     * @return {void}
     */
    changeMapView(newMapViewState) {
        if (this.#state) {
            const newState = this.#state
            newState.mapView = newMapViewState;
            this.#applyStateChanged(newState)
        }
    }

    /**
     * @param {MapElementLayerState[]} newMapLayersState
     * @return {void}
     */
    changeMapLayers(newMapLayersState) {
        if (this.#state) {
            const newState = this.#state
            newState.mapLayers = newMapLayersState;
            this.#applyStateChanged(newState)
        }
    }

    /**
     * @param {MapElementMarkerState[]} newMapMarkersState
     * @return {void}
     */
    changeMapMarkers(newMapMarkersState) {
        if (this.#state) {
            const newState = this.#state
            newState.mapMarkers = newMapMarkersState;
            this.#applyStateChanged(newState)
        }
    }

    #applyStateChanged(newState) {
        const mapContainerElement = this.#createMapContainerElement(this.#settings.mapContainerDimensions);
        this.#contentContainer.innerHTML = "";
        this.#contentContainer.appendChild(mapContainerElement);
        this.#renderMap(mapContainerElement, newState);
        this.#state = newState;
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
     * @param {MapElementViewState} mapView
     */
    #renderMapView(parentMapElement, mapView) {
        parentMapElement.setView([mapView.center.lat, mapView.center.lng], mapView.zoom);
    }


    /**
     * @param parentMapElement
     * @param {MapElementMarkerState[]} mapLayers
     */
    #renderMapLayers(parentMapElement, mapLayers) {
        mapLayers.forEach((mapLayer) => {
            this.#renderMapLayer(parentMapElement, mapLayer)
        });
    }

    /**
     *
     * @param parentMapElement
     * @param {MapElementLayerState} mapLayer
     */
    #renderMapLayer(parentMapElement, mapLayer) {
        L.tileLayer(mapLayer.layerUrl, mapLayer.layerOptions).addTo(parentMapElement)
    }

    /**
     *
     * @param parentMapElement
     * @param {MapElementMarkerState[]} mapMarkers
     */
    #renderMapMarkers(parentMapElement, mapMarkers) {
        mapMarkers.forEach((mapMarker) => {
            this.#renderMapLayer(parentMapElement, mapMarker)
        });
    }

    /**
     *
     * @param parentMapElement
     * @param {MapElementMarkerState} mapMarker
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

customElements.define('flux-eco-ui-map-element', FluxEcoUiMapElement);
