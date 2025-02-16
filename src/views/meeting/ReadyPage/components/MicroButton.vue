<template>
    <div>
        <div v-if="!disabled" class="btn-item" @click="open">
            <el-icon>
                <Mute color="#fff" />
            </el-icon>
        </div>
        <div v-else class="btn-item" @click="close">
            <el-icon>
                <Microphone color="#fff" />
            </el-icon>
            <div class="box">
                <div class="value" :style="{ transform: `translateY(${16 * (1 - volume * 0.01)}px)` }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { translate } from 'element-plus';


const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    volume: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits(['open', 'close']);
function open() {
    emit('open');
}
function close() {
    emit('close');
}
</script>
<style scoped>
.btn-item {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.23);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
}

.box {
    width: 8px;
    height: 16px;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;

    .value {
        width: 8px;
        height: 16px;
        background-color: #67C23A;
    }
}
</style>
