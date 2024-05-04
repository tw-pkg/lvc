import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { leagueStatusState, summonerState } from '../../@store/league';

function useLeague() {
  const [leagueStatus, setLeagueStatus] = useRecoilState(leagueStatusState);
  const [summoner, setSummoner] = useRecoilState(summonerState);

  useEffect(() => {
    const onClient = (_, summoner) => {
      setSummoner(summoner);
      console.log('on-client');
    };
    const offClient = () => {
      setLeagueStatus('none');
      console.log('off-client');
    };

    // window.ipcRenderer.on('on-legue-client', onClient);
    // window.ipcRenderer.on('off-legue-client', offClient);

    return () => {
      // window.ipcRenderer.removeListener('on-legue-client', onClient);
      // window.ipcRenderer.removeListener('off-legue-client', offClient);
    };
  }, []);
}

export default useLeague;
