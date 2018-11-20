<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

const TAG_NAME = 'amap-satellite';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            satellite : null
        }
    },
    props : {
        zIndex : {
            type : Number,
            require : false,
        },
        opacity : {
            type : Number,
            require : false
        },
        zooms : {
            type : Array,
            require : false
        },
        detectRetina : {
            type : Boolean,
            require : false
        },
        isShow : {
            type : Boolean,
            require : false,
            default : false
        }
    },
    watch : {
       '$parent.mapObj' () {
            if( !this.isShow ){
                return ;
            }
            this.initSatellite()
        },

        isShow () {
            let self = this;
            if( self.satellite == null ) {
                self.initSatellite();
                return false;
            }
            self.isShow == true ? self.showSatellite() : self.hideSatellite();
        },

        satellite () {
            let self = this;
            if(self.satellite == null) {
                self.initSatellite();
                return false;
            }

            self.isShow == true ? self.showSatellite() : self.hideSatellite();
        }

    },
    methods:{
        initSatellite () {
            let self = this;
            let mapObj = self.$parent.mapObj;
            let AMap = self.$parent.AMap;
            if( !mapObj || !AMap) return false;
            let options = {
                map : mapObj,
                zIndex : self.zIndex,
                opacity : self.opacity,
                zooms : self.zooms,
                detectRetina : self.detectRetina
            };
            self.satellite = new AMap.TileLayer.Satellite(options);
            self.satellite.hide();
        },
        showSatellite () {
            let self = this;
            if( self.satellite == null ) return;
            self.satellite.show();
        },
        hideSatellite () {
            let self = this;
            if( self.satellite == null ) return;
            self.satellite.hide();
        }
    }

}
</script>
        