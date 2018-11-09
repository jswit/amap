import amap from './lib/components/amap.vue';
import amapPolygon from './lib/components/amap-polygon.vue';
import amapText from './lib/components/amap-text.vue';

let components = [
    amap,
    amapPolygon,
    amapText,
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