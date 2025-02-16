<template>
    <div class="main-container">
        <div class="content-wrapper">
            <div class="main-video">
                <video ref="videoRef" muted autoplay></video>
            </div>
            <div class="member-list"></div>
        </div>
        <div class="footer">
            <div class="btn-wrapper">
                <MicroButton :disabled="hasAudioInput" :volume="volume" @open="openMicro" @close="closeMicro" />
                <VideoButton :disabled="hasVideoInput" @open="openCamera" @close="closeCamera" />
                <ScreenButton @open="openScreen" @close="CloseScreen" />
            </div>
        </div>
    </div>
</template>

<script setup>
import MicroButton from './components/MicroButton.vue';
import VideoButton from './components/VideoButton.vue';
import ScreenButton from './components/ScreenButton.vue';
import { useDevice } from './use-device';

const {
    openCamera,
    closeCamera,
    openMicro,
    closeMicro,
    hasAudioInput,
    hasVideoInput,
    videoRef,
    tips,
    volume,
    openScreen,
    CloseScreen,
} = useDevice();
</script>

<style>
.main-container {
    width: 100%;
    height: 100vh;
    background-color: #000;
}
</style>