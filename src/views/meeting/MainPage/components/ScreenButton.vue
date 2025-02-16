<template>
    <div>
        <div class="btn-item" @click="open">
            <el-icon>
                    <Monitor color="#fff" />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
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
</style>
