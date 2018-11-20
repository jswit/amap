<template>
</template>
<script>
const TAG_NAME = 'amap-pointsimplifier';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            pointSimplifierIns : null
        }
    },
    props : {
        pointData:{
            type : Array,
            required : true,
            default : () => {
                return []
            }
        },
        zIndex : {
            type : Number,
            required : false,
            default : 300
        },
        autoSetFitView : {
            type : Boolean,
            required : false,
            default : true
        },
        pointHeight : {
            type : Number,
            required : false,
            default : 15
        },
        pointWidth : {
            type : Number,
            required : false,
            default : 15
        },
        pointStrokeStyle : {
            type : String,
            required : false,
            default : "white"
        },
        pointLineWidth : {
            type : Number,
            required : false,
            default : 2
        },


    },
    mounted() {
        if( this.pointData.length == 0) {
            return;
        }
        this.initPointSimplifier();

    },
    watch:{
        '$parent.mapObj' () {
            if( this.pointData.length == 0) {
                return;
            }
            this.initPointSimplifier();
        },
        pointData () {
            let self = this;
            if(self.pointData.length === 0){
                if(self.pointSimplifierIns == null){
                    return ;
                }
                self.pointSimplifierIns.setData([]);
                return ; 
            }

            if(self.pointSimplifierIns == null){
                self.initPointSimplifier();
                return ;
            }
            self.setPointData();

        },


        pointSimplifierIns () {
            let self = this;
            self.setPointData();

            self.pointSimplifierIns.on( 'pointClick', function(e, record){
                self.$emit('pointClick', record.data);
            })
            self.pointSimplifierIns.on( 'pointMouseover', function(e, record){
                self.$emit('pointMouseover', record);
            })
        }
        
    },
    
    methods:{
        /**
         * 初始化海量点
         */
        initPointSimplifier () {
            let self = this;
            this.$parent.AMapUI.loadUI(['misc/PointSimplifier'], function(PointSimplifier) {
                if (!PointSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }
                self.pointSimplifierIns = new PointSimplifier({
                    map : self.$parent.mapObj,
                    zIndex: self.zIndex,
                    autoSetFitView: self.autoSetFitView, // 取消地图视野自适应
                    compareDataItem: function(a, b, aIndex, bIndex) {
                        //数据源中靠后的元素优先，index大的排到前面去
                        return aIndex > bIndex ? -1 : 1;
                    },
                    getPosition: function(dataItem) {
                        //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
                        return dataItem.position;
                    },
                    getHoverTitle: function(dataItem, idx) {
                        //返回数据项的Title信息，鼠标hover时显示
                        return dataItem.name;
                    },

                    renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,

                    renderOptions: {
                        //点的样式
                        pointStyle: {
                            width: self.pointWidth,
                            height: self.pointHeight,
                            fillStyle: 'blue' //蓝色填充
                        },
                        getGroupId: function(dataItem, idx) {
                            return dataItem.color;
                        },
                        groupStyleOptions: function(color) {
                            return {
                                pointStyle: {
                                    fillStyle : color,
                                    strokeStyle : self.pointStrokeStyle,
                                    lineWidth : self.pointLineWidth
                                }
                            };
                        },
                    }

                })
            })
        },

        /**
         * 海量点实例赋值
         */
        setPointData () {
            let self = this;
            let data = [];
            
            self.pointData.forEach( function( item, index ) {
                data.push({
                    id : item.id,
                    name : item.name,
                    color : item.color,
                    position : item.point,
                    coordinates : item.coordinates
                });
            });
            
            self.pointSimplifierIns.setData( data );
        },
       
    }
}
</script>
        