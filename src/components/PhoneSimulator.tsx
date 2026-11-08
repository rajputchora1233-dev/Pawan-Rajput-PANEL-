import React, { useState } from 'react';
import { PanelSettings, HitboxTarget, BoxStyle, TracerOrigin } from '../types/panel';
import { playToggleSound } from '../utils/audio';
import { ChevronDown, ChevronUp, Sliders, Smartphone, Wifi, BatteryCharging, ShieldCheck } from 'lucide-react';

interface PhoneSimulatorProps {
  settings: PanelSettings;
  onToggleSetting: (key: keyof PanelSettings, value: boolean) => void;
  onUpdateSetting: <K extends keyof PanelSettings>(key: K, value: PanelSettings[K]) => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  settings,
  onToggleSetting,
  onUpdateSetting,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const settingItems: Array<{
    id: keyof PanelSettings;
    name: string;
    description: string;
    active: boolean;
  }> = [
    {
      id: 'aimbot',
      name: 'AIMBOT VISUAL DEMO',
      description: 'Auto-tracking crosshair & dynamic FOV cone',
      active: settings.aimbot,
    },
    {
      id: 'espLine',
      name: 'ESP LINE',
      description: 'Tactical laser tracer lines to enemy positions',
      active: settings.espLine,
    },
    {
      id: 'espBox',
      name: 'ESP BOX',
      description: '2D/3D bounding boxes & health indicators',
      active: settings.espBox,
    },
    {
      id: 'streamerMode',
      name: 'STREAMER MODE',
      description: 'Privacy shield & clean stream capture overlay',
      active: settings.streamerMode,
    },
    {
      id: 'bodySettings',
      name: 'BODY SETTINGS',
      description: 'Target bone wireframe & critical hitbox zone',
      active: settings.bodySettings,
    },
  ];

  const handleToggle = (key: keyof PanelSettings, currentVal: boolean) => {
    const newVal = !currentVal;
    playToggleSound(newVal);
    onToggleSetting(key, newVal);
  };

