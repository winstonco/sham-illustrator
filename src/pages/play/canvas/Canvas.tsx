import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import CanvasDrawer from '../../../helpers/CanvasDrawer';

import socket from '../../../helpers/getSocket';
import { useCanvas } from '../../../hooks/useCanvas';

export default function Canvas({
  penSize,
  penColor,
}: {
  penSize: number;
  penColor: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  CanvasDrawer.setup(canvas);
  let drawing: boolean = false;

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (box.current) setCanvasWidth(box.current.offsetWidth);
  }, [canvasWidth]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    drawing = true;
    const { offsetX, offsetY } = event.nativeEvent;
    useCanvas(socket.id)[0].beginDrawing(offsetX, offsetY, penSize, penColor);
    socket.emit('beginDrawing', socket.id, offsetX, offsetY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (drawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      useCanvas(socket.id)[0].drawTo(offsetX, offsetY, penSize, penColor);
      socket.emit('drawTo', socket.id, offsetX, offsetY, penSize, penColor);
    }
  };

  const handleMouseUp = (): void => {
    drawing = false;
    useCanvas(socket.id)[0].endDrawing(penSize, penColor);
    socket.emit('endDrawing', socket.id);
  };

  return (
    <Box ref={box} sx={{ maxWidth: 'md', border: 3, height: 400 }}>
      <canvas
        style={{ touchAction: 'none', maxWidth: 'md' }}
        ref={canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        height={400}
        width={canvasWidth - 6}
      ></canvas>
    </Box>
  );
}
