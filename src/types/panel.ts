export type HitboxTarget = 'HEAD' | 'NECK' | 'CHEST' | 'PELVIS';

export type BoxStyle = 'CORNERS' | 'FULL_2D' | 'WIREFRAME_3D';

export type TracerOrigin = 'BOTTOM_CENTER' | 'CROSSHAIR' | 'TOP_CENTER';

export interface PanelSettings {
  aimbot: boolean;
  espLine: boolean;
  espBox: boolean;
  streamerMode: boolean;
  bodySettings: boolean;

  // Sub-settings & fine-tuning
  aimbotFov: number; // 40 - 200 px
  aimbotSmooth: number; // 1 (instant) - 10 (very smooth)
  aimbotPriority: 'FOV' | 'DISTANCE';
  
  espLineColor: string; // hex
  espLineOrigin: TracerOrigin;
  espLineThickness: number;
  
  espBoxStyle: BoxStyle;
  espShowHealth: boolean;
  espShowDistance: boolean;
  espShowName: boolean;
  
  bodyHitbox: HitboxTarget;
  bodyShowBones: boolean;
  
  targetSpeed: number; // 0 (stationary) to 3 (fast)
  targetCount: number; // 3 to 8
}

export interface SimulationTarget {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number; // depth scale (0.5 to 1.5)
  vx: number;
  vy: number;
  health: number; // 0 to 100
  armor: number; // 0 to 100
  width: number;
  height: number;
  team: 'ENEMY' | 'TEAM';
  distance: number;
}
