import { extractCoords } from "../extractCoords";

export function extractCoordsFromParent(e: MouseEvent | TouchEvent) {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  const { x: clientX, y: clientY } = extractCoords(e);

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return { x, y };
}
