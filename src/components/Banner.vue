<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="str in listImg" >
				<a v-bind:href="str.slideUrl" :style="{ backgroundImage: 'url(' + str.img + ')' }"></a>
			</div>
		</div>
		
		<div class="swiper-pagination swiper-pagination-white"></div>
	</div>
</template>

<script>
import Swiper from 'swiper'
//import  'static/css/swiper.css'
export default {
  name: 'swiper-container',
  props: ['listImg'],
   mounted () {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      // loop: true,
      speed: 600,
      autoplay: 4000,
      observer: true,
      observeParents: true,
      onTouchEnd: function () {
        swiper.startAutoplay()
      }
    })
  }
} 

</script>

<style>
	.swiper-container {width: 100%;height: 4rem;margin: 0 auto;overflow: hidden;position: relative;z-index: 1;   }
	.swiper-wrapper {width: 100%;height: 100%;}
	.swiper-slide {background-position: center;background-size: cover;width: 100%;height: 100%;}
	.swiper-pagination{ position: absolute; bottom: 10%;  }
	.swiper-pagination-bullet { width: .25rem;height: .25rem;display: inline-block; border-radius: 100%; background: #fff;opacity: .2;}
    .swiper-pagination-bullet-active{background: #fff;opacity:1}
    .swiper-slide{float: left;}
	.swiper-wrapper { position: relative; width: 100%; height: 100%; z-index: 1; display: -webkit-box; display: -moz-box; display: -ms-flexbox;display: -webkit-flex;display: flex; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-transition-property: -webkit-transform; -moz-transition-property: -moz-transform; -o-transition-property: -o-transform;-ms-transition-property: -ms-transform;transition-property: transform; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box;}
	.swiper-slide {-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;transform-style: preserve-3d;-webkit-flex-shrink: 0; -ms-flex: 0 0 auto; flex-shrink: 0; width: 100%; height: 100%;position: relative;}
    .swiper-container img { display: block;}
    img { max-width: 100%; height: auto; border: none;interpolation-mode: bicubic;}
    .swiper-container-horizontal>.swiper-pagination {bottom: 10px; left: 0; width: 100%;}
    .swiper-pagination { position: absolute;text-align: center;  -webkit-transition: 300ms; -moz-transition: 300ms; -o-transition: 300ms;  transition: 300ms; -webkit-transform: translate3d(0,0,0); -ms-transform: translate3d(0,0,0); -o-transform: translate3d(0,0,0); transform: translate3d(0,0,0); z-index: 10;}
    .swiper-container-horizontal>.swiper-pagination .swiper-pagination-bullet { margin: 0 5px;}
    .swiper-slide a{width: 100%;height: 4rem; display: inline-block; background-size: 100% 4rem;}
    .swiper-slide a img{ width: 100%; height: 100%;}
</style>