<template>
    <div class="container">
        <div class="video-wrapper">
            <video ref="videoRef" muted autoplay></video>
            <div v-if="!hasVideoInput" class="tips">
                {{ tips }}
            </div>
            <div class="bottom-wrapper">
                <MicroButton :disabled="hasAudioInput" :volume="volume" @open="openMicro" @close="closeMicro" />
                <VideoButton :disabled="hasVideoInput" @open="openCamera" @close="closeCamera" />
            </div>
        </div>
    </div>
</template>

<script setup>
import MicroButton from './components/MicroButton.vue';
import VideoButton from './components/VideoButton.vue';

import { useDevice } from './use-device';
const { tips, videoRef, hasAudioInput, hasVideoInput, openMicro, closeMicro, openCamera, closeCamera, volume } = useDevice();
</script>

<style scoped lang="scss">
.video-wrapper {
    width: 800px;
    height: 450px;
    background-color: #000;
    position: relative;

    video {
        width: 800px;
        height: 450px;
        object-fit: cover;
    }

    .bottom-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        gap: 15px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        border: 1px dashed white;
    }
}

.tips {
    position: absolute;
    text-align: center;
    top: 50%;
    color: white;
    width: 100%;
    font-size: 18px;
}
</style>