import React, { useState } from 'react';
import { PanelSettings } from './types/panel';
import { TopBar } from './components/TopBar';
import { PhoneSimulator } from './components/PhoneSimulator';
import { TacticalHudCanvas } from './components/TacticalHudCanvas';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { FloatingWidget } from './components/FloatingWidget';
import {
  ShieldAlert,
  Smartphone,
  Eye,
  Crosshair,
  Sliders,
  Terminal,
  CheckCircle2,
  Download,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'SPLIT' | 'HUD' | 'PHONE'>('SPLIT');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Core settings state
  const [settings, setSettings] = useState<PanelSettings>({
    aimbot: true,
    espLine: true,
    espBox: true,
    streamerMode: false,
    bodySettings: true,

    aimbotFov: 110,
    aimbotSmooth: 4,
    aimbotPriority: 'FOV',

    espLineColor: '#168BFF',
    espLineOrigin: 'BOTTOM_CENTER',
    espLineThickness: 1.5,

    espBoxStyle: 'CORNERS',
    espShowHealth: true,
    espShowDistance: true,
    espShowName: true,

    bodyHitbox: 'HEAD',
    bodyShowBones: true,

    targetSpeed: 1,
    targetCount: 4,
  });

  const handleToggleSetting = (key: keyof PanelSettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateSetting = <K extends keyof PanelSettings>(key: K, value: PanelSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col">
      {/* Top Navigation Bar following 3-zone contract */}
      <TopBar
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Intro Banner with status info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 bg-[#080D19] border border-[#121E32] rounded-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#168BFF]">
              <span>JETPACK COMPOSE SIMULATION</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">ANDROID KOTLIN APK READY</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Pawan Rajput Premium Gaming Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Live visual demo displaying real-time AimBot FOV tracking, ESP tracer lines, tactical bounding boxes, streamer privacy mode, and skeletal body hitboxes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View switcher buttons for small screens */}
            <div className="flex md:hidden bg-[#0A1224] p-1 rounded-xl border border-[#1E3354]">
              <button
                onClick={() => setActiveView('SPLIT')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeView === 'SPLIT' ? 'bg-[#168BFF] text-white' : 'text-slate-400'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setActiveView('HUD')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeView === 'HUD' ? 'bg-[#168BFF] text-white' : 'text-slate-400'
                }`}
              >
                HUD
              </button>
              <button
                onClick={() => setActiveView('PHONE')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeView === 'PHONE' ? 'bg-[#168BFF] text-white' : 'text-slate-400'
                }`}
              >
                Phone
              </button>
            </div>

            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#121E32] hover:bg-[#1E3354] text-[#168BFF] border border-[#168BFF]/40 rounded-xl transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Android Studio Files</span>
            </button>
          </div>
        </div>

        {/* Dynamic Layout Based on activeView */}
        {activeView === 'SPLIT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Tactical HUD Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <TacticalHudCanvas
                settings={settings}
                onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
              />

              {/* Quick Status Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#080D19] border border-[#121E32] rounded-xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">AimBot FOV</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {settings.aimbot ? `${settings.aimbotFov}px active` : 'Disabled'}
                  </span>
                </div>
                <div className="p-3 bg-[#080D19] border border-[#121E32] rounded-xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">ESP Tracer</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {settings.espLine ? settings.espLineOrigin : 'Off'}
                  </span>
                </div>
                <div className="p-3 bg-[#080D19] border border-[#121E32] rounded-xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">ESP Box</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {settings.espBox ? settings.espBoxStyle : 'Off'}
                  </span>
                </div>
                <div className="p-3 bg-[#080D19] border border-[#121E32] rounded-xl">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Lock Hitbox</span>
                  <span className="text-sm font-bold font-mono text-[#168BFF]">
                    {settings.bodySettings ? settings.bodyHitbox : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Phone Simulator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <PhoneSimulator
                settings={settings}
                onToggleSetting={handleToggleSetting}
                onUpdateSetting={handleUpdateSetting}
              />
            </div>
          </div>
        )}

        {activeView === 'HUD' && (
          <div className="flex flex-col gap-4">
            <TacticalHudCanvas
              settings={settings}
              onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
            />

            {/* Sub-controls Strip */}
            <div className="p-4 bg-[#080D19] border border-[#121E32] rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                <span className="text-slate-500">Active Settings:</span>
                <span className={settings.aimbot ? 'text-[#168BFF]' : 'text-slate-600'}>
                  AIMBOT: {settings.aimbot ? 'ON' : 'OFF'}
                </span>
                <span className={settings.espLine ? 'text-[#168BFF]' : 'text-slate-600'}>
                  ESP LINE: {settings.espLine ? 'ON' : 'OFF'}
                </span>
                <span className={settings.espBox ? 'text-[#168BFF]' : 'text-slate-600'}>
                  ESP BOX: {settings.espBox ? 'ON' : 'OFF'}
                </span>
                <span className={settings.streamerMode ? 'text-emerald-400' : 'text-slate-600'}>
                  STREAMER: {settings.streamerMode ? 'ON' : 'OFF'}
                </span>
              </div>

              <button
                onClick={() => setActiveView('SPLIT')}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#121E32] hover:bg-[#1E3354] text-slate-200 rounded-lg transition-colors border border-[#1E3354]"
              >
                Open Phone Panel View
              </button>
            </div>
          </div>
        )}

        {activeView === 'PHONE' && (
          <div className="flex flex-col items-center justify-center py-4">
            <PhoneSimulator
              settings={settings}
              onToggleSetting={handleToggleSetting}
              onUpdateSetting={handleUpdateSetting}
            />
          </div>
        )}

        {/* Educational Compliance & Security Banner */}
        <div className="mt-8 p-4 bg-[#080D19] border border-[#121E32] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#168BFF]/20 text-[#168BFF] shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                Visual Demo & Educational Simulation
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ye standalone visual demo hai. Yeh application kisi game ke memory, binary ya network packets ko modify nahi karta. Full Android Studio Kotlin source code available hai.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#168BFF] hover:text-white bg-[#121E32] hover:bg-[#168BFF] rounded-lg transition-colors whitespace-nowrap shrink-0 border border-[#1E3354]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Android APK Build Code</span>
          </button>
        </div>
      </main>

      {/* Floating Action Menu for Quick In-Game Testing */}
      <FloatingWidget
        settings={settings}
        onToggleSetting={handleToggleSetting}
      />

      {/* Code Viewer & APK Guide Modal */}
      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