  return (
    <div className="relative mx-auto w-full max-w-[380px] bg-[#02050B] rounded-[44px] p-3 shadow-2xl border-[5px] border-[#1E293B] ring-1 ring-[#168BFF]/20">
      {/* Phone Camera Notch / Dynamic Island */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-[#1E293B]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490] ml-2 opacity-60" />
      </div>

      {/* Screen Frame */}
      <div className="relative w-full h-[680px] bg-[#080D19] rounded-[36px] overflow-hidden flex flex-col select-none">
        {/* Android Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-mono text-slate-400 z-20">
          <span className="font-semibold text-slate-200">12:00</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#168BFF]">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span>98%</span>
              <BatteryCharging className="w-3.5 h-3.5 text-[#168BFF]" />
            </div>
          </div>
        </div>

        {/* Scrollable Compose Panel Screen Content */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {/* Header Title Lockup */}
          <div className="text-center pt-2">
            <h1 className="text-[26px] font-extrabold tracking-wide text-[#168BFF] uppercase leading-tight">
              PAWAN RAJPUT
            </h1>
            <p className="text-[12px] font-medium tracking-[0.15em] text-white/90 uppercase mt-0.5">
              PREMIUM GAMING PANEL
            </p>
          </div>

          {/* Section Heading */}
          <div className="text-center pt-2 pb-1">
            <h2 className="text-[17px] font-bold tracking-wider text-[#168BFF] uppercase">
              CONTROL CENTER
            </h2>
            <div className="w-12 h-0.5 bg-[#168BFF]/40 mx-auto mt-1 rounded-full" />
          </div>

          {/* 5 Interactive Settings Cards */}
          <div className="space-y-3">
            {settingItems.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={item.id}
                  className="bg-[#121E32] hover:bg-[#16253E] border border-[#1E3354]/60 rounded-[15px] overflow-hidden transition-all shadow-md"
                >
                  {/* Card Row matching Compose layout */}
                  <div className="flex items-center justify-between p-4 gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-white tracking-wide truncate">
                          {item.name}
                        </span>
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                          title="Fine tune settings"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-[#168BFF]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5 truncate">
                        {item.description}
                      </p>
                    </div>

                    {/* Compose Style Custom Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.active}
                      onClick={() => handleToggle(item.id, item.active)}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.active ? 'bg-[#168BFF]' : 'bg-[#0B1422] border-[#1E3354]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-[1px] ${
                          item.active ? 'translate-x-6' : 'translate-x-0.5 bg-slate-300'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expanded Fine-Tuning Drawer for Each Setting */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 bg-[#0D1728] border-t border-[#1E3354] space-y-3 text-xs">
                      {item.id === 'aimbot' && (
                        <>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                              <span>FOV Radius</span>
                              <span className="text-[#168BFF] font-bold">{settings.aimbotFov}px</span>
                            </div>
                            <input
                              type="range"
                              min={60}
                              max={180}
                              value={settings.aimbotFov}
                              onChange={(e) => onUpdateSetting('aimbotFov', Number(e.target.value))}
                              className="w-full accent-[#168BFF] h-1.5 bg-[#121E32] rounded cursor-pointer"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                              <span>Aim Smoothness</span>
                              <span className="text-[#168BFF] font-bold">{settings.aimbotSmooth}x</span>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={8}
                              value={settings.aimbotSmooth}
                              onChange={(e) => onUpdateSetting('aimbotSmooth', Number(e.target.value))}
                              className="w-full accent-[#168BFF] h-1.5 bg-[#121E32] rounded cursor-pointer"
                            />
                          </div>
                        </>
                      )}

                      {item.id === 'espLine' && (
                        <>
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-slate-300 font-mono">Tracer Origin</span>
                            <div className="grid grid-cols-3 gap-1">
                              {(['BOTTOM_CENTER', 'CROSSHAIR', 'TOP_CENTER'] as TracerOrigin[]).map((origin) => (
                                <button
                                  key={origin}
                                  onClick={() => onUpdateSetting('espLineOrigin', origin)}
                                  className={`py-1 text-[10px] font-mono rounded transition-colors ${
                                    settings.espLineOrigin === origin
                                      ? 'bg-[#168BFF] text-white font-semibold'
                                      : 'bg-[#121E32] text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {origin === 'BOTTOM_CENTER' ? 'BOTTOM' : origin === 'CROSSHAIR' ? 'CENTER' : 'TOP'}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-300 font-mono">Show Distance Tag</span>
                            <button
                              onClick={() => onUpdateSetting('espShowDistance', !settings.espShowDistance)}
                              className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                                settings.espShowDistance ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                              }`}
                            >
                              {settings.espShowDistance ? 'ON' : 'OFF'}
                            </button>
                          </div>
                        </>
                      )}

                      {item.id === 'espBox' && (
                        <div className="space-y-2">
                          <span className="text-[11px] text-slate-300 font-mono">Box Style</span>
                          <div className="grid grid-cols-3 gap-1">
                            {(['CORNERS', 'FULL_2D', 'WIREFRAME_3D'] as BoxStyle[]).map((style) => (
                              <button
                                key={style}
                                onClick={() => onUpdateSetting('espBoxStyle', style)}
                                className={`py-1 text-[10px] font-mono rounded transition-colors ${
                                  settings.espBoxStyle === style
                                    ? 'bg-[#168BFF] text-white font-semibold'
                                    : 'bg-[#121E32] text-slate-400 hover:text-white'
                                }`}
                              >
                                {style === 'CORNERS' ? 'CORNERS' : style === 'FULL_2D' ? '2D BOX' : '3D CUBE'}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-300 font-mono">Health Bar Indicator</span>
                            <button
                              onClick={() => onUpdateSetting('espShowHealth', !settings.espShowHealth)}
                              className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                                settings.espShowHealth ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                              }`}
                            >
                              {settings.espShowHealth ? 'ENABLED' : 'DISABLED'}
                            </button>
                          </div>
                        </div>
                      )}

                      {item.id === 'streamerMode' && (
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>OBS & Streamlabs Screen Filter Active</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Masks sensitive player usernames, hides system latency telemetry, and creates watermark protection.
                          </p>
                        </div>
                      )}

                      {item.id === 'bodySettings' && (
                        <div className="space-y-2">
                          <span className="text-[11px] text-slate-300 font-mono">Target Hitbox Zone</span>
                          <div className="grid grid-cols-3 gap-1">
                            {(['HEAD', 'NECK', 'CHEST'] as HitboxTarget[]).map((target) => (
                              <button
                                key={target}
                                onClick={() => onUpdateSetting('bodyHitbox', target)}
                                className={`py-1 text-[10px] font-mono rounded transition-colors ${
                                  settings.bodyHitbox === target
                                    ? 'bg-[#168BFF] text-white font-semibold'
                                    : 'bg-[#121E32] text-slate-400 hover:text-white'
                                }`}
                              >
                                {target}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Branding matching Compose file */}
          <div className="text-center pt-3 pb-6">
            <h3 className="text-[16px] font-bold tracking-wide text-[#168BFF]">
              PAWAN RAJPUT PANEL
            </h3>
            <p className="text-[11px] font-medium text-slate-400 tracking-wider">
              ANDROID DEMO VERSION
            </p>
            <p className="text-[9px] text-slate-500 mt-2 font-mono">
              Standalone Visual Demo · Safe Simulation
            </p>
          </div>
        </div>

        {/* Android Gesture Bar */}
        <div className="h-5 flex items-center justify-center bg-[#080D19] z-20 pb-1">
          <div className="w-24 h-1 bg-slate-600 rounded-full opacity-60" />
        </div>
      </div>
    </div>
  );
};
