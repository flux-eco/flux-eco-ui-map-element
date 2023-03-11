/**
 * Object representing the state of a map marker
 * @typedef {Object} FluxEcoUiMapElement.State
 * @property {FluxEcoUiMapElement.State.MapView} mapView - The view of the map
 * @property {FluxEcoUiMapElement.State.MapLayer[]} mapLayers
 * @property {FluxEcoUiMapElement.State.MapMarker[]} mapMarkers - an array of map markers
 */

/**
 * The view of the map (geographical center and zoom) with the given animation options.
 * @typedef {Object} FluxEcoUiMapElement.State.MapView
 * @property {LatLng} center - Geographical center to set the map view to.
 * @property {Number} zoom - Zoom level to set the map view to.
 * @property {Object} options - Animation options, e.g. `{animate: true, duration: 0.25}`.
 */

/**
 * Object representing the state of a map marker
 * @typedef {Object} FluxEcoUiMapElement.State.MapMarker
 * @property {Object} link - The link associated with the marker.
 * @property {string} link.href - The URL of the link.
 * @property {string} link.text - The text of the link.
 * @property {number} lat - The latitude coordinate of the marker.
 * @property {number} lng - The longitude coordinate of the marker.
 * @property {number} radius - The radius of the marker.
 */

/**
 * @typedef {Object} FluxEcoUiMapElement.State.MapLayer
 * @property {string} layerUrl - The base URL of the map tile layer.
 * @property {Object} layerOptions
 */