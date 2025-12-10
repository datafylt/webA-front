<template>
  <CommonPage>
    <div class="component-tree-page">
      <n-card title="Component Relationship Trees & Diagrams" class="mb-4">
        <template #header-extra>
          <n-space>
            <n-button @click="expandAll" size="small">
              <template #icon><TheIcon icon="mdi:expand-all" /></template>
              Expand All
            </n-button>
            <n-button @click="collapseAll" size="small">
              <template #icon><TheIcon icon="mdi:collapse-all" /></template>
              Collapse All
            </n-button>
          </n-space>
        </template>

        <n-tabs type="line" animated>
          <!-- Application Structure Tab -->
          <n-tab-pane name="app-structure" tab="Application Structure">
            <div class="tree-container">
              <n-tree
                :data="appStructureData"
                block-line
                expand-on-click
                :default-expanded-keys="defaultExpandedKeys"
                :render-prefix="renderPrefix"
                ref="appTreeRef"
              />
            </div>
          </n-tab-pane>

          <!-- Public Pages Tab -->
          <n-tab-pane name="public-pages" tab="Public Website">
            <div class="tree-container">
              <n-tree
                :data="publicPagesData"
                block-line
                expand-on-click
                :default-expanded-keys="publicExpandedKeys"
                :render-prefix="renderPrefix"
                ref="publicTreeRef"
              />
            </div>
          </n-tab-pane>

          <!-- Admin Layout Tab -->
          <n-tab-pane name="admin-layout" tab="Admin Layout">
            <div class="tree-container">
              <n-tree
                :data="adminLayoutData"
                block-line
                expand-on-click
                :default-expanded-keys="adminExpandedKeys"
                :render-prefix="renderPrefix"
                ref="adminTreeRef"
              />
            </div>
          </n-tab-pane>

          <!-- Component Library Tab -->
          <n-tab-pane name="components" tab="Shared Components">
            <div class="tree-container">
              <n-tree
                :data="sharedComponentsData"
                block-line
                expand-on-click
                :default-expanded-keys="componentsExpandedKeys"
                :render-prefix="renderPrefix"
                ref="componentsTreeRef"
              />
            </div>
          </n-tab-pane>

          <!-- Visual Diagram Tab -->
          <n-tab-pane name="diagram" tab="Visual Diagram">
            <div class="diagram-container">
              <div class="diagram-legend">
                <div class="legend-item">
                  <span class="legend-color layout"></span> Layout
                </div>
                <div class="legend-item">
                  <span class="legend-color page"></span> Page/View
                </div>
                <div class="legend-item">
                  <span class="legend-color component"></span> Component
                </div>
                <div class="legend-item">
                  <span class="legend-color store"></span> Store/State
                </div>
                <div class="legend-item">
                  <span class="legend-color util"></span> Utility/Service
                </div>
              </div>
              
              <div class="architecture-diagram">
                <div class="diagram-row">
                  <div class="diagram-box app">
                    <strong>App.vue</strong>
                    <span>Root Component</span>
                  </div>
                </div>
                
                <div class="diagram-arrow">↓</div>
                
                <div class="diagram-row">
                  <div class="diagram-box router">
                    <strong>Vue Router</strong>
                    <span>Route Management</span>
                  </div>
                </div>
                
                <div class="diagram-arrow">↓</div>
                
                <div class="diagram-row layouts-row">
                  <div class="diagram-box layout">
                    <strong>PublicLayout</strong>
                    <span>Public Website</span>
                  </div>
                  <div class="diagram-box layout">
                    <strong>AdminLayout</strong>
                    <span>Admin Dashboard</span>
                  </div>
                </div>
                
                <div class="diagram-row pages-row">
                  <div class="pages-group">
                    <div class="group-label">Public Pages</div>
                    <div class="diagram-box page">Home</div>
                    <div class="diagram-box page">About</div>
                    <div class="diagram-box page">Programs</div>
                    <div class="diagram-box page">Contact</div>
                    <div class="diagram-box page">Instructors</div>
                  </div>
                  <div class="pages-group">
                    <div class="group-label">Admin Pages</div>
                    <div class="diagram-box page">Workbench</div>
                    <div class="diagram-box page">Dashboard</div>
                    <div class="diagram-box page">Users</div>
                    <div class="diagram-box page">Settings</div>
                  </div>
                </div>
                
                <div class="diagram-row components-row">
                  <div class="shared-components">
                    <div class="group-label">Shared Components</div>
                    <div class="components-grid">
                      <div class="diagram-box component">BreadcrumbSection</div>
                      <div class="diagram-box component">CtaSection</div>
                      <div class="diagram-box component">TeamSection</div>
                      <div class="diagram-box component">TestimonialsSection</div>
                      <div class="diagram-box component">CrudTable</div>
                      <div class="diagram-box component">CrudModal</div>
                    </div>
                  </div>
                </div>
                
                <div class="diagram-row services-row">
                  <div class="diagram-box store">
                    <strong>Pinia Store</strong>
                    <span>State Management</span>
                  </div>
                  <div class="diagram-box util">
                    <strong>HTTP Client</strong>
                    <span>API Requests</span>
                  </div>
                  <div class="diagram-box util">
                    <strong>Auth Utils</strong>
                    <span>Authentication</span>
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <!-- File Statistics -->
      <n-card title="Project Statistics" class="stats-card">
        <n-grid :cols="4" :x-gap="16" :y-gap="16">
          <n-gi>
            <n-statistic label="Vue Components" :value="stats.vueFiles" />
          </n-gi>
          <n-gi>
            <n-statistic label="JavaScript Files" :value="stats.jsFiles" />
          </n-gi>
          <n-gi>
            <n-statistic label="CSS/SCSS Files" :value="stats.cssFiles" />
          </n-gi>
          <n-gi>
            <n-statistic label="Total Files" :value="stats.totalFiles" />
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive } from 'vue'
import { NIcon } from 'naive-ui'
import { CommonPage } from '@/components/page'
import { TheIcon } from '@/components/icon'

