<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePolygonStore } from "@/stores/polygonStore";
import type { PolygonPoint } from "@/types";
import { freezeStoreRefs } from "@/utils/freezedStoreRefs";
import {
  distance,
  getMousePoint,
  isPointInPolygons,
  isPolygonClosed,
  movePointTogether,
} from "@/utils/polygonDrawing";

defineProps<{
  imageSrc: string;
  canvasWidth: number;
  canvasHeight: number;
}>();

const polygonStore = usePolygonStore();
const polygonRefs = storeToRefs(polygonStore);
const { polygons, currentPolygon, draggingPoint, draggingPointIndex } =
  freezeStoreRefs(polygonRefs);

const {
  addPolygon,
  removePolygon,
  loadPolygons,
  clearPolygons,
  setCurrentPolygon,
  clearCurrentPolygon,
  setPointToCurrentPolygon,
  setDraggingPoint,
  // mutateDraggingPoint,
  clearDraggingPoint,
} = polygonStore;

function handleMouseDown(e: MouseEvent) {
  const newPoint = getMousePoint(e);

  // 이미 그려진 폴리곤 위에 있으면 무시
  const { isIn, polygon } = isPointInPolygons(newPoint, polygons.value);

  // 겹쳤는데, 현재 선택한 폴리곤이 아닌 경우
  if (
    isIn &&
    (!currentPolygon?.value?.id || polygon?.id !== currentPolygon?.value?.id)
  ) {
    // 끌고다니는 점이 없는 경우는 폴리곤을 선택
    if (!draggingPoint.value) {
      setCurrentPolygon(polygon!);
    }
    // 끌고다니는 점이 있는 경우는 무시하고 계속
    return;
  }

  // 가까운 점이 있으면 기존 점을 끌고 다님
  console.log(
    "points",
    currentPolygon?.value?.points?.[0]?.x,
    currentPolygon?.value?.points?.[0]?.y,
  );
  const nearPointIdx = currentPolygon?.value?.points.findIndex((p, i) => {
    return distance(p, newPoint) < 10 && i !== draggingPointIndex.value;
  });
  let nearPoint: PolygonPoint | null = null;
  if (nearPointIdx !== undefined && nearPointIdx !== -1) {
    nearPoint = currentPolygon?.value?.points[nearPointIdx] ?? null;
  }
  if (nearPoint) {
    // 기존 점과 가까운 곳을 클릭하면, 새로운 점을 생성한 것을 삭제하고,
    // 기존 점을 끌고 다닌다.
    const draggingIdx = currentPolygon?.value?.points.findIndex(
      (p) => p === draggingPoint.value,
    );
    if (draggingIdx && draggingIdx !== -1) {
      currentPolygon?.value?.points.splice(draggingIdx, 1); // 새로 생성한 점을 찾아서 삭제
    }
    setDraggingPoint(nearPoint);
    return;
  }
  // 현재 선택된 폴리곤이 닫힌 폴리곤일 경우
  if (isPolygonClosed(currentPolygon?.value?.points ?? [])) {
    if (isIn) {
      clearCurrentPolygon();
      clearDraggingPoint();
      return;
    }
    // 안 겹치면 새로운 폴리곤 생성 시작
    addPolygon([newPoint]);
    setDraggingPoint(newPoint);
    return;
  }

  // 끌고다니는 점이 없는 경우
  if (!draggingPoint.value) {
    // 첫 점을 찍을 때는 새로운 점을 찍고, 그 점을 끌고다님
    addPolygon([newPoint]);
    setCurrentPolygon(polygons.value[polygons.value.length - 1]);
    setDraggingPoint(newPoint);
    return;
  }

  // 이전 점 클릭을 찍고나서는 새로운 점을 끌고 다니고 있다.
  // 때문에, 새로운 점을 추가하지 않고 계속 끌고 다님
  // mutateDraggingPoint(newPoint);
}

