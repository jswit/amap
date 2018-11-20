<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
const TAG_NAME = 'amap-polygon';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            polygon: null,
        }
    },
    props : {
        path : {
            type : Array,
            required : true,
            default : () => {
                return [];
            }
        },
        zIndex : {
            type : Number,
            required : false,
            default : 10
        },
        strokeColor : {
            type : String,
            required : false,
            default : "#006600"
        },
        strokeOpacity : {
            type : Number,
            required : false
        },
        strokeWeight : {
            type : Number,
            required : false,
            default : 1
        },
        strokeStyle : {
            type : String,
            required : false,
            default : "solid"
        },
        fillColor : {
            type : String,
            required : false,
            default : ""
        },
        fillOpacity : {
            type : Number,
            required : false
        },
        draggable : {
            type : Boolean,
            required : false,
            default : false
        },
        extData : {
            type : [Number, String, Array, Object, Boolean, Function],
            required : false
        },
        bubble : {
            type : Boolean,
            required : false,
            default : false
        },
    },
    mounted() {
        this.initPolygon()
    },
    updated(){
        console.log(this.path);
    },
    watch:{
        '$parent.mapObj' () {
            this.initPolygon()
        },
        path(){
        },
        polygon () {
            let self = this;
            self.polygon.on('click', function(){
                self.$emit('click', self);
            });
            self.polygon.on('dblclick', function(){
                self.$emit('dblclick', self);
            });
            self.polygon.on('mouseover', function(){
                self.$emit('mouseover', self);
            });
            self.polygon.on('mouseout', function(){
                self.$emit('mouseout', self);
            });
            self.polygon.on('rightclick', function(){
                self.$emit('rightclick', self);
            });
            self.polygon.on('mousedown', function(){
                self.$emit('mousedown', self);
            });
            self.polygon.on('mouseup', function(){
                self.$emit('mouseup', self);
            });
            self.polygon.on('touchstart', function(){
                self.$emit('touchstart', self);
            });
            self.polygon.on('touchmove', function(){
                self.$emit('touchmove', self);
            });
            self.polygon.on('touchend', function(){
                self.$emit('touchend', self);
            });
        }
    },
    
    methods:{
        initPolygon(){
            let mapObj = this.$parent.mapObj;
            if( !mapObj ) return false;
            let options = {
                path : this.path,
                zIndex : this.zIndex,
                strokeColor : this.strokeColor,
                strokeOpacity : this.strokeOpacity,
                strokeWeight : this.strokeWeight,
                strokeStyle : this.strokeStyle,
                fillColor : this.fillColor,
                fillOpacity : this.fillOpacity,
                draggable : this.draggable,
                extData : this.extData,
                bubble : this.bubble
            };
            let polygon = new this.$parent.AMap.Polygon(options)
            polygon.setMap(this.$parent.mapObj);
            if(typeof this.$parent.zoom === 'undefined') this.$parent.$$setFitView();
            this.polygon = polygon;
        },

        drillDown(){
            let self = this;
        },

    }
}
</script>
        