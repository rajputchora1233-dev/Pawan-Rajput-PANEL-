import JSZip from 'jszip';

export const MAIN_ACTIVITY_KOTLIN = `package com.pawanrajput.panel

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Pawan Rajput Panel Colors
val Blue = Color(0xFF168BFF)
val Dark = Color(0xFF080D19)
val CardColor = Color(0xFF121E32)
val CardBorder = Color(0xFF1E3354)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = Dark
            ) {
                PanelScreen()
            }
        }
    }
}

@Composable
fun PanelScreen() {
    val settings = listOf(
        "AIMBOT VISUAL DEMO",
        "ESP LINE",
        "ESP BOX",
        "STREAMER MODE",
        "BODY SETTINGS"
    )

    val subtitles = listOf(
        "Simulation FOV & Crosshair Lock",
        "Laser tracer lines to target",
        "Tactical 2D/3D bounding boxes",
        "Hide gamer IDs & Stream safe",
        "Bone wireframe & Hitbox target"
    )

    val states = remember {
        mutableStateListOf(false, false, false, false, false)
    }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Dark)
            .padding(horizontal = 20.dp, vertical = 24.dp)
            .verticalScroll(scrollState),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(Modifier.height(20.dp))

        // Title
        Text(
            text = "PAWAN RAJPUT",
            color = Blue,
            fontSize = 29.sp,
            fontWeight = FontWeight.ExtraBold,
            letterSpacing = 1.sp
        )

        Text(
            text = "PREMIUM GAMING PANEL",
            color = Color.White.copy(alpha = 0.85f),
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium,
            letterSpacing = 2.sp
        )

        Spacer(Modifier.height(25.dp))

        // Section Title
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(
                text = "CONTROL CENTER",
                color = Blue,
                fontSize = 19.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.5.sp
            )
        }

        Spacer(Modifier.height(16.dp))

        // 5 Interactive Settings
        settings.forEachIndexed { index, name ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                colors = CardDefaults.cardColors(
                    containerColor = CardColor
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = name,
                            color = Color.White,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = subtitles[index],
                            color = Color.Gray,
                            fontSize = 11.sp
                        )
                    }

                    Switch(
                        checked = states[index],
                        onCheckedChange = { isChecked ->
                            states[index] = isChecked
                        },
                        colors = SwitchDefaults.colors(
                            checkedThumbColor = Color.White,
                            checkedTrackColor = Blue,
                            uncheckedThumbColor = Color.LightGray,
                            uncheckedTrackColor = Color(0xFF0B1422)
                        )
                    )
                }
            }
        }

        Spacer(Modifier.height(30.dp))

        // Footer Branding
        Text(
            text = "PAWAN RAJPUT PANEL",
            color = Blue,
            fontSize = 17.sp,
            fontWeight = FontWeight.Bold
        )

        Text(
            text = "ANDROID DEMO VERSION",
            color = Color.Gray,
            fontSize = 11.sp
        )

        Spacer(Modifier.height(8.dp))

        Text(
            text = "Standalone Visual Demo - Safe Educational Simulator",
            color = Color.Gray.copy(alpha = 0.6f),
            fontSize = 9.sp
        )

        Spacer(Modifier.height(20.dp))
    }
}
`;

export const BUILD_GRADLE_KTS = `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.pawanrajput.panel"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.pawanrajput.panel"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
}
`;

export const ANDROID_MANIFEST_XML = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Pawan Rajput Panel"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@android:style/Theme.Material.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`;

export const README_HINDI_ENGLISH = `# PAWAN RAJPUT PANEL - Android Demo Project

Official Android Studio Source Code for **PAWAN RAJPUT PANEL**.

## 📌 Features in this Demo:
1. **AIMBOT VISUAL DEMO** (Crosshair & FOV Lock simulation)
2. **ESP LINE** (Visual laser tracer line)
3. **ESP BOX** (Tactical bounding box)
4. **STREAMER MODE** (Privacy and safe display)
5. **BODY SETTINGS** (Target bone selection)

*Note: Standalone visual demo simulation. Safe, educational, does not alter third-party game files.*

---

## 🛠️ Hindi Guide: Android Studio में APK कैसे बनाएं (Build APK)

1. **Android Studio Open करें**:
   - \`File\` -> \`New\` -> \`New Project\` select करें।
   - Template: **Empty Activity** (Jetpack Compose) choose करें।
   - **Name**: \`PawanRajputPanel\`
   - **Package name**: \`com.pawanrajput.panel\`
   - **Language**: Kotlin
   - **Finish** पर click करें।

2. **Code Replace करें**:
   - \`app/src/main/java/com/pawanrajput/panel/MainActivity.kt\` open करें।
   - Is folder me diye gaye \`MainActivity.kt\` ke code ko copy karke paste kar dein.

3. **APK Generate करें**:
   - Top menu me \`Build\` par click karein.
   - \`Build Bundle(s) / APK(s)\` -> \`Build APK(s)\` select karein.
   - 1-2 minute me APK generate ho jayegi.
   - Neeche \`locate\` notification aayega, uspar click karke \`app-debug.apk\` apne mobile me install karein!

---

## 📱 English Quick Setup:
1. Open Android Studio -> New Project -> Empty Activity.
2. Package: \`com.pawanrajput.panel\`
3. Paste \`MainActivity.kt\`.
4. Click \`Build\` > \`Build Bundle(s) / APK(s)\` > \`Build APK(s)\`.
5. Enjoy the Pawan Rajput Panel!
`;

/**
 * Generates and downloads a complete zip archive of the Android Studio project
 */
export async function downloadAndroidProjectZip() {
  const zip = new JSZip();

  // Root files
  zip.file('README.md', README_HINDI_ENGLISH);
  
  // App module structure
  const app = zip.folder('app');
  if (app) {
    app.file('build.gradle.kts', BUILD_GRADLE_KTS);
    
    const src = app.folder('src');
    const main = src?.folder('main');
    
    if (main) {
      main.file('AndroidManifest.xml', ANDROID_MANIFEST_XML);
      
      const java = main.folder('java');
      const com = java?.folder('com');
      const pawan = com?.folder('pawanrajput');
      const panel = pawan?.folder('panel');
      
      if (panel) {
        panel.file('MainActivity.kt', MAIN_ACTIVITY_KOTLIN);
      }
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'PawanRajputPanel_Android_Studio_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
