import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PanelSettings, SimulationTarget } from '../types/panel';
import { playLockOnSound } from '../utils/audio';
import { Crosshair, Plus, RotateCcw, Volume2, VolumeX, ShieldAlert, Sparkles } from 'lucide-react';

interface TacticalHudCanvasProps {
  settings: PanelSettings;
  onUpdateSettings?: (settings: Partial<PanelSettings>) => void;
}

export const TacticalHudCanvas: React.FC<TacticalHudCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse / Aim coordinates (normalized to canvas space)
  const crosshairRef = useRef<{ x: number; y: number; targetLocked: boolean; lockedId: string | null }>({
    x: 400,
    y: 300,
    targetLocked: false,
    lockedId: null,
  });

  // Sound enabled
  const [soundOn, setSoundOn] = useState(true);
  const [activePreset, setActivePreset] = useState<'COMBAT' | 'SNIPER' | 'CLOSE'>('COMBAT');

  // Simulation targets list
  const targetsRef = useRef<SimulationTarget[]>([
    {
      id: 't-1',
      name: 'TARGET_ALPHA',
      x: 320,
      y: 220,
      z: 1.0,
      vx: 0.8,
      vy: 0.2,
      health: 100,
      armor: 85,
      width: 48,
      height: 96,
      team: 'ENEMY',
      distance: 38,
    },
    {
      id: 't-2',
      name: 'TARGET_BRAVO',
      x: 520,
      y: 280,
      z: 1.15,
      vx: -0.6,
      vy: -0.3,
      health: 75,
      armor: 50,
      width: 52,
      height: 104,
      team: 'ENEMY',
      distance: 29,
    },
    {
      id: 't-3',
      name: 'TARGET_CHARLIE',
      x: 210,
      y: 340,
      z: 0.85,
      vx: 0.4,
      vy: 0.4,
      health: 45,
      armor: 0,
      width: 44,
      height: 88,
      team: 'ENEMY',
      distance: 52,
    },
    {
      id: 't-4',
      name: 'TARGET_VIP',
      x: 640,
      y: 190,
      z: 0.75,
      vx: -0.9,
      vy: 0.1,
      health: 100,
      armor: 100,
      width: 42,
      height: 84,
      team: 'ENEMY',
      distance: 65,
    },
  ]);

  // Handle pointer movement across simulation viewport
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    crosshairRef.current.x = (e.clientX - rect.left) * scaleX;
    crosshairRef.current.y = (e.clientY - rect.top) * scaleY;
  };

  // Add target
  const handleAddTarget = () => {
    if (!canvasRef.current) return;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    const newId = `t-${Date.now()}`;
    const names = ['TARGET_ECHO', 'TARGET_ZULU', 'TARGET_FOXTROT', 'TARGET_GHOST'];
    const randomName = names[Math.floor(Math.random() * names.length)];

    targetsRef.current.push({
      id: newId,
      name: randomName,
      x: Math.random() * (w - 200) + 100,
      y: Math.random() * (h - 240) + 120,
      z: 0.7 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 0.8,
      health: Math.floor(Math.random() * 50) + 50,
      armor: Math.floor(Math.random() * 80),
      width: 48,
      height: 96,
      team: 'ENEMY',
      distance: Math.floor(Math.random() * 40) + 25,
    });
  };

  // Reset targets
  const handleResetTargets = () => {
    targetsRef.current = [
      {
        id: 't-1',
        name: 'TARGET_ALPHA',
        x: 320,
        y: 220,
        z: 1.0,
        vx: 0.8,
        vy: 0.2,
        health: 100,
        armor: 85,
        width: 48,
        height: 96,
        team: 'ENEMY',
        distance: 38,
      },
      {
        id: 't-2',
        name: 'TARGET_BRAVO',
        x: 520,
        y: 280,
        z: 1.15,
        vx: -0.6,
        vy: -0.3,
        health: 75,
        armor: 50,
        width: 52,
        height: 104,
        team: 'ENEMY',
        distance: 29,
      },
      {
        id: 't-3',
        name: 'TARGET_CHARLIE',
        x: 210,
        y: 340,
        z: 0.85,
        vx: 0.4,
        vy: 0.4,
        health: 45,
        armor: 0,
        width: 44,
        height: 88,
        team: 'ENEMY',
        distance: 52,
      },
    ];
  };

  // Draw simulation frame
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#080D19';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Tactical Grid Background
    ctx.strokeStyle = '#121E32';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Horizon / Tactical Range markers
    ctx.strokeStyle = 'rgba(22, 139, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.4);
    ctx.lineTo(width, height * 0.4);
    ctx.stroke();

    ctx.fillStyle = 'rgba(22, 139, 255, 0.4)';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('HORIZON // 100M RANGE', 15, height * 0.4 - 6);

    // Update targets position
    const speedMult = settings.targetSpeed;
    targetsRef.current.forEach((t) => {
      t.x += t.vx * speedMult;
      t.y += t.vy * speedMult;

      // Bounce within bounds
      const margin = 80;
      if (t.x < margin || t.x > width - margin) {
        t.vx *= -1;
      }
      if (t.y < margin + 40 || t.y > height - margin) {
        t.vy *= -1;
      }
    });

    const crosshair = crosshairRef.current;
    let closestTarget: SimulationTarget | null = null;
    let minDistanceToCrosshair = Infinity;

    // Check which target is closest to crosshair within FOV
    const fovRadius = settings.aimbotFov || 110;

    targetsRef.current.forEach((target) => {
      // Calculate target head / center position
      const targetCenter = {
        x: target.x,
        y: target.y - (settings.bodyHitbox === 'HEAD' ? target.height * 0.35 : 0),
      };

      const dx = crosshair.x - targetCenter.x;
      const dy = crosshair.y - targetCenter.y;
      const dist = Math.hypot(dx, dy);

      if (dist < fovRadius && dist < minDistanceToCrosshair) {
        minDistanceToCrosshair = dist;
        closestTarget = target;
      }
    });

    // Handle aimbot pull & lock sound
    if (settings.aimbot && closestTarget) {
      const ct = closestTarget as SimulationTarget;
      const targetY = ct.y - (settings.bodyHitbox === 'HEAD' ? ct.height * 0.38 : ct.height * 0.1);
      
      // Smooth interpolation toward target
      const smoothFactor = Math.max(1, settings.aimbotSmooth || 4);
      crosshair.x += (ct.x - crosshair.x) * (0.35 / smoothFactor);
      crosshair.y += (targetY - crosshair.y) * (0.35 / smoothFactor);

      if (!crosshair.targetLocked || crosshair.lockedId !== ct.id) {
        crosshair.targetLocked = true;
        crosshair.lockedId = ct.id;
        if (soundOn) {
          playLockOnSound();
        }
      }
    } else {
      crosshair.targetLocked = false;
      crosshair.lockedId = null;
    }

    // 3. Render ESP Lines
    if (settings.espLine) {
      const lineColor = settings.espLineColor || '#168BFF';
      const lineThickness = settings.espLineThickness || 1.5;

      let originX = width / 2;
      let originY = height;
      if (settings.espLineOrigin === 'CROSSHAIR') {
        originX = crosshair.x;
        originY = crosshair.y;
      } else if (settings.espLineOrigin === 'TOP_CENTER') {
        originX = width / 2;
        originY = 0;
      }

      targetsRef.current.forEach((target) => {
        const isLocked = crosshair.lockedId === target.id;
        
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = isLocked ? '#00FF66' : lineColor;
        ctx.lineWidth = isLocked ? lineThickness + 1 : lineThickness;
        ctx.setLineDash(isLocked ? [] : [4, 2]);
        ctx.stroke();

        // Distance indicator along line
        if (settings.espShowDistance) {
          const midX = (originX + target.x) / 2;
          const midY = (originY + target.y) / 2;

          ctx.fillStyle = 'rgba(8, 13, 25, 0.85)';
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          
          const badgeText = `${target.distance}m`;
          ctx.font = '10px JetBrains Mono';
          const textMetrics = ctx.measureText(badgeText);
          const pad = 4;
          
          ctx.fillRect(midX - textMetrics.width / 2 - pad, midY - 7, textMetrics.width + pad * 2, 14);
          ctx.strokeRect(midX - textMetrics.width / 2 - pad, midY - 7, textMetrics.width + pad * 2, 14);
          
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(badgeText, midX - textMetrics.width / 2, midY + 4);
        }
        ctx.restore();
      });
    }

    // 4. Render Target Dummies & ESP Boxes
    targetsRef.current.forEach((target) => {
      const isLocked = crosshair.lockedId === target.id;
      const scale = target.z;
      const tw = target.width * scale;
      const th = target.height * scale;
      const left = target.x - tw / 2;
      const top = target.y - th / 2;

      // Draw Target Dummy Character (Body Silhouette)
      ctx.save();

      // Shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(target.x, top + th + 4, tw * 0.6, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body torso silhouette
      ctx.fillStyle = isLocked ? 'rgba(22, 139, 255, 0.28)' : 'rgba(18, 30, 50, 0.85)';
      ctx.strokeStyle = isLocked ? '#168BFF' : '#253B5E';
      ctx.lineWidth = 1.5;

      // Draw stylized tactical silhouette
      const headR = 11 * scale;
      const headY = top + headR + 2;

      // Head
      ctx.beginPath();
      ctx.arc(target.x, headY, headR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Torso & Limbs
      ctx.beginPath();
      ctx.roundRect(left + 6 * scale, headY + headR + 2, tw - 12 * scale, th * 0.42, 4);
      ctx.fill();
      ctx.stroke();

      // Legs
      const legW = (tw - 18 * scale) / 2;
      ctx.fillRect(left + 7 * scale, top + th * 0.58, legW, th * 0.42);
      ctx.strokeRect(left + 7 * scale, top + th * 0.58, legW, th * 0.42);

      ctx.fillRect(left + tw - 7 * scale - legW, top + th * 0.58, legW, th * 0.42);
      ctx.strokeRect(left + tw - 7 * scale - legW, top + th * 0.58, legW, th * 0.42);

      // 5. Body Settings: Bone Wireframe & Hitbox Highlight
      if (settings.bodySettings) {
        ctx.strokeStyle = isLocked ? '#00FFCC' : 'rgba(0, 230, 255, 0.8)';
        ctx.lineWidth = 1.5;

        // Head joint
        ctx.beginPath();
        ctx.arc(target.x, headY, headR + 2, 0, Math.PI * 2);
        ctx.stroke();

        // Spine
        ctx.beginPath();
        ctx.moveTo(target.x, headY + headR);
        ctx.lineTo(target.x, top + th * 0.55);
        ctx.stroke();

        // Shoulder & Arms
        const shoulderY = headY + headR + 6;
        ctx.beginPath();
        ctx.moveTo(left + 4 * scale, shoulderY + 12);
        ctx.lineTo(left + 8 * scale, shoulderY);
        ctx.lineTo(left + tw - 8 * scale, shoulderY);
        ctx.lineTo(left + tw - 4 * scale, shoulderY + 12);
        ctx.stroke();

        // Selected Target Bone Hitbox Indicator
        ctx.fillStyle = 'rgba(255, 51, 102, 0.4)';
        ctx.strokeStyle = '#FF3366';
        ctx.lineWidth = 1.5;

        if (settings.bodyHitbox === 'HEAD') {
          ctx.beginPath();
          ctx.arc(target.x, headY, headR + 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (settings.bodyHitbox === 'CHEST') {
          ctx.beginPath();
          ctx.roundRect(left + 8 * scale, shoulderY + 2, tw - 16 * scale, th * 0.22, 3);
          ctx.fill();
          ctx.stroke();
        } else if (settings.bodyHitbox === 'NECK') {
          ctx.beginPath();
          ctx.arc(target.x, headY + headR + 2, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      // 6. ESP Box
      if (settings.espBox) {
        const boxPad = 6;
        const bx = left - boxPad;
        const by = top - boxPad;
        const bw = tw + boxPad * 2;
        const bh = th + boxPad * 2;
        const cornerLen = Math.min(14, bw * 0.28);
        const boxColor = isLocked ? '#00FF66' : settings.espLineColor || '#168BFF';

        ctx.strokeStyle = boxColor;
        ctx.lineWidth = isLocked ? 2 : 1.5;

        if (settings.espBoxStyle === 'CORNERS' || !settings.espBoxStyle) {
          // Tactical corner brackets
          ctx.beginPath();
          // Top-Left
          ctx.moveTo(bx, by + cornerLen);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + cornerLen, by);

          // Top-Right
          ctx.moveTo(bx + bw - cornerLen, by);
          ctx.lineTo(bx + bw, by);
          ctx.lineTo(bx + bw, by + cornerLen);

          // Bottom-Left
          ctx.moveTo(bx, by + bh - cornerLen);
          ctx.lineTo(bx, by + bh);
          ctx.lineTo(bx + cornerLen, by + bh);

          // Bottom-Right
          ctx.moveTo(bx + bw - cornerLen, by + bh);
          ctx.lineTo(bx + bw, by + bh);
          ctx.lineTo(bx + bw, by + bh - cornerLen);

          ctx.stroke();
        } else if (settings.espBoxStyle === 'FULL_2D') {
          ctx.strokeRect(bx, by, bw, bh);
        } else if (settings.espBoxStyle === 'WIREFRAME_3D') {
          // 3D Isometric cube wireframe
          const depth = 16 * scale;
          ctx.strokeRect(bx, by, bw, bh);
          ctx.strokeRect(bx + depth, by - depth, bw, bh);
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + depth, by - depth);
          ctx.moveTo(bx + bw, by);
          ctx.lineTo(bx + bw + depth, by - depth);
          ctx.moveTo(bx, by + bh);
          ctx.lineTo(bx + depth, by + bh - depth);
          ctx.moveTo(bx + bw, by + bh);
          ctx.lineTo(bx + bw + depth, by + bh - depth);
          ctx.stroke();
        }

        // Health Bar on Left
        if (settings.espShowHealth) {
          const barW = 3.5;
          const barX = bx - 7;
          const barY = by;
          const barH = bh;

          // Track
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(barX, barY, barW, barH);

          // Health Fill
          const currentH = (target.health / 100) * barH;
          const healthColor = target.health > 60 ? '#00FF66' : target.health > 30 ? '#FFB800' : '#FF3366';
          ctx.fillStyle = healthColor;
          ctx.fillRect(barX, barY + (barH - currentH), barW, currentH);
        }

        // Name & Distance Badge on Top
        const displayName = settings.streamerMode ? '[STREAM_USER]' : target.name;
        ctx.font = '10px JetBrains Mono';
        const tagText = `${displayName} · ${target.distance}m`;
        const tagW = ctx.measureText(tagText).width;

        ctx.fillStyle = 'rgba(8, 13, 25, 0.85)';
        ctx.fillRect(bx + bw / 2 - tagW / 2 - 4, by - 16, tagW + 8, 13);
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + bw / 2 - tagW / 2 - 4, by - 16, tagW + 8, 13);

        ctx.fillStyle = isLocked ? '#00FF66' : '#FFFFFF';
        ctx.fillText(tagText, bx + bw / 2 - tagW / 2, by - 6);
      }

      ctx.restore();
    });

    // 7. AimBot FOV Circle & Crosshair
    ctx.save();
    if (settings.aimbot) {
      // FOV Circle
      ctx.beginPath();
      ctx.arc(crosshair.x, crosshair.y, fovRadius, 0, Math.PI * 2);
      ctx.strokeStyle = crosshair.targetLocked ? 'rgba(0, 255, 102, 0.5)' : 'rgba(22, 139, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle radial fill inside FOV
      const grad = ctx.createRadialGradient(crosshair.x, crosshair.y, 0, crosshair.x, crosshair.y, fovRadius);
      grad.addColorStop(0, crosshair.targetLocked ? 'rgba(0, 255, 102, 0.08)' : 'rgba(22, 139, 255, 0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();

      // Lock-On vector line if locked
      if (closestTarget && crosshair.targetLocked) {
        const ct = closestTarget as SimulationTarget;
        ctx.beginPath();
        ctx.moveTo(crosshair.x, crosshair.y);
        ctx.lineTo(ct.x, ct.y - (settings.bodyHitbox === 'HEAD' ? ct.height * 0.38 : 0));
        ctx.strokeStyle = '#00FF66';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Lock text
        ctx.font = '11px JetBrains Mono';
        ctx.fillStyle = '#00FF66';
        ctx.fillText(`LOCKED: [${settings.bodyHitbox}]`, crosshair.x + 18, crosshair.y - 14);
      }
    }

    // Modern Tactical Crosshair
    const chSize = 10;
    const chGap = 4;
    ctx.strokeStyle = crosshair.targetLocked ? '#00FF66' : '#168BFF';
    ctx.lineWidth = 2;

    // Top
    ctx.beginPath();
    ctx.moveTo(crosshair.x, crosshair.y - chGap);
    ctx.lineTo(crosshair.x, crosshair.y - chGap - chSize);
    ctx.stroke();
    // Bottom
    ctx.beginPath();
    ctx.moveTo(crosshair.x, crosshair.y + chGap);
    ctx.lineTo(crosshair.x, crosshair.y + chGap + chSize);
    ctx.stroke();
    // Left
    ctx.beginPath();
    ctx.moveTo(crosshair.x - chGap, crosshair.y);
    ctx.lineTo(crosshair.x - chGap - chSize, crosshair.y);
    ctx.stroke();
    // Right
    ctx.beginPath();
    ctx.moveTo(crosshair.x + chGap, crosshair.y);
    ctx.lineTo(crosshair.x + chGap + chSize, crosshair.y);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = crosshair.targetLocked ? '#00FF66' : '#FFFFFF';
    ctx.beginPath();
    ctx.arc(crosshair.x, crosshair.y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 8. Streamer Mode Watermark & Overlay Mask
    if (settings.streamerMode) {
      ctx.save();
      // Subtle top-right privacy watermark
      ctx.fillStyle = 'rgba(8, 13, 25, 0.9)';
      ctx.strokeStyle = '#168BFF40';
      ctx.lineWidth = 1;
      ctx.roundRect(width - 240, 16, 224, 28, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#168BFF';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText('STREAMER MODE · OBS SAFE', width - 226, 34);

      // Clean border vignette
      ctx.strokeStyle = 'rgba(22, 139, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, width - 2, height - 2);
      ctx.restore();
    }

    // 9. Status Telemetry Overlay
    ctx.save();
    ctx.fillStyle = 'rgba(8, 13, 25, 0.85)';
    ctx.strokeStyle = '#121E32';
    ctx.lineWidth = 1;
    ctx.roundRect(16, 16, 210, 64, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#168BFF';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText('PAWAN RAJPUT HUD v1.0', 28, 34);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText(`TARGETS: ${targetsRef.current.length} ACTIVE`, 28, 50);
    ctx.fillText(`STATUS: ${crosshair.targetLocked ? 'AIMBOT ENGAGED' : 'STANDBY'}`, 28, 66);
    ctx.restore();

  }, [settings, soundOn]);

  // Animation Loop
  useEffect(() => {
    let animId: number;
    const loop = () => {
      renderFrame();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [renderFrame]);

  // Adjust canvas size on container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = Math.floor(rect.width);
        canvasRef.current.height = Math.floor(rect.height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full bg-[#080D19] border border-[#121E32] rounded-2xl overflow-hidden shadow-2xl">
      {/* HUD Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A1224] border-b border-[#121E32]">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-[#168BFF]" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Tactical HUD Visual Demo
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-[11px] font-mono text-[#168BFF]">
            {targetsRef.current.length} Dummies
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick presets */}
          <div className="hidden sm:flex items-center bg-[#080D19] p-0.5 rounded-lg border border-[#1E3354]">
            <button
              onClick={() => setActivePreset('COMBAT')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                activePreset === 'COMBAT' ? 'bg-[#168BFF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              COMBAT
            </button>
            <button
              onClick={() => setActivePreset('SNIPER')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                activePreset === 'SNIPER' ? 'bg-[#168BFF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              SNIPER
            </button>
            <button
              onClick={() => setActivePreset('CLOSE')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                activePreset === 'CLOSE' ? 'bg-[#168BFF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              CQB
            </button>
          </div>

          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-1.5 rounded-lg bg-[#121E32] hover:bg-[#1E3354] text-slate-300 transition-colors"
            title={soundOn ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#168BFF]" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <button
            onClick={handleAddTarget}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-[#168BFF]/20 hover:bg-[#168BFF]/30 text-[#168BFF] border border-[#168BFF]/40 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Dummy</span>
          </button>

          <button
            onClick={handleResetTargets}
            className="p-1.5 rounded-lg bg-[#121E32] hover:bg-[#1E3354] text-slate-300 transition-colors"
            title="Reset Targets"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className="relative flex-1 w-full h-[380px] sm:h-[480px] lg:h-[560px] cursor-crosshair overflow-hidden touch-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Floating Instruction overlay */}
        <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-2 px-3 py-1.5 bg-[#080D19]/85 backdrop-blur-md border border-[#121E32] rounded-lg text-[11px] font-mono text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-[#168BFF]" />
          <span>Move mouse/finger to aim · Toggle settings on phone panel</span>
        </div>

        {/* Educational Standalone Notice */}
        <div className="absolute bottom-3 right-3 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#080D19]/85 backdrop-blur-md border border-[#121E32] rounded-lg text-[10px] font-mono text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-[#168BFF]" />
          <span>Standalone Visual Demo Simulator</span>
        </div>
      </div>
    </div>
  );
};
