import amap from './lib/components/amap.vue';
import amapPolygon from './lib/components/amap-polygon.vue';
import amapText from './lib/components/amap-text.vue';
import amapPointsimplifier from './lib/components/amap-pointsimplifier.vue';
import amapSatellite from './lib/components/amap-satellite.vue';
import amapHeatmap from './lib/components/amap-heatmap.vue';

let components = [
    amap,
    amapPolygon,
    amapText,
    amapPointsimplifier,
    amapSatellite,
    amapHeatmap
];

let VueAmap = {
}

VueAmap.install = Vue => {
    if ( VueAmap.installed ) return;

    components.map( cmp => {
        // register components;
        Vue.component( cmp.name, cmp );
    } )
}

export default VueAmap;