import * as mediasoup from 'mediasoup-client';
import { useSetRecoilState } from 'recoil';
import { userStreamState } from '../../@store/voice';

function getSummonerAudio(summonerId) {
  return document.getElementById(summonerId.toString() + 'audio');
};

function useVoiceChat({ newConsumerCallback }) {
  const setUserStream = useSetRecoilState(userStreamState);

  function connect(params) {
    const { socket, stream, rtpCapabilities } = params;

    let device = new mediasoup.Device();
    let producerTransport = null;
    let consumerTransports = [];

    device
      .load({ routerRtpCapabilities: rtpCapabilities })
      .then(() => createSendTransport(stream.getAudioTracks()[0]))
      .catch((err) => console.log('디바이스 로드 에러', err));

    function createSendTransport(audioTrack) {
      socket.emit('create-producer-transport', (params) => {
        if (!device) return;

        producerTransport = device.createSendTransport(params);

        producerTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
          try {
            socket.emit('transport-connect', dtlsParameters);
            callback();
          } catch (err) {
            errback(err);
          }
        });
        producerTransport.on('produce', ({ kind, rtpParameters }, callback, errback) => {
          try {
            socket.emit('transport-produce', { kind, rtpParameters },
              (producer) => {
                if (producer.producersExist) {
                  getProducers();
                }
                callback({ id: producer.id });
              }
            );
          } catch (err) {
            errback(err);
          }
        });

        connectSendTransport(audioTrack);
      });
    };

    async function connectSendTransport(audioTrack) {
      if (!producerTransport || !audioTrack) return console.log('프로듀서 or 오디오 없음');

      producerTransport
        .produce({ track: audioTrack })
        .then((audioProducer) => {
          audioProducer.on('trackended', () => console.log('audio track ended'));
          audioProducer.on('transportclose', () => console.log('audio transport ended'));
        })
        .catch((err) => console.log('프로듀스 메서드 에러', err));
    };

    socket.on('new-producer', (newProducer) => {
      signalNewConsumerTransport(newProducer.id, newProducer.puuid);
    });

    function getProducers() {
      socket.emit('get-producers', (producers) => {
        producers.forEach((producer) => {
          signalNewConsumerTransport(producer.id, producer.puuid);
        });
      });
    };

    function signalNewConsumerTransport(remoteProducerId, newSummonerPuuid) {
      newConsumerCallback(newSummonerPuuid);

      socket.emit('create-consumer-transport', remoteProducerId);
      socket.on('complete-create-consumer-transport', (params) => {
        if (!device) return;

        const consumerTransport = device.createRecvTransport(params);

        consumerTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
          try {
            socket.emit('transport-recv-connect', {
              dtlsParameters,
              remoteProducerId,
            });
            callback();
          } catch (err) {
            errback(err);
          }
        });

        connectRecvTransport(newSummonerPuuid, remoteProducerId, consumerTransport);
      });
    };

    function connectRecvTransport(newSummonerPuuid, remoteProducerId, consumerTransport) {
      if (!device) return;

      socket.emit('consume',
        {
          rtpCapabilities: device.rtpCapabilities,
          remoteProducerId,
        },
        async ({ params }) => {
          const { id, producerId, kind, rtpParameters } = params;

          const consumer = await consumerTransport.consume(params);

          consumerTransports.push({
            puuid: newSummonerPuuid,
            remoteProducerId: remoteProducerId,
            remoteConsumerId: id,
            consumer: consumer,
            consumerTransport: consumerTransport,
          });

          const newSummoner = getSummonerAudio(newSummonerPuuid);
          newSummoner.srcObject = new MediaStream([consumer.track]);

          socket.emit('consumer-resume', remoteProducerId);
        }
      );
    };

    function closeConsumer(puuid) {
      consumerTransports = consumerTransports
        .filter((summoner) => {
          if (summoner.puuid === puuid) {
            summoner.consumer.close();
            summoner.consumerTransport.close();
            return false;
          }
          return true;
        });
    };

    // 두번 호출되면 안됨
    function disconnectAll() {
      socket.disconnect();

      if (stream) {
        producerTransport?.close();
        producerTransport = null;
        stream.getTracks().forEach((track) => track.stop());
        setUserStream(null);
      }

      consumerTransports?.map(({ consumer, consumerTransport }) => {
        consumer.close();
        consumerTransport.close();
      });
      consumerTransports = [];
    };

    return { closeConsumer, disconnectAll, producerTransport, consumerTransports };
  };

  return { connect };
}

export default useVoiceChat;