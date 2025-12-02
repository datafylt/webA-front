/**
 * InitializeLoadeffectsvgformatlogo
 * @param {string} id - elementid
 */
 function initSvgLogo(id) {
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 302.82 365.25"><defs><style>.cls-1{stroke:#010101;stroke-miterlimit:10;stroke-width:0.25px;fill:url(#linear-gradient);}</style><linearGradient id="linear-gradient" x1="151.41" y1="0.13" x2="151.41" y2="365.12" gradientUnits="userSpaceOnUse"><stop offset="0.1" stop-color="#e3e3e3"/><stop offset="0.21" stop-color="#afafaf"/><stop offset="0.44" stop-color="#7d7b7c"/><stop offset="0.7" stop-color="#4b4849"/><stop offset="0.82" stop-color="#373435"/><stop offset="1"/></linearGradient></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M188.2.12H291.9c8.35.86,13.53,11.18,9.27,18.36s-6,15.33-11.42,21.59Q231.69,143,173.83,246.12c-2.9,5.53-1.69,12-1.87,18,.12,29.33.33,58.66.15,88a14.3,14.3,0,0,1-8.1,13h-4.84a14.41,14.41,0,0,1-6.66-5.65q-9-14.09-18-28.07a13.64,13.64,0,0,1-2.47-8.23c-.31-23.36-.75-46.7-1.07-70.06a17.29,17.29,0,0,0-2.29-8.73Q65.26,132.66,2.22,20.7C-2.62,13.38,1.2.9,10.79.42,69.92.17,129.06.38,188.2.12Z"/></g></g></svg>`
  const appEl = document.querySelector(id)
  const div = document.createElement('div')
  div.innerHTML = svgStr
  if (appEl) {
    appEl.appendChild(div)
  }
}

function addThemeColorCssVars() {
  const key = '__THEME_COLOR__'
  const defaultColor = '#2e5775'
  const themeColor = window.localStorage.getItem(key) || defaultColor
  const cssVars = `--primary-color: ${themeColor}`
  document.documentElement.style.cssText = cssVars
}

addThemeColorCssVars()

initSvgLogo('#loadingLogo')
