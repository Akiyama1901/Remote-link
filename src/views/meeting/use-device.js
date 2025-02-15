import { ref } from "vue";
import { ElNotification } from "element-plus";

export function useDevice() {
  const videoRef = ref(null);
  const hasAudioInput = ref(false);
  const hasVideoInput = ref(false);
  let audioStream = null;
  let videoStream = null;
  const tips = ref("");

  async function init() {
    const device = await navigator.mediaDevices.enumerateDevices();
    console.log(device);
    const audioInput = device.find((item) => item.kind === "audioinput");
    const videoInput = device.find((item) => item.kind === "videoinput");
    hasAudioInput.value = !!audioInput?.deviceId;
    hasVideoInput.value = !!videoInput?.deviceId;
    if (hasVideoInput.value) {
      openCamera();
    } else {
      tips.value = "摄像头处于关闭状态";
    }
  }
  init();

  async function openMicro() {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      hasAudioInput.value = true;
    } catch (e) {
      console.log(e.name);

      // 异常处理
      let message = "";
      if (["NotAllowedError", "PermissionDeniedError"].includes(e.name)) {
        message = "请允许浏览器使用麦克风";
      } else if (["NotFoundError", "DevicesNotFoundError"].includes(e.name)) {
        message = "未检测到可用麦克风";
      } else if (["SourceUnavailableError"].includes(e.name)) {
        message = "麦克风被占用";
      }
      ElNotification({
        title: "打开麦克风失败",
        message,
        type: "warning",
      });
    }
  }

  function closeMicro() {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      audioStream = null;
    }
    hasAudioInput.value = false;
  }

  async function openCamera() {
    try {
      tips.value = "摄像头开启中...";
      videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.value.srcObject = videoStream;
      hasVideoInput.value = true;
    } catch (e) {
      console.log(e.name);

      // 异常处理
      let message = "";
      if (["NotAllowedError", "PermissionDeniedError"].includes(e.name)) {
        message = "请允许浏览器使用摄像头";
      } else if (["NotFoundError", "DevicesNotFoundError"].includes(e.name)) {
        message = "未检测到可用摄像头";
      } else if (["SourceUnavailableError"].includes(e.name)) {
        message = "摄像头被占用";
      }
      ElNotification({
        title: "打开摄像头失败",
        message,
        type: "warning",
      });
    }
  }

  function closeCamera() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      videoStream = null;
    }
    videoRef.value.srcObject = null;
    hasVideoInput.value = false;
    tips.value = "摄像头处于关闭状态";
  }

  return {
    openMicro,
    closeMicro,
    openCamera,
    closeCamera,
    hasAudioInput,
    hasVideoInput,
    videoRef,
    tips,
  };
}
