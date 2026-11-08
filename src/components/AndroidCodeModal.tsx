import React, { useState } from 'react';
import {
  MAIN_ACTIVITY_KOTLIN,
  BUILD_GRADLE_KTS,
  ANDROID_MANIFEST_XML,
  downloadAndroidProjectZip,
} from '../utils/projectZip';
import {
  Copy,
  Check,
  Download,
  X,
  FileCode,
  BookOpen,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'KOTLIN' | 'GRADLE' | 'MANIFEST' | 'GUIDE'>('GUIDE');
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await downloadAndroidProjectZip();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#080D19] border border-[#168BFF]/40 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D1728] border-b border-[#1E3354]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#168BFF]/20 text-[#168BFF]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Android Studio Project & APK Generator
              </h2>
              <p className="text-xs text-slate-400">
                Project: <span className="text-[#168BFF] font-mono font-medium">PawanRajputPanel</span> · Package: <span className="text-slate-300 font-mono">com.pawanrajput.panel</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-[#168BFF] hover:bg-[#1270CF] text-white rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing ZIP...' : 'Download Project .ZIP'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E3354] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-[#080D19] border-b border-[#121E32]">
          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'GUIDE'
                ? 'border-[#168BFF] text-[#168BFF]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Setup & APK Guide (Hindi/Eng)</span>
          </button>

          <button
            onClick={() => setActiveTab('KOTLIN')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'KOTLIN'
                ? 'border-[#168BFF] text-[#168BFF]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>MainActivity.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('GRADLE')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'GRADLE'
                ? 'border-[#168BFF] text-[#168BFF]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>build.gradle.kts</span>
          </button>

          <button
            onClick={() => setActiveTab('MANIFEST')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'MANIFEST'
                ? 'border-[#168BFF] text-[#168BFF]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>AndroidManifest.xml</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'GUIDE' && (
            <div className="space-y-6">
              {/* Hindi Step-by-Step Box */}
              <div className="p-5 bg-[#0D1728] border border-[#1E3354] rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-[#168BFF]">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Android Studio में APK बनाने की स्टेप-बाय-स्टेप विधि (Hindi Guide)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-3.5 bg-[#080D19] border border-[#121E32] rounded-lg space-y-1.5">
                    <span className="font-bold text-[#168BFF]">Step 1: नया प्रोजेक्ट बनाएं</span>
                    <p className="text-slate-400 leading-relaxed">
                      Android Studio खोलें और <code className="text-[#168BFF]">New Project</code> पर क्लिक करें। Template में <strong className="text-white">Empty Activity</strong> (Jetpack Compose) चुनें।
                    </p>
                    <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                      <li>Name: <strong className="text-white">PawanRajputPanel</strong></li>
                      <li>Package: <strong className="text-white">com.pawanrajput.panel</strong></li>
                      <li>Language: <strong className="text-white">Kotlin</strong></li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-[#080D19] border border-[#121E32] rounded-lg space-y-1.5">
                    <span className="font-bold text-[#168BFF]">Step 2: MainActivity.kt में कोड पेस्ट करें</span>
                    <p className="text-slate-400 leading-relaxed">
                      Project navigator में जाएं:
                      <br />
                      <code className="text-slate-200">app → src → main → java → com.pawanrajput.panel → MainActivity.kt</code>
                      <br />
                      ऊपर दिए गए <strong className="text-white">MainActivity.kt</strong> टैब से कोड कॉपी करके यहां पेस्ट कर दें।
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#080D19] border border-[#121E32] rounded-lg space-y-1.5">
                    <span className="font-bold text-[#168BFF]">Step 3: APK Build करें</span>
                    <p className="text-slate-400 leading-relaxed">
                      Top Menu में <strong className="text-white">Build</strong> मेनू पर क्लिक करें:
                      <br />
                      <code className="text-[#168BFF]">Build → Build Bundle(s) / APK(s) → Build APK(s)</code>
                      <br />
                      Gradle 1 से 2 मिनट में APK बना देगा।
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#080D19] border border-[#121E32] rounded-lg space-y-1.5">
                    <span className="font-bold text-[#168BFF]">Step 4: APK अपने फोन में इनस्टॉल करें</span>
                    <p className="text-slate-400 leading-relaxed">
                      Build पूरा होने पर नीचे दाईं तरफ <strong className="text-white">locate</strong> का नोटिफिकेशन दिखेगा। उस पर क्लिक करके <code className="text-[#168BFF]">app-debug.apk</code> फाइल को अपने एंड्रॉइड फोन में भेजकर इनस्टॉल करें!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick 1-Click ZIP Option */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#121E32] border border-[#168BFF]/40 rounded-xl gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Direct Ready-Made Android Studio Project (.ZIP)
                  </h4>
                  <p className="text-xs text-slate-300">
                    पूरा फोल्डर स्ट्रक्चर, Gradle फाइल्स और Manifest सब पहले से सेट है। बस ZIP डाउनलोड करके Extract करें और Android Studio में <code className="text-[#168BFF]">File → Open</code> करें।
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-bold bg-[#168BFF] hover:bg-[#1270CF] text-white rounded-lg flex items-center justify-center gap-2 whitespace-nowrap shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ZIP</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'KOTLIN' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  app/src/main/java/com/pawanrajput/panel/MainActivity.kt
                </span>
                <button
                  onClick={() => handleCopy(MAIN_ACTIVITY_KOTLIN, 'KOTLIN')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#121E32] hover:bg-[#1E3354] text-[#168BFF] rounded-lg transition-colors border border-[#1E3354]"
                >
                  {copied === 'KOTLIN' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Kotlin Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-[#050811] border border-[#121E32] rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[460px]">
                {MAIN_ACTIVITY_KOTLIN}
              </pre>
            </div>
          )}

          {activeTab === 'GRADLE' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">app/build.gradle.kts</span>
                <button
                  onClick={() => handleCopy(BUILD_GRADLE_KTS, 'GRADLE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#121E32] hover:bg-[#1E3354] text-[#168BFF] rounded-lg transition-colors border border-[#1E3354]"
                >
                  {copied === 'GRADLE' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Gradle Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-[#050811] border border-[#121E32] rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[460px]">
                {BUILD_GRADLE_KTS}
              </pre>
            </div>
          )}

          {activeTab === 'MANIFEST' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">app/src/main/AndroidManifest.xml</span>
                <button
                  onClick={() => handleCopy(ANDROID_MANIFEST_XML, 'MANIFEST')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#121E32] hover:bg-[#1E3354] text-[#168BFF] rounded-lg transition-colors border border-[#1E3354]"
                >
                  {copied === 'MANIFEST' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Manifest Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-[#050811] border border-[#121E32] rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[460px]">
                {ANDROID_MANIFEST_XML}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
