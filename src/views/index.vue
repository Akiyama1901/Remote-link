<template>
    <div>
        <ReadtPage v-if="actCard === 'Ready'" />
        <MainPage v-else />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ReadtPage from './meeting/ReadyPage/index.vue';
import MainPage from './meeting/MainPage/index.vue';
const actCard = ref('Main');
</script>

<style scoped lang="scss"></style>