// Tree refs
const appTreeRef = ref(null)
const publicTreeRef = ref(null)
const adminTreeRef = ref(null)
const componentsTreeRef = ref(null)

// Statistics
const stats = reactive({
  vueFiles: 45,
  jsFiles: 28,
  cssFiles: 12,
  totalFiles: 85
})

// Render prefix icon
const renderPrefix = ({ option }) => {
  const iconMap = {
    folder: 'mdi:folder',
    vue: 'mdi:vuejs',
    js: 'mdi:language-javascript',
    css: 'mdi:language-css3',
    layout: 'mdi:page-layout-body',
    page: 'mdi:file-document',
    component: 'mdi:puzzle',
    store: 'mdi:database',
    router: 'mdi:routes',
    util: 'mdi:wrench'
  }
  
  const icon = iconMap[option.type] || 'mdi:file'
  const color = {
    folder: '#f0a020',
    vue: '#42b883',
    js: '#f7df1e',
    css: '#264de4',
    layout: '#0277BC',
    page: '#9c27b0',
    component: '#ff5722',
    store: '#4caf50',
    router: '#2196f3',
    util: '#607d8b'
  }[option.type] || '#666'

  return h(TheIcon, { icon, style: { color } })
}

// Default expanded keys
const defaultExpandedKeys = ref(['app', 'src'])
const publicExpandedKeys = ref(['public-layout', 'public-pages'])
const adminExpandedKeys = ref(['admin-layout', 'admin-pages'])
const componentsExpandedKeys = ref(['shared', 'public-components'])

