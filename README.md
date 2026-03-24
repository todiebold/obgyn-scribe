# OB/GYN Scribe

AI-powered ambient documentation tool for OB/GYN clinical encounters. Built for SIU Medicine by Dr. Todd Diebold.

## What it does

- **Ambient listening** — records and transcribes patient encounters in real time using your phone's microphone
- **AI note generation** — produces structured SOAP notes, MDM analysis, and billing documentation from the transcript
- **E/M level suggestion** — recommends the appropriate E/M code with MDM justification
- **CPT + ICD-10 coding** — suggests relevant billing codes for OB and GYN encounters
- **Dot phrase output** — generates EHR-ready text for direct paste into Epic
- **Google Drive saving** — automatically saves formatted clinical notes to your Drive

## Supported visit types

- OB – New Visit
- OB – Return Prenatal
- OB – Postpartum
- OB – Inpatient / Laborist
- GYN – New Patient
- GYN – Return Patient
- GYN – Procedure Visit

## Architecture

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | GitHub Pages (`index.html`) | UI, microphone, speech recognition |
| Backend | Google Apps Script (`Code.gs`) | Claude API calls, Google Drive saving |
| AI | Anthropic Claude Sonnet | Note generation, MDM analysis, coding |
| Storage | Google Drive | Saved clinical notes as Google Docs |

The frontend is hosted on GitHub Pages (real HTTPS domain) so Chrome's microphone permission prompt works correctly. The backend runs entirely within your Google account.

## Setup

### Prerequisites
- Google account with Google Drive
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))
- GitHub account

### 1. Deploy the backend (Google Apps Script)

1. Go to [script.google.com](https://script.google.com) and create a new project named `OBGYNScribe`
2. Replace the contents of `Code.gs` with the `Code.gs` from this repo
3. Add your Anthropic API key on line 9:
   ```javascript
   const ANTHROPIC_API_KEY = "sk-ant-api03-...";
   ```
4. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (required for GitHub Pages fetch calls)
5. Copy the deployment URL — you'll need it in the next step

### 2. Configure the frontend

1. Open `index.html` in a text editor
2. On line 2, replace the placeholder with your GAS deployment URL:
   ```javascript
   var GAS_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
3. Save the file

### 3. Deploy to GitHub Pages

1. Fork or clone this repository
2. Upload your configured `index.html`
3. Go to **Settings → Pages → Source: main branch / root**
4. Your app will be live at `https://todiebold.github.io/obgyn-scribe/`

### 4. Add to Android home screen

1. Open the GitHub Pages URL in Chrome on Android
2. Tap the three-dot menu → **Add to Home screen**
3. On first use, allow microphone access when prompted

## HIPAA Notice

> ⚠️ **This tool does not persist PHI in the AI pipeline.** Patient identifiers (name, MRN, DOB) are stored only in your Google Drive and are never transmitted to the Anthropic API. The AI only receives de-identified transcript text.
>
> Before using with real patient data:
> - Confirm your Google Workspace account has an active **Business Associate Agreement (BAA)** with Google
> - Obtain a BAA with Anthropic for clinical use
> - Ensure all data transmission occurs over TLS (both GitHub Pages and GAS use HTTPS)
> - Review your institution's policies on AI-assisted documentation

## License

Copyright © 2026 Todd Diebold. All rights reserved.
See [LICENSE](LICENSE) for details.
