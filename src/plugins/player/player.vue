<template>
  <section class="player">
    <video controlsList="nodownload" class="player-video" width="100%" height="100%" ref="video" :src="src" :poster="poster" :muted="muted" :preload="preload" :autoPlay="autoPlay" 
      @loadstart="handleLoadStart" 
      @waiting="handleWaiting" 
      @canplay="handleCanPlay"
        
      @canplaythrough="handleCanPlayThrough" 
      @playing="handlePlaying" 
      @ended="handleEnded" 
      @seeking="handleSeeking" 
      @seeked="handleSeeked" 
      @play="handlePlay" 
      @pause="handlePause" 
      @progress="handleProgress" 
      @durationchange="handleDurationChange" 
      @error="handleError"
      
      @suspend="handleSuspend" 
      @abort="handleAbort" 
      @emptied="handleEmptied" 
      @stalled="handleStalled" 
      @loadedmetadata="handleLoadedMetaData" 
      @loadeddata="handleLoadedData" 
      @timeupdate="handleTimeUpdate" 
      @ratechange="handleRateChange" 
      @volumechange="handleVolumeChange"
      
      playsinline="true"
      webkit-playsinline="true"
    >
      {{children}}
    </video>
    <div class="player-controls" @click="handleControlsClick">
      <transition name="fade-out" v-if="controlsDisplay">
        <div class="controls-main">
          <div class="controls-top">
            <div class="keys">
            </div>
          </div>
          <div class="controls-center">
            <div v-if="playing" @click="togglePlay" class="icon-pause"></div>
            <div v-else @click="togglePlay" class="icon-play"></div>
          </div>
          <div class="controls-bottom">
            <div class="current">
              <div class="current-time">{{secondsFormat(currentTime)}}</div>
            </div>
            <div class="process">
              <div class="process-total"></div>
              <div class="process-buffered" :style="{width: processBuffered}"></div>
              <div class="process-current" :style="{width: processCurrent}">
              </div>
              <div class="process-dot" :style="{marginLeft: processCurrent}"></div>
            </div>
            <div class="total">
              <div class="total-time">{{secondsFormat(duration)}}</div>
            </div>
            <div class="keys">
              <div class="key-fullscreen" @click="handleFullScreen">
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div v-else class="controls-sub">
        <div class="process-buffered" :style="{width: processBuffered}"></div>
        <div class="process-current" :style="{width: processCurrent}">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {secondsFormat} from '../../utils'
  export default {
    name: 'player',
    props: {
      video: {
        type: Object,
        default: () => {}
      },
      params: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        src: '',
        poster: '',
        width: 0,
        heihgt: 0,
        muted: false,
        preload: false,
        autoPlay: false,
        loop: false,
        children: '',
        loading: false,
        playing: false,
        played: false,
        controlsDisplay: true,
        currentTime: 0,
        duration: 0,
        buffered: 0,

        controlsTimer: null,
      }
    },
    computed: {
      processBuffered() {
        return this.buffered * 100 / this.duration + '%'
      },
      processCurrent() {
        return this.currentTime * 100 / this.duration + '%'
      }
    },
    watch: {
      video: function(newVal) {
        if (newVal) {
          this.src = newVal.src;
          this.poster = newVal.poster;
          this.children = newVal.children || newVal.childNodes;
          newVal.dataset['duration'] && (this.duration = newVal.dataset['duration']/1000);
          newVal.width && (this.width = newVal.width);
          newVal.height && (this.height = newVal.height);
          console.log('video1.duration',newVal.dataset['duration'])
        }
      },
      params(newVal) {
        if (newVal) {
          this.muted = newVal.muted;
          this.preload = true//newVal.preload;
          this.autoPlay = false//newVal.autoPlay;
          this.loop = newVal.loop;
        }
      }
    },
    methods: {
      handleLoadStart() {
        console.log('Video:handleLoadStart')
      },
  
      handleWaiting() {
        console.log('Video:handleWaiting')
        this.loading = true;
      },
  
      handleCanPlay() {
        console.log('Video:handleCanPlay')
        this.loading = false;
      },
  
      handleCanPlayThrough() {
        console.log('Video:handleCanPlayThrough')
      },
  
      handlePlaying() {
        console.log('Video:handlePlaying')
      },
  
      handleEnded() {
        console.log('Video:handleEnded')
        this.showControls();
        clearTimeout(this.controlsTimer)
      },
  
      handleSeeking() {
        console.log('Video:handleSeeking')
      },
  
      handleSeeked() {
        console.log('Video:handleSeeked')
      },
  
      handlePlay() {
        console.log('Video:handlePlay')
        this.hasPlay = true;
        this.playing = true;
        this.hideControls(500);
      },
  
      handlePause() {
        console.log('Video:handlePause')
        this.loading = false;
        this.playing = false;
        this.showControls();
        clearTimeout(this.controlsTimer)
      },
      handleProgress() {
        console.log('Video:handleProgress')
        // const {
        //   buffered
        // } = this.$refs.video
        // if (buffered.length > 0) {
        //   this.buffered = buffered.end(buffered.length - 1)
        // }
      },
      handleDurationChange() {
        console.log('Video:handleDurationChange')
      },
      handleError() {
        console.log('Video:handleError')
      },
      handleSuspend() {
        console.log('Video:handleSuspend')
      },
      handleAbort() {
        console.log('Video:handleAbort')
      },
      handleEmptied() {
        console.log('Video:handleEmptied')
      },
      handleStalled() {
        console.log('Video:handleStalled')
      },
      handleLoadedMetaData() {
        console.log('Video:handleLoadedMetaData')
        const {
          currentTime,
          duration
        } = this.$refs.video
        this.currentTime = currentTime;
        duration && (this.duration = duration);
      },
      handleLoadedData() {
        console.log('Video:handleLoadedData')
      },
      handleTimeUpdate() {
        console.log('Video:handleTimeUpdate')
        const {
          buffered,
          currentTime,
          duration
        } = this.$refs.video
        this.currentTime = currentTime;
        duration && (this.duration = duration);
        if (buffered.length > 0) {
          this.buffered = buffered.end(buffered.length - 1)
        }
      },
      handleRateChange() {
        console.log('Video:handleRateChange')
      },
      handleVolumeChange() {
        console.log('Video:handleVolumeChange')
      },
  
      togglePlay() {
        console.log('Video:togglePlay')
        let video = this.$refs.video;
        if (this.$refs.video.paused) {
          video.play();
        } else {
          video.pause();
        }
      },
  
      toggleMute(e) {
        console.log('Video:toggleMute')
        if (this.muted) {
          this.$refs.video.muted = false;
        } else {
          this.$refs.video.muted = true;
        }
        this.muted = !this.muted;
      },
      handleControlsClick(e) {
        console.log('Video:handleControlsClick')
        if (!this.controlsDisplay) {
          this.showControls();
          this.hideControls();
        } else if (this.playing) {
          clearTimeout(this.controlsTimer)
          this.hideControls();
        }
      },
      handleFullScreen(e) {
        console.log('Video:handleFullScreen')
        let video = this.$refs.video;
        let fullScreenFun = video.webkitEnterFullscreen || video.webkitRequestFullScreen;
        fullScreenFun && fullScreenFun.call(video)
      },
      secondsFormat(time) {
        return secondsFormat(time)
      },
      showControls() {
        this.controlsDisplay = true
      },
      hideControls(time = 2e3) {
        this.controlsTimer = setTimeout(() => {
          this.controlsDisplay = false
        }, time)
      }
    },
    mounted() {
  
    }
  }
