/**
 * The view of the map (geographical center and zoom) with the given animation options.
 * @typedef {Object} MapElementViewState
 * @param {LatLng} center - Geographical center to set the map view to.
 * @param {Number} zoom - Zoom level to set the map view to.
 * @param {Object} options - Animation options, e.g. `{animate: true, duration: 0.25}`.
 */


/**
 * Object representing the state of a map marker
 * @typedef {Object} MapElementState
 * @property {string} title - The title of the element.
 * @property {Object} link - The link associated with the element.
 * @property {string} link.href - The URL of the link.
 * @property {string} link.text - The text of the link.
 * @property {MapElementLayer} mapElementLayer
 * @property {MapElementViewState} mapElementViewState - The view of the map
 * @property {MapElementLayerState[]} mapElementLayerStates
 * @property {MapElementMarkerState[]} mapElementMarkerStates - an array of map markers
 */

/**
 * Object representing the state of a map marker
 * @typedef {Object} MapElementMarkerState
 * @property {Object} link - The link associated with the marker.
 * @property {string} link.href - The URL of the link.
 * @property {string} link.text - The text of the link.
 * @property {number} link.lat - The latitude coordinate of the marker.
 * @property {number} link.long - The longitude coordinate of the marker.
 * @property {number} radius - The radius of the marker.
 */

/**
 * @typedef {Object} FluxEcoUiMapElementConfigs
 * @property {FluxEcoUiMapElementSettings} settings - Map element settings.
 * @property {FluxEcoUiMapElementOutbounds} outbounds - Map element outbounds.
 */


/**
 * @typedef {Object} MapElementLayerState
 * @property {string} layerUrl - The base URL of the map tile layer.
 * @property {Object} layerOptions
 */

/**
 * @typedef {Object} FluxEcoUiMapElementSettings
 * @property {FluxEcoUiMapElementDimensions} mapContainerDimensions - The dimensions of the map container.
 * @property {MapElementState} initialState
 */

/**
 * @typedef {Object} FluxEcoUiMapElementDimensions
 * @property {string} width - The width of the map container.
 * @property {string} height - The height of the map container.
 */

/**
 * @typedef {Object} FluxEcoUiMapElementOutbounds
 * @property {function(object, object)} validateMapState - Function to validate the state of the map.
 */

/**
 * @type {Object}
 * @property {function(FluxEcoUiMapElementConfigs): FluxEcoUiMapElementConfigs} createConfigObject - Function to create a map element configuration object.
 */

/**
 * @typedef {Object} FluxEcoUiMapElementConfigs
 * @property {FluxEcoUiMapElementSettings} settings
 * @property {FluxEcoUiMapElementOutbounds} outbounds
 */

/**
 * @typedef {Object} FluxEcoUiMapElementOutbounds
 * @typedef {FluxEcoUiMapElementOutbounds} Outbounds

 */


