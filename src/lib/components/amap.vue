<template>
    <div class="amap-container" :id="vid">
        <slot></slot>
    </div>
</template>

<script>

const TAG_NAME = 'amap';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            AMap : null,
            AMapUI : null,
            mapObj : null,
        }
    },
    props : {
        vid : {
            type : String,
            require : true
        },
        mapKey : {
            type : String,
            require : true
        },
        mapVersion : {
            type : String,
            require : true
        },
        center : {
            type : [Array, String, Object],
            require : false
        },
        zoom : {
            type : Number,
            require : false
        },
        zooms : {
            type : Array,
            require : false
        },
        mapStyle : {
            type : String,
            require : false,
            default : "amap://styles/normal"
        },
        features : {
            type : Array,
            require : false,
            default : () => {
                return ['bg', 'point', 'road', 'building'];
            }
        },
        resizeEnable : {
            type : Boolean,
            require : false,
            default : true
        },

    },
    watch : {
        mapObj () {
            let self = this;
            self.mapObj.on("complete", function(){
                self.$emit('complete', self);
            });
            self.mapObj.on("click", function(){
                self.$emit('click', self);
            });
            self.mapObj.on("dblclick", function(){
                self.$emit('dblclick', self);
            });
            self.mapObj.on("mapmove", function(){
                self.$emit('mapmove', self);
            });
            self.mapObj.on("hotspotclick", function(){
                self.$emit('hotspotclick', self);
            });
            self.mapObj.on("hotspotover", function(){
                self.$emit('hotspotover', self);
            });
            self.mapObj.on("hotspotout", function(){
                self.$emit('hotspotout', self);
            });
            self.mapObj.on("movestart", function(){
                self.$emit('movestart', self);
            });
            self.mapObj.on("moveend", function(){
                self.$emit('moveend', self);
            });
            self.mapObj.on("zoomchange", function(){
                self.$emit('zoomchange', self);
            });
            self.mapObj.on("zoomstart", function(){
                self.$emit('zoomstart', self);
            });
            self.mapObj.on("zoomend", function(){
                self.$emit('zoomend', self);
            });
            self.mapObj.on("mousemove", function(){
                self.$emit('mousemove', self);
            });
            self.mapObj.on("mousewheel", function(){
                self.$emit('mousewheel', self);
            });
            self.mapObj.on("mouseover", function(){
                self.$emit('mouseover', self);
            });
            self.mapObj.on("mouseout", function(){
                self.$emit('mouseout', self);
            });
            self.mapObj.on("mouseup", function(){
                self.$emit('mouseup', self);
            });
            self.mapObj.on("mousedown", function(){
                self.$emit('mousedown', self);
            });
            self.mapObj.on("rightclick", function(){
                self.$emit('rightclick', self);
            });
            self.mapObj.on("dragstart", function(){
                self.$emit('dragstart', self);
            });
            self.mapObj.on("dragging", function(){
                self.$emit('dragging', self);
            });
            self.mapObj.on("dragend", function(){
                self.$emit('dragend', self);
            });
            self.mapObj.on("resize", function(){
                self.$emit('resize', self);
            });
            self.mapObj.on("touchstart", function(){
                self.$emit('touchstart', self);
            });
            self.mapObj.on("touchmove", function(){
                self.$emit('touchmove', self);
            });
            self.mapObj.on("touchend", function(){
                self.$emit('touchend', self);
            });
        } 
    },
    methods:{
        // 实例化地图
        initMap () {
            // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            let AMapUI = this.AMapUI = window.AMapUI
            let AMap = this.AMap = window.AMap
            
            let mapConfig = {
                center: this.center,
                zoom: this.zoom,
                zooms: this.zooms,
                mapStyle: this.mapStyle,
                features: this.features,
                resizeEnable: this.resizeEnable,
            }
            this.$nextTick(function(){
                let elementId = document.getElementById(this.vid);  
                let mapObj = new AMap.Map(elementId, mapConfig);
                this.$emit('input', mapObj);
                this.mapObj = mapObj
            })
        },
        remoteLoad (url, hasCallback) {
            return createScript(url)
            /**
             * 创建script
             * @param url
             * @returns {Promise}
             */
            function createScript (url) {
            let scriptElement = document.createElement('script')
            document.body.appendChild(scriptElement)
            let promise = new Promise((resolve, reject) => {
                scriptElement.addEventListener('load', e => {
                removeScript(scriptElement)
                if (!hasCallback) {
                    resolve(e)
                }
                }, false)
        
                scriptElement.addEventListener('error', e => {
                removeScript(scriptElement)
                reject(e)
                }, false)
        
                if (hasCallback) {
                window.____callback____ = function () {
                    resolve()
                    window.____callback____ = null
                }
                }
            })
        
            if (hasCallback) {
                url += '&callback=____callback____'
            }
        
            scriptElement.src = url
        
            return promise
            }
        
            /**
             * 移除script标签
             * @param scriptElement script dom
             */
            function removeScript (scriptElement) {
            document.body.removeChild(scriptElement)
            }
        },

        /**
         * 获取屏幕中心点
         */
        $$getCenter(){
            let result = this.mapObj.getCenter();
            return [result.lng, result.lat];
        },

        /**
         * 获取当前地图层级
         */
        $$getZoom(){
            return this.mapObj.getZoom();
        },

        /**
         * 根据覆盖物调整地图范围
         * @param overlays String | Array 
         */
        $$setFitView(overlays=null){
            this.mapObj.setFitView(overlays);
        },
        $$getAllOverlays(overlays=null){
            return this.mapObj.getAllOverlays(overlays);
        },

    },
    async created () {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.initMap()
        // 未载入高德地图API，则先载入API再初始化
        } else {
            await this.remoteLoad(`http://webapi.amap.com/maps?v=${this.mapVersion}&key=${this.mapKey}`)
            await this.remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
            this.initMap()
        }
    }

}
</script>
        