function handleMouseMove(e: MouseEvent) {
  if (!draggingPoint.value || draggingPointIndex.value === -1) return;
  const newPoint = getMousePoint(e);
  movePointTogether(
    currentPolygon?.value?.points ?? [],
    draggingPointIndex.value,
    newPoint.x,
    newPoint.y,
  );
}

async function handleMouseUp(e: MouseEvent) {
  if (!currentPolygon?.value?.points.length) return;
  const newPoint = getMousePoint(e);

  const { isIn, polygon } = isPointInPolygons(newPoint, polygons.value);
  // 다른 폴리곤을 컨트롤 하고 있고, 이미 그려진 폴리곤 위에 있으면 무시
  if (isIn && polygon !== currentPolygon?.value) {
    return;
  }
  // 컨트롤하고 있는 폴리곤이 닫힌 폴리곤이라면, 놓고 끝내기
  if (isPolygonClosed(currentPolygon?.value?.points ?? [])) {
    clearDraggingPoint();
    return;
  }

  // 첫 점과 가까워지면 폴리곤 닫기
  if (
    currentPolygon?.value?.points.length &&
    currentPolygon.value?.points.length > 2
  ) {
    const first = currentPolygon.value?.points[0];
    if (distance(newPoint, first) < 10) {
      setPointToCurrentPolygon({ ...first });
      clearCurrentPolygon();
      return;
    }
  }

  // 아니면 새로운 점을 생성하고 끌고다니기
  setPointToCurrentPolygon(newPoint);
  setDraggingPoint(newPoint);
}

function clear() {
  clearPolygons();
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" || e.key === "Backspace") {
    if (isPolygonClosed(currentPolygon?.value?.points ?? [])) {
      const idx = polygons.value.findIndex(
        (poly) =>
          poly.points.length === currentPolygon?.value?.points.length &&
          poly.points.every(
            (p, i) =>
              p.x === currentPolygon?.value?.points[i].x &&
              p.y === currentPolygon?.value?.points[i].y,
          ),
      );
      if (idx !== -1) {
        removePolygon(idx);
        clearCurrentPolygon();
      }
    }
  }
}

onMounted(async () => {
  window.addEventListener("keydown", handleKeyDown);
  // await clearPolygons();
  await loadPolygons();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

defineExpose({
  clear,
});
</script>

<template>
  <div
    class="relative border border-gray-200 shadow-gray-50"
    :style="{
      width: `${canvasWidth || 500}px`,
      height: `${canvasHeight || 500}px`,
    }"
  >
    <img
      v-if="imageSrc"
      :src="imageSrc"
      class="absolute top-0 left-0 z-0 h-full w-full object-contain"
      draggable="false"
      style="pointer-events: none"
    />
    <svg
      class="absolute top-0 left-0 z-10"
      :width="canvasWidth"
      :height="canvasHeight"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      style="z-index: 10; cursor: crosshair"
    >
      <!-- 이미 그려진 폴리곤들 -->
      <template
        v-for="(poly, idx) in polygons"
        :key="idx"
      >
        <polygon
          v-if="poly.id !== currentPolygon?.id"
          :points="poly.points.map((p) => `${p.x},${p.y}`).join(' ')"
          fill="rgba(59,130,246,0.15)"
          stroke="#2563eb"
          stroke-width="2"
        />
      </template>
      <!-- 현재 그리고 있는 폴리곤 선 -->
      <polyline
        v-if="currentPolygon?.points.length"
        :points="currentPolygon?.points.map((p) => `${p.x},${p.y}`).join(' ')"
        fill="rgba(59,130,246,0.15)"
        stroke="#a21caf"
        stroke-width="2"
      />
      <!-- 현재 그리고 있는(포커싱된) 점들 - 끌고 다니는 점이 마지막 점일 경우 제외 -->
      <template
        v-for="(currentPoint, i) in currentPolygon?.points"
        :key="i"
      >
        <circle
          :cx="currentPoint.x"
          :cy="currentPoint.y"
          r="5"
          :fill="i === 0 ? '#a21caf' : '#2563eb'"
          stroke="white"
          stroke-width="2"
        />
      </template>
    </svg>
  </div>
</template>
