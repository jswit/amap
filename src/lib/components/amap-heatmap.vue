<template>
</template>
<script>
const TAG_NAME = 'amap-heatmap';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            heatmap : null,
        }
    },
    props : {
        heatmapData : {
            type : Array,
            required : false,
            default : () => {
                return []
            }
        },
        radius :  {
            type : Number,
            required : false,
            default : 25
        },
        opacity :  {
            type : Array,
            required : false,
            default : () => {
                return [ 0, 0.8 ];
            }
        },
        gradient : {
            type : Object,
            required : false,
            default : () => {
                return { 
                    0.5: 'blue',
                    0.65: 'rgb(117,211,248)',
                    0.7: 'rgb(0, 255, 0)',
                    0.9: '#ffea00',
                    1.0: 'red'
                } 
            }
        },
        max : {
            type : Number,
            required : false,
        }

    },
    mounted() {
        if( this.heatmapData.length == 0) {
            return;
        }
        
        this.initHeatmap();

    },
    watch:{
        '$parent.mapObj' () {
            if( this.heatmapData.length == 0) {
                return;
            }
            this.initHeatmap();
        },
        heatmapData() {
            let self = this;
            

            if( self.heatmapData.length === 0 ) {
                if( self.heatmap != null ){
                    self.heatmap.setDataSet({});
                }
                return ;
            }
                
            self.initHeatmap();
        },
        
        heatmap () {
            console.log( this.heatmap )
            // this.heatmap.setDataSet({});
            
        }
    },
    
    methods:{
        async initHeatmap ( ) {
            let self = this;
            if( !self.isSupportCanvas() ){
                alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
                return;
            }

            let map = this.$parent.mapObj;
            
            let heatmap;
            map.plugin(["AMap.Heatmap"], function () {
                //初始化heatmap对象
                heatmap = new AMap.Heatmap(map, {
                    radius: self.radius, //给定半径
                    opacity: self.opacity,
                    gradient : self.gradient
                });
                //设置数据集：该数据为北京部分“公园”数据
                heatmap.setDataSet({
                    data: self.heatmapData,
                    max: self.max
                });
            });
            self.heatmap = heatmap;
        },
           //判断浏览区是否支持canvas
        isSupportCanvas () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        },
        
    }
}
</script>
        