// Application Structure Data
const appStructureData = ref([
  {
    key: 'app',
    label: 'App.vue (Root)',
    type: 'vue',
    children: [
      {
        key: 'router',
        label: 'Vue Router',
        type: 'router',
        children: [
          { key: 'public-routes', label: 'public.js', type: 'js' },
          { key: 'admin-routes', label: 'index.js', type: 'js' },
          { key: 'guards', label: 'guards/', type: 'folder' }
        ]
      },
      {
        key: 'store',
        label: 'Pinia Store',
        type: 'store',
        children: [
          { key: 'user-store', label: 'user/', type: 'folder' },
          { key: 'app-store', label: 'app/', type: 'folder' },
          { key: 'permission-store', label: 'permission/', type: 'folder' },
          { key: 'tags-store', label: 'tags/', type: 'folder' }
        ]
      },
      {
        key: 'layouts',
        label: 'Layouts',
        type: 'folder',
        children: [
          { key: 'public-layout', label: 'PublicLayout/', type: 'layout' },
          { key: 'admin-layout', label: 'AdminLayout/', type: 'layout' }
        ]
      }
    ]
  }
])

// Public Pages Data
const publicPagesData = ref([
  {
    key: 'public-layout',
    label: 'PublicLayout',
    type: 'layout',
    children: [
      { key: 'header', label: 'Header (Navigation)', type: 'component' },
      { key: 'router-view', label: '<router-view />', type: 'vue' },
      { key: 'footer', label: 'Footer', type: 'component' }
    ]
  },
  {
    key: 'public-pages',
    label: 'Public Pages',
    type: 'folder',
    children: [
      {
        key: 'home',
        label: 'home.vue',
        type: 'page',
        children: [
          { key: 'home-slider', label: 'Slider Section', type: 'component' },
          { key: 'home-callouts', label: 'Callouts Grid', type: 'component' },
          { key: 'home-counters', label: 'Counters Section', type: 'component' },
          { key: 'home-about', label: 'About Section', type: 'component' },
          { key: 'home-cta', label: 'CtaSection', type: 'component' },
          { key: 'home-team', label: 'TeamSection', type: 'component' },
          { key: 'home-testimonials', label: 'TestimonialsSection', type: 'component' }
        ]
      },
      {
        key: 'about',
        label: 'about.vue',
        type: 'page',
        children: [
          { key: 'about-breadcrumb', label: 'BreadcrumbSection', type: 'component' },
          { key: 'about-content', label: 'About Content', type: 'component' },
          { key: 'about-cta', label: 'CtaSection', type: 'component' },
          { key: 'about-team', label: 'TeamSection', type: 'component' },
          { key: 'about-testimonials', label: 'TestimonialsSection', type: 'component' }
        ]
      },
      {
        key: 'programs',
        label: 'programs/',
        type: 'folder',
        children: [
          { key: 'programs-list', label: 'programs.vue', type: 'page' },
          { key: 'program-detail', label: 'program-detail.vue', type: 'page' },
          { key: 'programs-data', label: 'programsData.js', type: 'js' }
        ]
      },
      {
        key: 'contact',
        label: 'contact.vue',
        type: 'page',
        children: [
          { key: 'contact-breadcrumb', label: 'BreadcrumbSection', type: 'component' },
          { key: 'contact-form', label: 'Contact Form', type: 'component' },
          { key: 'contact-info', label: 'Contact Info', type: 'component' },
          { key: 'contact-map', label: 'Google Map', type: 'component' }
        ]
      },
      {
        key: 'instructors',
        label: 'instructors.vue',
        type: 'page',
        children: [
          { key: 'instructors-breadcrumb', label: 'BreadcrumbSection', type: 'component' },
          { key: 'instructors-intro', label: 'Team Intro', type: 'component' },
          { key: 'instructors-gallery', label: 'Team Gallery', type: 'component' },
          { key: 'instructors-testimonials', label: 'TestimonialsSection', type: 'component' }
        ]
      }
    ]
  },
  {
    key: 'public-components',
    label: 'Shared Components',
    type: 'folder',
    children: [
      { key: 'breadcrumb-section', label: 'BreadcrumbSection.vue', type: 'vue' },
      { key: 'cta-section', label: 'CtaSection.vue', type: 'vue' },
      { key: 'team-section', label: 'TeamSection.vue', type: 'vue' },
      { key: 'testimonials-section', label: 'TestimonialsSection.vue', type: 'vue' }
    ]
  },
  {
    key: 'public-styles',
    label: 'Scoped CSS Files',
    type: 'folder',
    children: [
      { key: 'public-css', label: 'public.css', type: 'css' },
      { key: 'home-css', label: 'home.scoped.css', type: 'css' },
      { key: 'about-css', label: 'about.scoped.css', type: 'css' },
      { key: 'contact-css', label: 'contact.scoped.css', type: 'css' },
      { key: 'instructors-css', label: 'instructors.scoped.css', type: 'css' },
      { key: 'programs-css', label: 'programs.scoped.css', type: 'css' },
      { key: 'program-detail-css', label: 'program-detail.scoped.css', type: 'css' }
    ]
  }
])

