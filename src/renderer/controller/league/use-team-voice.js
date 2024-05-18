import { useRecoilValue, useSetRecoilState } from 'recoil';
import { leagueStatusState, myTeamSummonersState, normalGameRoomIdState, summonerState } from '../../@store/league';
import useVoiceChat from '../voice/use-voice-chat';
import { connectMediaSocket } from '../../utils/socket';

function useTeamVoice() {
  const setLeagueStatus = useSetRecoilState(leagueStatusState);
  const summoner = useRecoilValue(summonerState);
  const setMyTeamSummoners = useSetRecoilState(myTeamSummonersState);
  const normalGameRoomId = useRecoilValue(normalGameRoomIdState);

  const { connect } = useVoiceChat({ newConsumerCallback: joinTeamSummoner });

  function joinTeamSummoner(puuid) {
    setMyTeamSummoners((prev) =>
      prev ? [...prev.map((summoner) => {
        if (summoner.puuid === puuid) {
          return { ...summoner, isShow: true };
        }
        return summoner;
      })] : null);
  }

  function leaveTeamSummoner(puuid) {
    setMyTeamSummoners((prev) =>
      prev ? [...prev.map((summoner) => {
        if (summoner.puuid === puuid) {
          return { ...summoner, isShow: false };
        }
        return summoner;
      })] : null);
  }

  function joinRoom(stream) {
    let isClosed = false;
    let disconnectAll;
    let closeConsumer;

    const socket = connectMediaSocket('/team-voice-chat');

    socket.emit(
      'team-join-room',
      { roomId: normalGameRoomId, puuid: summoner.puuid },
      ({ rtpCapabilities }) => {
        const params = {
          socket: socket,
          stream: stream,
          rtpCapabilities: rtpCapabilities,
          roomId: normalGameRoomId,
        };
        const voiceChat = connect(params);

        disconnectAll = voiceChat.disconnectAll;
        closeConsumer = voiceChat.closeConsumer;
      }
    );

    /* 팀원 나감 */
    socket.on('inform-exit-in-game', ({ puuid }) => {
      closeConsumer(puuid);
      leaveTeamSummoner(puuid);
    });

    /* 게임 시작 */
    window.ipcRenderer.once('start-in-game', () => { });

    /* 게임 끝남 */
    window.ipcRenderer.once('end-of-the-game', () => {
      disconnectVoiceChat();
    });

    /* 게임 방 떠남 */
    window.ipcRenderer.once('exit-in-game', () => {
      disconnectVoiceChat();
    });

    function disconnectVoiceChat() {
      if (!isClosed) {
        isClosed = true;
        setLeagueStatus('none');
        setMyTeamSummoners(null);
        disconnectAll();
      }
    };
  };

  return { joinRoom };
}

export default useTeamVoice;