# 🍪 Cookie Consent Banner – GDPR-Compliant Cookie Management

A lightweight, self-hosted cookie consent script (similar to Cookiebot) that lets users decide which cookie categories (e.g., statistics, marketing) can be activated.  
The script runs entirely client-side and can be easily added to any HTML page.

## 🚀 Features

- ✅ GDPR-compliant cookie banner with selectable categories  
- ✅ No external provider required (100% self-hosted)  
- ✅ Consent stored locally in a cookie (`cookieConsent`)  
- ✅ Simple integration with a **single script in `<head>`**  
- ✅ Blocks tracking scripts until consent is given  
- ✅ Responsive design – fits any modern website  
- ✅ Fully customizable styling (colors, text, buttons)

## 📦 Installation

1. **Copy the script into your `<head>` section:**
   ```html
   <script src="cookie-banner.js"></script>
   ```
2. **Customize your tracking scripts in the code:**
   ```js
   if (consent.stats) {
     let ga = document.createElement("script");
     ga.src = "https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X";
     document.head.appendChild(ga);
   }
   ```
3. **Done!**
   The banner will appear on the first visit.  
   After consent is given, a cookie (`cookieConsent`) is stored and the banner will stay hidden on future visits.

## ⚙️ Cookie Structure

```json
{
  "necessary": true,
  "stats": true,
  "marketing": false
}
```

## 🎨 Customization

Edit the inline CSS or move it to an external `cookie-banner.css` file.

## 🧠 How It Works

1. Checks if `cookieConsent` cookie exists.  
2. Shows banner if not set.  
3. Stores consent for one year.  
4. Loads scripts based on consent.

## 🧩 Domain-Wide Consent

```js
document.cookie = "cookieConsent=" + encodeURIComponent(JSON.stringify(consent))
  + "; path=/; domain=.tandemik.com; max-age=" + (60*60*24*365);
```

## ⚖️ Legal Notice

Simplified solution — does not include automatic cookie scanning or consent logging.  
Ensure compliance with GDPR, ePrivacy, and TTDSG.

## 🧑‍💻 Author

Created by **Daniel Kolos**  
License: MIT License  
Last updated: October 2025

## ❤️ Example Integration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Website</title>
    <script src="cookie-banner.js"></script>
  </head>
  <body>
    <h1>Welcome!</h1>
  </body>
</html>
```

## 🔍 Future Improvements

- [ ] Add multilingual support  
- [ ] Add “Accept All” / “Reject All” buttons  
- [ ] Automatic script blocking via `data-category` attributes  
- [ ] Local or server-side consent logging
