export function extractCoords(e: MouseEvent | TouchEvent) {
  let clientX: number;
  let clientY: number;

  if (e instanceof TouchEvent) {
    const touch = e.touches[0] || e.changedTouches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return { x: clientX, y: clientY };
}