// Admin Layout Data
const adminLayoutData = ref([
  {
    key: 'admin-layout',
    label: 'AdminLayout (index.vue)',
    type: 'layout',
    children: [
      {
        key: 'sidebar',
        label: 'Sidebar',
        type: 'component',
        children: [
          { key: 'side-logo', label: 'SideLogo.vue', type: 'vue' },
          { key: 'side-menu', label: 'SideMenu.vue', type: 'vue' }
        ]
      },
      {
        key: 'header',
        label: 'Header',
        type: 'component',
        children: [
          { key: 'menu-collapse', label: 'MenuCollapse.vue', type: 'vue' },
          { key: 'breadcrumb', label: 'BreadCrumb.vue', type: 'vue' },
          { key: 'fullscreen', label: 'FullScreen.vue', type: 'vue' },
          { key: 'languages', label: 'Languages.vue', type: 'vue' },
          { key: 'theme-mode', label: 'ThemeMode.vue', type: 'vue' },
          { key: 'user-avatar', label: 'UserAvatar.vue', type: 'vue' }
        ]
      },
      {
        key: 'tags',
        label: 'Tags',
        type: 'component',
        children: [
          { key: 'tags-index', label: 'index.vue', type: 'vue' },
          { key: 'context-menu', label: 'ContextMenu.vue', type: 'vue' }
        ]
      },
      { key: 'app-main', label: 'AppMain.vue', type: 'vue' }
    ]
  },
  {
    key: 'admin-pages',
    label: 'Admin Pages',
    type: 'folder',
    children: [
      { key: 'workbench', label: 'workbench/', type: 'page' },
      { key: 'dashboard', label: 'dashboard/', type: 'page' },
      { key: 'profile', label: 'profile/', type: 'page' },
      {
        key: 'system',
        label: 'system/',
        type: 'folder',
        children: [
          { key: 'system-user', label: 'user/', type: 'page' },
          { key: 'system-role', label: 'role/', type: 'page' },
          { key: 'system-menu', label: 'menu/', type: 'page' },
          { key: 'system-dept', label: 'dept/', type: 'page' },
          { key: 'system-api', label: 'api/', type: 'page' },
          { key: 'system-auditlog', label: 'auditlog/', type: 'page' }
        ]
      },
      { key: 'website-a', label: 'website-a/', type: 'folder' },
      { key: 'website-b', label: 'website-b/', type: 'folder' }
    ]
  }
])

