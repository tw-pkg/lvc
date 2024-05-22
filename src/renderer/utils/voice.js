export async function getUserStream(userDeviceId) {
  const userStream = await getConnectedAudioDevices('input')
    .then(async (deviceList) => {
      let stream = null;
      let isExist = false;

      /* 현재 deviceId가 연결된 상태인지 검증 */
      if (userDeviceId !== 'default') {
        deviceList.map(({ deviceId }) => {
          if (userDeviceId === deviceId) {
            isExist = true;
          }
        });
      } else {
        isExist = true;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: isExist ? userDeviceId : 'default' },
        });
      } catch (err) {
        console.log('유저 미디어 스트림 획득 실패', err);
        stream = null;
      }

      return stream;
    });

  return userStream;
};

export function getSummonerAudio(puuid) {
  return document.getElementById(puuid + 'audio');
};

export async function getConnectedAudioDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'audio' + type);
};

export async function handleMicVisualizer(stream, isMuted, setVolume) {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  microphone.connect(analyser);
  analyser.fftSize = 256; // 256 ~ 2048
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const updateMicVolume = () => {
    analyser.getByteFrequencyData(dataArray);

    let total = 0;
    for (let i = 0; i < bufferLength; i++) {
      total += dataArray[i];
    }
    setVolume(isMuted ? 0 : total / bufferLength);
    requestAnimationFrame(updateMicVolume);
  };
  requestAnimationFrame(updateMicVolume);
};
