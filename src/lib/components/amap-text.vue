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
    props : [
        'topWhenClick',
        'bubble',
        'autoRotation',
        'extData',
        'text',
        'textAlign',
        'verticalAlign',
        'position',
        'offset',
        'draggable',
        'raiseOnDrag',
        'cursor',
        'visible',
        'zIndex',
        'angle',
        'animation',
        'shadow',
        'title',
        'clickable',
        'textStyle',

    ],
    muonted () {
        
    },
    watch:{
        '$parent.mapObj' () {
            let mapObj = this.$parent.mapObj;
            let options = {
                topWhenClick : this.topWhenClick || false,
                bubble : this.bubble || false,
                autoRotation : this.autoRotation || false,
                extData : this.extData || null,
                text : this.text || '',
                textAlign : this.textAlign || 'center',
                verticalAlign : this.verticalAlign || 'middle',
                position : this.position || null,
                offset : this.offset || {x:0,y:0},
                draggable : this.draggable || false,
                raiseOnDrag : this.raiseOnDrag || false,
                cursor : this.cursor || '',
                visible : this.visible || true,
                zIndex : this.zIndex || 100,
                angle : this.angle || 0,
                animation : this.animation || "AMAP_ANIMATION_NONE",
                shadow : this.shadow || null,
                title : this.title || '',
                clickable : this.clickable || true,
                style: this.textStyle || {},
            };
            let text = new this.$parent.AMap.Text(options)
            text.setMap(this.$parent.mapObj);
            
            this.textMarker = text;
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
        
    }
}
</script>
        