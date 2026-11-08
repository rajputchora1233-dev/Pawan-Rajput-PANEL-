import React, { useState } from 'react';
import { PanelSettings } from '../types/panel';
import { playToggleSound } from '../utils/audio';
import { Sliders, X, Crosshair, Eye, Shield, User } from 'lucide-react';

interface FloatingWidgetProps {
  settings: PanelSettings;
  onToggleSetting: (key: keyof PanelSettings, value: boolean) => void;
}

export const FloatingWidget: React.FC<FloatingWidgetProps> = ({
  settings,
  onToggleSetting,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (key: keyof PanelSettings, current: boolean) => {
    const val = !current;
    playToggleSound(val);
    onToggleSetting(key, val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Menu Popup */}
      {isOpen && (
        <div className="mb-3 w-64 bg-[#080D19]/95 backdrop-blur-md border border-[#168BFF]/40 rounded-2xl p-4 shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#121E32] pb-2">
            <span className="text-xs font-bold text-[#168BFF] tracking-wider uppercase">
              Quick Overlay
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* Quick AimBot Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Crosshair className="w-3.5 h-3.5 text-[#168BFF]" />
                <span>AIMBOT DEMO</span>
              </div>
              <button
                onClick={() => toggle('aimbot', settings.aimbot)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  settings.aimbot ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                }`}
              >
                {settings.aimbot ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Quick ESP Line Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Eye className="w-3.5 h-3.5 text-[#168BFF]" />
                <span>ESP LINE</span>
              </div>
              <button
                onClick={() => toggle('espLine', settings.espLine)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  settings.espLine ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                }`}
              >
                {settings.espLine ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Quick ESP Box Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Shield className="w-3.5 h-3.5 text-[#168BFF]" />
                <span>ESP BOX</span>
              </div>
              <button
                onClick={() => toggle('espBox', settings.espBox)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  settings.espBox ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                }`}
              >
                {settings.espBox ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Quick Streamer Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>STREAMER</span>
              </div>
              <button
                onClick={() => toggle('streamerMode', settings.streamerMode)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  settings.streamerMode ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                }`}
              >
                {settings.streamerMode ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Quick Body Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <User className="w-3.5 h-3.5 text-[#168BFF]" />
                <span>BODY HITBOX</span>
              </div>
              <button
                onClick={() => toggle('bodySettings', settings.bodySettings)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  settings.bodySettings ? 'bg-[#168BFF] text-white' : 'bg-[#121E32] text-slate-400'
                }`}
              >
                {settings.bodySettings ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#168BFF] hover:bg-[#1270CF] text-white flex items-center justify-center shadow-xl shadow-[#168BFF]/40 border-2 border-white/20 transition-all hover:scale-105 active:scale-95"
        title="Floating Quick Menu"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
};
