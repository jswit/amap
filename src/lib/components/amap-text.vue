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
        'events',

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

            if(typeof this.events === 'undefined'){
                this.textMarker = text;
                return false;
            }

            let events = Object.entries(this.events);
            for( event of events ){
                text.on(event[0], event[1]);
            }

        },

        textMarker () {
            
        }
        
        
    },
    
    methods:{
        
    }
}
</script>
        