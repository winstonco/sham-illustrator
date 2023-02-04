import { Stack, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import socket from './helpers/getSocket';
import { useLobby } from './hooks/useLobby';
import { useCanvas } from './hooks/useCanvas';

export default function App() {
  const [role, setRole] = useState<string>('Real');
  const [prompt, setPrompt] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const { lobbyName, setLobbyName, createLobby, leaveLobby } = useLobby();

  useEffect(() => {
    socket.on('connect', () => {
      // console.log(`Socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      useCanvas(socket.id)[1]();
    });

    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
    };
  }, []);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1}>
        <div className="App">
          <h1 onClick={() => leaveLobby()} style={{ cursor: 'pointer' }}>
            <span
              style={{ textDecoration: 'line-through', color: 'lightgray' }}
            >
              Fake Artist
            </span>{' '}
            Sham Illustrator
          </h1>
          <Outlet
            context={{
              roleContext: [role, setRole],
              promptContext: [prompt, setPrompt],
              playerNameContext: [playerName, setPlayerName],
            }}
          />
        </div>
      </Stack>
    </Container>
  );
}

type ContextType = {
  roleContext: [string, React.Dispatch<React.SetStateAction<string>>];
  promptContext: [string, React.Dispatch<React.SetStateAction<string>>];
  playerNameContext: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const useRole = () => {
  const { roleContext } = useOutletContext<ContextType>();
  return roleContext;
};

export const usePrompt = () => {
  const { promptContext } = useOutletContext<ContextType>();
  return promptContext;
};

export const usePlayerName = () => {
  const { playerNameContext } = useOutletContext<ContextType>();
  return playerNameContext;
};
