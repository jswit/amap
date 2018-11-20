<template>
</template>
<script>
const TAG_NAME = 'amap-text';
export default {
    name : TAG_NAME,
    data:function(){
        return {
            textMarker : null
        }
    },
    props : {
        topWhenClick : {
            type : Boolean,
            required : false,
            default : false
        },
        bubble : {
            type : Boolean,
            required : false,
            default : false
        },
        autoRotation : {
            type : Boolean,
            required : false,
            default : false
        },
        extData : {
            type : [Number, String, Array, Object, Boolean, Function],
            required : false
        },
        text : {
            type : String,
            required : true,
            default : ""
        },
        textAlign : {
            type : String,
            required : false,
            default : "center"
        },
        verticalAlign : {
            type : String,
            required : false,
            default : "middle"
        },
        position : {
            type : [Array, Object, String],
            required : false
        },
        offset : {
            type : Object,
            required : false,
            default : () => {
                return {x:0,y:0}
            }
        },
        draggable : {
            type : Boolean,
            required : false,
            default : false
        },    
        raiseOnDrag : {
            type : Boolean,
            required : false,
            default : false
        },    
        cursor : {
            type : String,
            required : false,
            default : ""
        },    
        visible : {
            type : Boolean,
            required : false,
            default : true
        },
        zIndex : {
            type : Number,
            required : false,
            default : 100
        },
        angle : {
            type : Number,
            required : false,
            default : 0
        },
        animation : {
            type : String,
            required : false,
            default : "AMAP_ANIMATION_NONE"
        },
        shadow : {
            type : [Number, String, Array, Object, Boolean, Function],
            required : false,
        },
        title : {
            type : String,
            required : false,
            default : ""
        },
        clickable : {
            type : Boolean,
            required : false,
            default : true
        },
        textStyle : {
            type : Object,
            required : false,
            default : () => {
                return {};
            }
        }
    },
    mounted() {
        this.initTextMarker()
    },
    watch:{
        '$parent.mapObj' () {
            this.initTextMarker();
        },
        text(){
        },

        textMarker () {
            let self = this;
            self.textMarker.on('click', function(){
                self.$emit('click', self);
            });
            self.textMarker.on('dblclick', function(){
                self.$emit('dblclick', self);
            });
            self.textMarker.on('mouseover', function(){
                self.$emit('mouseover', self);
            });
            self.textMarker.on('mouseout', function(){
                self.$emit('mouseout', self);
            });
            self.textMarker.on('rightclick', function(){
                self.$emit('rightclick', self);
            });
            self.textMarker.on('mousedown', function(){
                self.$emit('mousedown', self);
            });
            self.textMarker.on('mouseup', function(){
                self.$emit('mouseup', self);
            });
            self.textMarker.on('touchstart', function(){
                self.$emit('touchstart', self);
            });
            self.textMarker.on('touchmove', function(){
                self.$emit('touchmove', self);
            });
            self.textMarker.on('touchend', function(){
                self.$emit('touchend', self);
            });
        }
        
    },
    
    methods:{
        initTextMarker(){
            let mapObj = this.$parent.mapObj;
            if(!mapObj)return false;
            let options = {
                topWhenClick : this.topWhenClick,
                bubble : this.bubble,
                autoRotation : this.autoRotation,
                extData : this.extData,
                text : this.text,
                textAlign : this.textAlign,
                verticalAlign : this.verticalAlign,
                position : this.position,
                offset : this.offset,
                draggable : this.draggable,
                raiseOnDrag : this.raiseOnDrag,
                cursor : this.cursor,
                visible : this.visible,
                zIndex : this.zIndex,
                angle : this.angle,
                animation : this.animation,
                shadow : this.shadow,
                title : this.title,
                clickable : this.clickable,
                style: this.textStyle,
            };
            let text = new this.$parent.AMap.Text(options)
            text.setMap(this.$parent.mapObj);
            
            this.textMarker = text;
        }
    }
}
</script>
        