// Shared Components Data
const sharedComponentsData = ref([
  {
    key: 'shared',
    label: 'components/',
    type: 'folder',
    children: [
      {
        key: 'common',
        label: 'common/',
        type: 'folder',
        children: [
          { key: 'app-provider', label: 'AppProvider.vue', type: 'vue' },
          { key: 'app-footer', label: 'AppFooter.vue', type: 'vue' },
          { key: 'loading-wrapper', label: 'LoadingEmptyWrapper.vue', type: 'vue' },
          { key: 'scroll-x', label: 'ScrollX.vue', type: 'vue' }
        ]
      },
      {
        key: 'icon',
        label: 'icon/',
        type: 'folder',
        children: [
          { key: 'the-icon', label: 'TheIcon.vue', type: 'vue' },
          { key: 'svg-icon', label: 'SvgIcon.vue', type: 'vue' },
          { key: 'custom-icon', label: 'CustomIcon.vue', type: 'vue' },
          { key: 'icon-picker', label: 'IconPicker.vue', type: 'vue' }
        ]
      },
      {
        key: 'page',
        label: 'page/',
        type: 'folder',
        children: [
          { key: 'app-page', label: 'AppPage.vue', type: 'vue' },
          { key: 'common-page', label: 'CommonPage.vue', type: 'vue' }
        ]
      },
      {
        key: 'table',
        label: 'table/',
        type: 'folder',
        children: [
          { key: 'crud-table', label: 'CrudTable.vue', type: 'vue' },
          { key: 'crud-modal', label: 'CrudModal.vue', type: 'vue' }
        ]
      },
      {
        key: 'query-bar',
        label: 'query-bar/',
        type: 'folder',
        children: [
          { key: 'query-bar', label: 'QueryBar.vue', type: 'vue' },
          { key: 'query-bar-item', label: 'QueryBarItem.vue', type: 'vue' }
        ]
      },
      {
        key: 'public-components',
        label: 'public/',
        type: 'folder',
        children: [
          { key: 'breadcrumb-section', label: 'BreadcrumbSection.vue', type: 'vue' },
          { key: 'cta-section', label: 'CtaSection.vue', type: 'vue' },
          { key: 'team-section', label: 'TeamSection.vue', type: 'vue' },
          { key: 'testimonials-section', label: 'TestimonialsSection.vue', type: 'vue' },
          { key: 'public-index', label: 'index.js', type: 'js' }
        ]
      }
    ]
  }
])

// Methods
const expandAll = () => {
  // Expand all trees
}

const collapseAll = () => {
  // Collapse all trees
}
</script>

<style scoped>
.component-tree-page {
  padding: 0;
}

.mb-4 {
  margin-bottom: 16px;
}

.tree-container {
  padding: 16px;
  background: var(--n-color);
  border-radius: 8px;
  min-height: 400px;
}

.diagram-container {
  padding: 24px;
}

.diagram-legend {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 8px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.layout { background: #0277BC; }
.legend-color.page { background: #9c27b0; }
.legend-color.component { background: #ff5722; }
.legend-color.store { background: #4caf50; }
.legend-color.util { background: #607d8b; }

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.diagram-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.diagram-arrow {
  font-size: 24px;
  color: #999;
}

.diagram-box {
  padding: 12px 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  color: #fff;
}

.diagram-box strong {
  display: block;
  font-size: 14px;
}

.diagram-box span {
  font-size: 11px;
  opacity: 0.8;
}

.diagram-box.app { background: #333; }
.diagram-box.router { background: #2196f3; }
.diagram-box.layout { background: #0277BC; }
.diagram-box.page { background: #9c27b0; font-size: 12px; padding: 8px 12px; min-width: auto; }
.diagram-box.component { background: #ff5722; font-size: 11px; padding: 6px 10px; min-width: auto; }
.diagram-box.store { background: #4caf50; }
.diagram-box.util { background: #607d8b; }

.layouts-row {
  gap: 40px;
}

.pages-row {
  gap: 60px;
  width: 100%;
  justify-content: center;
}

.pages-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.group-label {
  font-weight: 600;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.shared-components {
  text-align: center;
}

.components-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 500px;
}

.services-row {
  margin-top: 16px;
  gap: 16px;
}

.stats-card {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .diagram-legend {
    flex-direction: column;
    gap: 8px;
  }

  .pages-row {
    flex-direction: column;
    gap: 24px;
  }

  .services-row {
    flex-direction: column;
  }
}
</style>
