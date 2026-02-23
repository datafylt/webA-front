// src/plugins/global-icons.js
// Universal Icon Component Registration System
// Handles ALL icon types: custom SVG, mdi, ant-design, ic, carbon, etc.

import { h } from 'vue'
import TheIcon from '@/components/icon/TheIcon.vue'
import SvgIcon from '@/components/icon/SvgIcon.vue'

export function setupGlobalIcons(app) {
  // ============================================
  // Part 1: Custom SVG Icons (icon-custom-*)
  // ============================================
  const customIcons = [
    'logo',
    'no-data',
    'network-error',
    'unauthorized',
    'forbidden',
    'not-found',
    'server-error',
    'front-page',
    'service-unavailable',
  ]

  customIcons.forEach((iconName) => {
    app.component(`icon-custom-${iconName}`, {
      name: `IconCustom${iconName
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('')}`,
      inheritAttrs: true,
      render() {
        return h(SvgIcon, {
          icon: iconName,
          ...this.$attrs,
        })
      },
    })
  })

  // ============================================
  // Part 2: Iconify Icons - Universal Handler
  // ============================================

  /**
   * Create a component for any Iconify icon
   * @param {string} iconSet - The icon set (mdi, ant-design, ic, etc.)
   * @param {string} iconName - The icon name
   * @returns {Object} Vue component definition
   */
  function createIconifyComponent(iconSet, iconName) {
    return {
      name: `Icon${iconSet.replace(/[^a-zA-Z0-9]/g, '')}${iconName.replace(/[^a-zA-Z0-9]/g, '')}`,
      inheritAttrs: true,
      render() {
        return h(TheIcon, {
          icon: `${iconSet}:${iconName}`,
          size: this.$attrs.size,
          color: this.$attrs.color,
          class: this.$attrs.class,
          style: this.$attrs.style,
        })
      },
    }
  }

  // Define all icon sets and their commonly used icons
  const iconRegistry = {
    // Material Design Icons
    mdi: [
      'github',
      'globe',
      'web',
      'format-indent-increase',
      'format-indent-decrease',
      'account',
      'cog',
      'logout',
      'menu',
      'close',
      'home',
      'settings',
      'alert-circle-outline',
      'web-check',
      'account-group',
      'package-variant',
      'alpha-a-box',
      'alpha-b-box',
      'monitor-dashboard',
      'cart',
    ],

    // Ant Design Icons
    'ant-design': ['fullscreen-outlined', 'fullscreen-exit-outlined'],

    // Iconic Icons
    ic: [
      'baseline-keyboard-arrow-left',
      'baseline-keyboard-arrow-right',
      'baseline-keyboard-arrow-up',
      'baseline-keyboard-arrow-down',
    ],

    // Carbon Icons
    carbon: ['user', 'data-view'],

    // Tabler Icons
    tabler: ['error-404'],

    // Solar Icons
    solar: ['forbidden-circle-line-duotone'],

    // Icon Park Outline
    'icon-park-outline': ['workbench'],

    // Material Symbols
    'material-symbols': ['authenticator'],
  }

  // Register all icons from the registry
  Object.entries(iconRegistry).forEach(([iconSet, icons]) => {
    icons.forEach((iconName) => {
      const componentName = `icon-${iconSet}:${iconName}`
      app.component(componentName, createIconifyComponent(iconSet, iconName))
    })
  })

  // ============================================
  // Part 3: Dynamic Fallback Registration
  // ============================================
  // For any icon not in the registry above, create it dynamically

  const originalUnknownComponent = app.config.warnHandler

  app.config.warnHandler = (msg, instance, trace) => {
    // Check if it's a "Failed to resolve component: icon-" warning
    const iconMatch = msg.match(/Failed to resolve component: (icon-([^:]+):(.+))/)

    if (iconMatch) {
      const [, fullName, iconSet, iconName] = iconMatch

      // Dynamically register this icon
      if (!app._context.components[fullName]) {
        app.component(fullName, createIconifyComponent(iconSet, iconName))

        // Force re-render of the component that uses this icon
        if (instance) {
          instance.$forceUpdate?.()
        }
      }

      // Suppress the warning since we're handling it
      return
    }

    // For other warnings, use original handler
    if (originalUnknownComponent) {
      originalUnknownComponent(msg, instance, trace)
    }
  }
}
