// cookie-banner.js
class CookieBanner {
  constructor(options = {}) {
    this.gaId = options.gaId || "UA-XXXXXX-X";
    this.domain = options.domain || window.location.hostname;
    this.cookieName = options.cookieName || "cookieConsent";
    this.bannerId = "cookie-banner";

    document.addEventListener("DOMContentLoaded", () => {
      const consent = this.getConsent();
      if (consent) {
        this.loadScripts(consent);
      } else {
        this.createBanner();
      }
    });
  }

  createBanner() {
    const banner = document.createElement("div");
    banner.id = this.bannerId;
    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.background = "rgba(255, 255, 255, 0.98)";
    banner.style.borderTop = "1px solid #ddd";
    banner.style.padding = "20px";
    banner.style.boxShadow = "0 -2px 8px rgba(0,0,0,0.1)";
    banner.style.zIndex = "9999";
    banner.style.fontFamily = "Arial, sans-serif";
    banner.style.color = "#333";
    banner.style.fontSize = "14px";

    banner.innerHTML = `
      <div style="max-width: 960px; margin: auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
        <div style="flex: 1 1 300px; margin-bottom: 10px;">
          <strong>Wir verwenden Cookies</strong><br>
          Wir nutzen Cookies, um Funktionalität, Statistik & Marketing zu ermöglichen. Bitte wähle deine Einstellungen:
        </div>
        <div style="flex: 0 1 auto; display: flex; gap: 10px; align-items: center;">
          <label style="font-weight: normal; margin-right: 10px;">
            <input type="checkbox" checked disabled> Notwendig
          </label>
          <label style="font-weight: normal; margin-right: 10px;">
            <input type="checkbox" id="cb_stats"> Statistik
          </label>
          <label style="font-weight: normal; margin-right: 20px;">
            <input type="checkbox" id="cb_marketing"> Marketing
          </label>
          <button id="cb_accept" style="
            background-color: #0066cc;
            color: #fff;
            border: none;
            padding: 10px 18px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          ">Speichern</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.getElementById("cb_accept").addEventListener("click", () => this.saveConsent());
  }

  saveConsent() {
    const consent = {
      necessary: true,
      stats: document.getElementById("cb_stats").checked,
      marketing: document.getElementById("cb_marketing").checked
    };

    document.cookie =
      `${this.cookieName}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${60 * 60 * 24 * 365}; domain=${this.domain}`;

    const banner = document.getElementById(this.bannerId);
    if (banner) banner.remove();

    this.loadScripts(consent);
  }

  getConsent() {
    const match = document.cookie.match(new RegExp(`(?:^|; )${this.cookieName}=([^;]+)`));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[1]));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  loadScripts(consent) {
    if (consent.stats) {
      const ga = document.createElement("script");
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      document.head.appendChild(ga);
    }

    if (consent.marketing) {
      const fb = document.createElement("script");
      fb.innerHTML = "/* Hier dein Marketing-Code (z. B. Facebook Pixel) einfügen */";
      document.head.appendChild(fb);
    }
  }
}

new CookieBanner({
  gaId: "UA-XXXXXX-X",
  domain: ".tandemik.com"
});
