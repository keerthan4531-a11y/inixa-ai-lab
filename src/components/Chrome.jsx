import { useMemo } from 'react'
import { Link } from '../router.jsx'
import { MAINTAINER, RELEASES, REPO, TELEGRAM, TELEGRAM_CHANNEL } from '../content.js'
import { LATEST_RELEASE as RELEASE } from '../releases.js'
import { DownloadIcon, GithubIcon, Mark, TelegramIcon } from '../icons.jsx'

export const RELEASE_PATH = `/release/${RELEASE.version}`

/*
 * The parts every page wears.
 *
 * These lived inside App while there was only one page. There are two now, and
 * a footer that is right on one of them and stale on the other is worse than no
 * footer, so they moved here — one definition, both pages.
 */

/**
 * The announcement strip.
 *
 * Full width, one sentence, and the only thing on the page above the nav. A
 * release is news exactly once; this is where news goes, and it is a link
 * rather than a banner you have to dismiss, because nothing here interrupts
 * anything.
 */
export function AnnounceBar() {
  return (
    <a className="announce" href="#apks">
      <span className="announce-tag">INIXA LABS</span>
      <span className="announce-text">
        Frontiers of AI & Flagship Mobile Software — 8 Production Apps & 13 Verified APK Releases are live.
      </span>
      <span className="announce-go" aria-hidden="true">
        ›
      </span>
    </a>
  )
}

/** The thin global bar. Deliberately quiet; it is about the project, not the page. */
export function TopBar() {
  return (
    <div className="topbar">
      <nav className="topbar-inner" aria-label="Project">
        <a className="wordmark" href="#overview" aria-label="INIXA LABS">
          <Mark />
          <span style={{ fontWeight: 800, letterSpacing: '0.04em', fontSize: '15px', color: '#fff' }}>
            INIXA <span style={{ color: '#06b6d4', fontSize: '12px' }}>LABS</span>
          </span>
        </a>
        <a href="#labs">
          Labs
        </a>
        <a href="#showcase" className="hide-sm">
          3D Hardware
        </a>
        <a href="#apks">
          All 13 APKs
        </a>
        <a className="hide-sm" href="#features">
          Architecture
        </a>
        <a className="hide-sm" href="#download">
          Download
        </a>
        <a
          className="topicon"
          href="#apks"
          aria-label="Download the APKs"
        >
          <DownloadIcon />
        </a>
      </nav>
    </div>
  )
}

/**
 * @param onNotes opens the short release-notes sheet. Only the home page has
 *   one mounted, so the two entries that open it are omitted without it rather
 *   than rendered dead.
 */
export function SiteFooter({ onNotes }) {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-mark">
          <Mark />
          INIXA LABS
        </div>

        <div className="footer-grid">
          <div>
            <h4>INIXA Ecosystem</h4>
            <ul>
              <li>
                <a href="#overview">Overview</a>
              </li>
              <li>
                <a href="#labs">INIXA Labs</a>
              </li>
              <li>
                <a href="#showcase">3D Hardware</a>
              </li>
              <li>
                <a href="#highlights">Beat Box Ultra</a>
              </li>
              <li>
                <a href="#apks">All 13 APKs</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Flagship Apps</h4>
            <ul>
              <li>
                <a href="#labs">INIXA AI</a>
              </li>
              <li>
                <a href="#highlights">Beat Box Ultra</a>
              </li>
              <li>
                <a href="#labs">Beat Box Pro</a>
              </li>
              <li>
                <a href="#labs">Liquid Stream</a>
              </li>
              <li>
                <a href="#labs">Clipster</a>
              </li>
              <li>
                <a href="#labs">Lumina Browser</a>
              </li>
              <li>
                <a href="#labs">My Tube</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>APK Repository</h4>
            <ul>
              <li>
                <a href="#apks">All 13 APK Binaries</a>
              </li>
              <li>
                <a href="/apks/inixa-ai-v1.0.0.apk" download>INIXA AI (3.93 MB)</a>
              </li>
              <li>
                <a href="/apks/beat-box-ultra-v1.0.405-arm64.apk" download>Beat Box Ultra (133 MB)</a>
              </li>
              <li>
                <a href="/apks/liquid-stream-v1.4.2.apk" download>Liquid Stream (33 MB)</a>
              </li>
              <li>
                <a href="/apks/lumina-browser-v5.295.3-internal.apk" download>Lumina Browser (188 MB)</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Architecture</h4>
            <ul>
              <li>
                <a href="#features">64-Bit Floating DSP</a>
              </li>
              <li>
                <a href="#features">HLS Zero-Buffer Engine</a>
              </li>
              <li>
                <a href="#features">Zero-Telemetry Pipeline</a>
              </li>
              <li>
                <a href="#features">Liquid Glass Shaders</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>About INIXA</h4>
            <ul>
              <li>
                INIXA LABS — Core Team
              </li>
              <li>
                Direct Sideload Ready
              </li>
              <li>
                Zero User Tracking
              </li>
              <li>
                Free & Open Ecosystem
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <p>
            © {year} INIXA LABS. All rights reserved. Engineered with pride for freedom, speed, and privacy.
          </p>
          <p>
            INIXA LABS develops independent, uncompromised mobile and AI software.
          </p>
        </div>
      </div>
    </footer>
  )
}
