import React from 'react';
import { Download } from 'lucide-react';

interface TopBarProps {
  activeView: 'SPLIT' | 'HUD' | 'PHONE';
  onChangeView: (view: 'SPLIT' | 'HUD' | 'PHONE') => void;
  onOpenCodeModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onChangeView,
  onOpenCodeModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-[#121E32] bg-[#080D19]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-extrabold tracking-tight text-[#168BFF] whitespace-nowrap shrink-0 uppercase">
          PAWAN RAJPUT PANEL
        </span>
      </div>

      {/* Zone 2: 4 concise single-line text navigation links / view switcher */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onChangeView('SPLIT')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'SPLIT' ? 'text-[#168BFF] font-semibold' : ''
          }`}
        >
          Dual View
        </button>
        <button
          onClick={() => onChangeView('HUD')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'HUD' ? 'text-[#168BFF] font-semibold' : ''
          }`}
        >
          Tactical HUD
        </button>
        <button
          onClick={() => onChangeView('PHONE')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'PHONE' ? 'text-[#168BFF] font-semibold' : ''
          }`}
        >
          Phone Panel
        </button>
        <button
          onClick={onOpenCodeModal}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          APK Guide
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenCodeModal}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#168BFF] hover:bg-[#1270CF] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-[#168BFF]/20"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Get APK Code</span>
        </button>
      </div>
    </header>
  );
};
