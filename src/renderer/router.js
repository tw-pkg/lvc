import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATH } from '../renderer/constants/path';
import useLeague from './controller/league/use-league';
import TeamVoiceRoom from './components/voice/team-voice-room';
import GlobalChatRoom from './components/chat/global-chat-room';

function Router() {
  useLeague();

  return (
    <Routes>
      <Route path={PATH.GLOBAL_CHAT} element={<GlobalChatRoom />} />
      <Route path={PATH.TEAM_VOICE_ROOM} element={<TeamVoiceRoom />} />
    </Routes>
  );
}

export default Router;
