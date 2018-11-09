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
    props : [
        'vid',
        'mapKey',
        'mapVersion',
        'center',
        'zoom',
        'zooms',
        'mapStyle',
        'resizeEnable',
        'features',
    ],

    methods:{
        // 实例化地图
        initMap () {
            // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            let AMapUI = this.AMapUI = window.AMapUI
            let AMap = this.AMap = window.AMap
            
            let mapConfig = {
                center: this.center || [],
                zoom: this.zoom,
                zooms: this.zooms,
                mapStyle: "amap://styles/" + this.mapStyle || "normal",
                features: this.features || ['bg', 'point', 'road', 'building'],
                resizeEnable: this.resizeEnable || true,
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
        }

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
        