</script>

<style lang="less" scoped>
  .player {
    position: relative;
    &-controls {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 24pr;
      color: #fff;
    }
    .controls-main {
      position: relative;
      height: 100%;
    }
    .controls-sub {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2pr;
    }
    .player-video {
      display: block;
      background: #000;
      max-height: 100vh;
    }
    .controls-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 112pr;
      height: 112pr;
      margin: -56pr 0 0 -56pr;
      .icon-play {
        background: url(./images/icon-play.png) center no-repeat;
      }
      .icon-pause {
        background: url(./images/icon-pause.png) center no-repeat;
      }
      .icon-play, .icon-pause {
        background-size: 112pr 112pr;
        height: 100%;
      }
    }
    .controls-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80pr;
      padding: 0 10pr;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,.8))
    }
    .current, .total, .keys {
      margin: 0 10pr;
    }
    .current {
      min-width: 64pr;
    }
    .process {
      position: relative;
      flex-grow: 1;
      height: 4pr;
      margin: 0 10pr;
    }
    .process-total {
      width: 100%;
      height: 100%;
      border-radius: 10pr;
      background: rgba(255,255,255,.3);
    }
    .process-buffered, .process-current {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 10pr;
      background: rgba(255,255,255,.6);
    }
    .process-current {
      background: #fbd60a;
    }
    .process-dot {
      position: absolute;
      top: 50%;
      left: -10pr;
      width: 20pr;
      height: 20pr;
      margin-top: -10pr;
      border-radius: 20pr;
      background: #fff;
    }
    .key-fullscreen {
      width: 34pr;
      height: 34pr;
      background: url(./images/icon-fullscreen.png) center no-repeat;
      background-size: 34pr 34pr;
    }
    .fade-out-leave-active {
      transition: opacity 0.5s;
    }

    .fade-out-leave-active {
      opacity: 0;
    }
  }
</style>