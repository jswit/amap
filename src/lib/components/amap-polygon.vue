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
    props : [
        'path',
        'zIndex',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'fillColor',
        'fillOpacity',
        'extData',
        'strokeStyle',
        'draggable',
        'bubble',
    ],
    muonted() {
        
    },
    watch:{
        '$parent.mapObj' () {
            let mapObj = this.$parent.mapObj;
            let options = {
                path: this.path,
                zIndex: this.zIndex || 10,
                strokeColor: this.strokeColor || "#006600",
                strokeOpacity: this.strokeOpacity || 0.9,
                strokeWeight: this.strokeWeight || 1,
                strokeStyle: this.strokeStyle || "solid",
                fillColor: this.fillColor || "",
                fillOpacity: this.fillOpacity || 0.9,
                draggable: this.draggable || false,
                extData: this.extData || null,
                bubble: this.bubble || false
            };
            let polygon = new this.$parent.AMap.Polygon(options)
            polygon.setMap(this.$parent.mapObj);
            
            if(typeof this.$parent.zoom === 'undefined') this.$parent.$$setFitView();
            this.polygon = polygon;
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
        drillDown(){
            let self = this;
        },

        setPolygonStyle(type){
            let options = {};
            switch(type){
                case "default" :
                    options = {
                        strokeStyle : "solid",
                        strokeColor : "#3366cc",
                        strokeOpacity : 1,
                        strokeWeight : 1,
                    };
                break;
                case "light" :
                    options = {
                        strokeStyle : "solid",
                        strokeColor : "#50E3C2",
                        strokeOpacity : 1,
                        strokeWeight : 1,
                        fillColor: "#50E3C2",
                        fillOpacity:"0.4"
                    };
                break;
                case "hover" :
                    options = {
                        strokeStyle : "dashed",
                        strokeColor : "#F5A623",
                        strokeOpacity : 1,
                        strokeWeight : 4,
                    };
                break;
            }
            this.polygon.setOptions(options);
        },
    }
}
</script>
        