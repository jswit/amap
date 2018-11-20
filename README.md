# bs-com-amap

## Usage
```
npm install @xinguang-data/bs-com-amap
```

```
import bsComAMap from '@xinguang-data/bs-com-amap'
import vue from 'vue'
vue.use( bsComAMap );
```

```
<template>
  	<div id="app">
    	<amap 
          vid="amap"
          class="amap"
          :mapKey="mapKey" 
          :mapVersion="mapVersion"
          :style="{width:'1920px',height:'1080px'}"
          :center="center"
          :mapStyle="mapStyle"
          :zoom="zoom"
          :zooms="zooms"
          :features="features"
          ref="map"
        >
    	</amap>
  	</div>
</template>
<script>
    export default {
        data() {
            return {
              mapKey : "4ffc625a75655e729a54f31f72362368",
              mapVersion : "1.4.10",
              center : [120.643809, 29.776266 ],
              mapStyle : "amap://styles/fresh",
              features : ["bg"],
              zoom : 10,
              zooms : [10, 15],
              resizeEnable : true,
            };
		},
    }
</script>
```
