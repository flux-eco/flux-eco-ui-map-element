/**
 * Object representing the state of a map marker
 * @typedef {Object} FluxEcoUiMapElementState
 * @property {MapElementViewState} mapElementViewState - The view of the map
 * @property {MapElementLayerState[]} mapElementLayerStates
 * @property {MapElementMarkerState[]} mapElementMarkerStates - an array of map markers
 */

/**
 * The view of the map (geographical center and zoom) with the given animation options.
 * @typedef {Object} MapElementViewState
 * @property {LatLng} center - Geographical center to set the map view to.
 * @property {Number} zoom - Zoom level to set the map view to.
 * @property {Object} options - Animation options, e.g. `{animate: true, duration: 0.25}`.
 */

/**
 * @typedef {Object} MapElementLayerState
 * @property {string} layerUrl - The base URL of the map tile layer.
 * @property {Object} layerOptions
 */

/**
 * Object representing the state of a map marker
 * @typedef {Object} MapElementMarkerState
 * @property {Object} link - The link associated with the marker.
 * @property {string} link.href - The URL of the link.
 * @property {string} link.text - The text of the link.
 * @property {number} lat - The latitude coordinate of the marker.
 * @property {number} lng - The longitude coordinate of the marker.
 * @property {number} radius - The radius of the marker.
 */

