// "implements" IDraw but with static methods
export default class CanvasDrawer {
  static isDrawing: boolean;
  static canvas: React.RefObject<HTMLCanvasElement>;

  static setup(canvas: React.RefObject<HTMLCanvasElement>) {
    this.isDrawing = false;
    this.canvas = canvas;
  }

  static beginDrawing = (startX: number, startY: number): void => {
    this.isDrawing = true;
    const ctx = this.canvas.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    }
  };

  static dot = (x: number, y: number): void => {
    const ctx = this.canvas.current?.getContext('2d');
    if (ctx) {
      const prevWidth = ctx.lineWidth;
      const radius = prevWidth / 2 - 1 < 0 ? 0 : prevWidth / 2 - 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.lineWidth = prevWidth;
    }
  };

  static drawTo = (
    toX: number,
    toY: number,
    width = 1,
    color = 'black'
  ): void => {
    if (this.isDrawing) {
      const ctx = this.canvas.current?.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineTo(toX, toY);
        ctx.stroke();
      }
    }
  };

  static endDrawing = (): void => {
    this.isDrawing = false;
  };

  static clearCanvas = (): void => {
    // console.log('Cleared!');
    this.canvas.current
      ?.getContext('2d')
      ?.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  };
}
