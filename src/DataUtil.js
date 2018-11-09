define([
    "List",
    "Map",
    "Layer",
    "Bounding",
    "LayerConfiguration",
    "Incident"
], function (
    List,
    Map,
    Layer,
    Bounding,
    LayerConfiguration,
    Incident
) {
        return {
            /** 
             * @param {Object[]} mapArray - the untyped map objects
             * @returns {List<Map>} - the map list
             */
            createMapList: function (mapArray) {
                var maps = new List({ idProperty: "id" }), i, j,
                    length = mapArray.length, map;
                for (i = 0; i < length; i++) {
                    map = mapArray[i];
                    map.layers = this.createLayerList(map.layers);
                    maps.addElement(new Map(map));
                }
                return maps;
            },
            /** 
             * @param {Object[]} layerArray - the untyped layer objects
             * @returns {List<Layer>} - the layer list
             */
            createLayerList: function (layerArray) {
                var layers = new List({ idProperty: "id" }), l, i, length = layerArray.length;
                for (i = 0; i < length; i++) {
                    l = layerArray[i];
                    layers.addElement(new Layer({
                        id: l.id,
                        name: l.name,
                        layerName: l.layerName,
                        type: l.type,
                        url: l.url,
                        preview: l.preview,
                        bounding: new Bounding(l.bounding)
                    }));
                }
                return layers;
            },
            /** @param {Object[]} layerConfigurationArray - the untyped layer configuration object */
            createLayerConfigurationList: function (layerConfigurationArray) {
                var layerConfigurations = new List({ idProperty: "id" }), l, i, length = layerConfigurationArray.length;
                for (i = 0; i < length; i++) {
                    l = layerConfigurationArray[i];
                    layerConfigurations.addElement(new LayerConfiguration(l));
                }
                return layerConfigurations;
            },
            /**
             * @param {List<Map>} maps - the maps
             * @param {List<LayerConfiguration>} layerConfiguration - the configured layer
             */
            getActiveMaps: function (maps, layerConfiguration) {
                var activeMaps = new List({ idProperty: "id" });
                maps.forEachElement(function (map) {
                    var increment = 0;
                    map.layers.forEachElement(function (layer) {
                        layerConfiguration.forEachElement(function (layerConfiguration) {
                            if (layer.id === layerConfiguration.layerName) {
                                increment++;
                            }
                        });
                    });
                    if (increment === map.layers.length) {
                        activeMaps.addElement(map);
                    }
                });
                return activeMaps;
            },
            /**
             * @param {Object[]} incidentArray - the untyped incident objects
             * @returns {List<Incident>} - the incident list
             */
            createIncidentList: function (incidentArray) {
                var incidents = new List({ idProperty: "id" }), incident, i, length = incidentArray.length;
                for (i = 0; i < length; i++) {
                    incident = incidentArray[i];
                    incidents.addElement(new Incident(incident));
                }
                return incidents;
            }
        };
    });