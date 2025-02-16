import { onUnmounted, ref } from "vue";
import { ElNotification } from "element-plus";

export function useDevice() {
  const videoRef = ref(null);
  const hasAudioInput = ref(false);
  const hasVideoInput = ref(false);
  let audioStream = null;
  let videoStream = null;
  const tips = ref("");
  const volume = ref(0);
  let AnimationId = null;

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
    if (hasAudioInput.value) {
      openMicro();
    }
  }
  init();

  async function openMicro() {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      hasAudioInput.value = true;
      watchMicro(audioStream);
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

  /**
   * 监听麦克风音量
   * @param  stream
   **/
  function watchMicro(stream) {
    //创建音频上下文
    const audioContext = new AudioContext();
    //麦克风声音传入
    const audioSource = audioContext.createMediaStreamSource(stream);
    //创建分析器
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.fftSize = 1024;
    //创建音量数据
    const bufferLength = analyser.frequencyBinCount;
    //获取音频数据
    const dataArray = new Uint8Array(bufferLength);
    function set() {
      analyser.getByteFrequencyData(dataArray);
      let value = 0;
      for (let i = 0; i < bufferLength; i++) {
        value += dataArray[i];
      }
      //平均音量
      value = (2 * value) / bufferLength;
      // console.log(value);
      volume.value = value > 100 ? 100 : value;
      AnimationId = requestAnimationFrame(set);
    }
    set();
  }

  function closeMicro() {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      audioStream = null;
    }
    hasAudioInput.value = false;
    cancelAnimationFrame(AnimationId);
  }

  onUnmounted(() => {
    cancelAnimationFrame(AnimationId);
  });

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
    volume,
  };
}
