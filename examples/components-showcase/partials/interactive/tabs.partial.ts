/**
 * Tabs Partial
 *
 * Accessible tab interface with keyboard navigation and ARIA support.
 * Demonstrates advanced accessibility patterns and state management.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../src/types/partial.js';

/**
 * Tab item schema
 */
const TabItemSchema = z.object({
  id: z.string().min(1).describe('Unique tab identifier'),
  label: z.string().min(1).describe('Tab button label'),
  content: z.string().min(1).describe('Tab panel content (HTML)'),
  disabled: z.boolean().default(false).describe('Whether tab is disabled'),
  badge: z.string().optional().describe('Optional badge text'),
  icon: z.string().optional().describe('Optional icon (emoji or HTML)'),
});

/**
 * Tabs component props schema
 */
const TabsPropsSchema = z.object({
  tabs: z.array(TabItemSchema).min(1).describe('Array of tab items'),
  defaultTab: z.string().optional().describe('ID of default active tab'),
  variant: z
    .enum(['default', 'pills', 'underline', 'bordered'])
    .default('default')
    .describe('Tab style variant'),
  orientation: z
    .enum(['horizontal', 'vertical'])
    .default('horizontal')
    .describe('Tab orientation'),
  allowKeyboardNavigation: z
    .boolean()
    .default(true)
    .describe('Enable keyboard navigation'),
  lazy: z.boolean().default(false).describe('Lazy load tab content'),
  persistent: z
    .boolean()
    .default(false)
    .describe('Remember active tab in localStorage'),
  storageKey: z
    .string()
    .optional()
    .describe('localStorage key for persistent tabs'),
});

type TabsProps = z.infer<typeof TabsPropsSchema>;

/**
 * Tabs partial implementation
 */
export const tabsPartial: AgentPartial<TabsProps> = {
  schema: TabsPropsSchema,

  template: props => {
    const {
      tabs,
      defaultTab,
      variant,
      orientation,
      allowKeyboardNavigation,
      lazy,
      persistent,
      storageKey,
    } = props;

    // Generate unique tabs ID
    const tabsId = `tabs-${Math.random().toString(36).substr(2, 9)}`;
    const activeTabId = defaultTab || tabs[0]?.id;
    const effectiveStorageKey = storageKey || `${tabsId}-active-tab`;

    // Generate tab buttons
    const tabButtonsHtml = tabs
      .map((tab, index) => {
        const isActive = tab.id === activeTabId;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;

        return `
        <button
          class="tab-button ${isActive ? 'tab-button--active' : ''} ${tab.disabled ? 'tab-button--disabled' : ''}"
          id="${tabsId}-tab-${tab.id}"
          role="tab"
          aria-controls="${tabsId}-panel-${tab.id}"
          aria-selected="${isActive ? 'true' : 'false'}"
          tabindex="${isActive ? '0' : '-1'}"
          ${tab.disabled ? 'aria-disabled="true"' : ''}
          data-tab-id="${tab.id}"
          data-tab-index="${index}"
          ${isFirst ? 'data-first-tab' : ''}
          ${isLast ? 'data-last-tab' : ''}
        >
          ${tab.icon ? `<span class="tab-icon" aria-hidden="true">${tab.icon}</span>` : ''}
          <span class="tab-label">${tab.label}</span>
          ${tab.badge ? `<span class="tab-badge" aria-label="Badge: ${tab.badge}">${tab.badge}</span>` : ''}
        </button>
      `;
      })
      .join('');

    // Generate tab panels
    const tabPanelsHtml = tabs
      .map(tab => {
        const isActive = tab.id === activeTabId;

        return `
        <div
          class="tab-panel ${isActive ? 'tab-panel--active' : ''}"
          id="${tabsId}-panel-${tab.id}"
          role="tabpanel"
          aria-labelledby="${tabsId}-tab-${tab.id}"
          ${!isActive ? 'hidden' : ''}
          data-tab-content="${tab.id}"
        >
          ${
            lazy && !isActive
              ? `
            <div class="tab-panel__placeholder" data-lazy-content="${tab.id}">
              <div class="tab-loading">
                <span class="loading-spinner" aria-hidden="true"></span>
                <span>Loading content...</span>
              </div>
            </div>
          `
              : `
            <div class="tab-panel__content">
              ${tab.content}
            </div>
          `
          }
        </div>
      `;
      })
      .join('');

    return `
      <div 
        class="tabs tabs--${variant} tabs--${orientation}"
        data-tabs="${tabsId}"
        data-keyboard-nav="${allowKeyboardNavigation}"
        data-lazy="${lazy}"
        data-persistent="${persistent}"
        data-storage-key="${effectiveStorageKey}"
      >
        
        <!-- Tab List -->
        <div class="tab-list-wrapper">
          <div 
            class="tab-list"
            role="tablist"
            aria-label="Content sections"
            ${orientation === 'vertical' ? 'aria-orientation="vertical"' : ''}
          >
            ${tabButtonsHtml}
          </div>
        </div>
        
        <!-- Tab Panels -->
        <div class="tab-panels">
          ${tabPanelsHtml}
        </div>
        
      </div>

      <!-- Hidden content for lazy loading -->
      ${
        lazy
          ? `
        <script type="application/json" data-tabs-content="${tabsId}">
          ${JSON.stringify(
            tabs.reduce((acc, tab) => {
              acc[tab.id] = tab.content;
              return acc;
            }, {})
          )}
        </script>
      `
          : ''
      }

      <script>
        // Tabs functionality
        document.addEventListener('DOMContentLoaded', function() {
          const tabsContainer = document.querySelector('[data-tabs="${tabsId}"]');
          if (!tabsContainer) return;
          
          const tabButtons = tabsContainer.querySelectorAll('[role="tab"]');
          const tabPanels = tabsContainer.querySelectorAll('[role="tabpanel"]');
          const isKeyboardNav = tabsContainer.dataset.keyboardNav === 'true';
          const isLazy = tabsContainer.dataset.lazy === 'true';
          const isPersistent = tabsContainer.dataset.persistent === 'true';
          const storageKey = tabsContainer.dataset.storageKey;
          
          let activeTabId = '${activeTabId}';
          
          // Restore from localStorage if persistent
          if (isPersistent && storageKey) {
            const savedTab = localStorage.getItem(storageKey);
            if (savedTab && document.getElementById('${tabsId}-tab-' + savedTab)) {
              activeTabId = savedTab;
            }
          }
          
          // Lazy loading content map
          let lazyContent = {};
          if (isLazy) {
            const contentScript = document.querySelector('[data-tabs-content="${tabsId}"]');
            if (contentScript) {
              try {
                lazyContent = JSON.parse(contentScript.textContent);
              } catch (e) {
                console.warn('Failed to parse lazy content for tabs');
              }
            }
          }
          
          function activateTab(tabId, focus = false) {
            // Update buttons
            tabButtons.forEach(btn => {
              const isActive = btn.dataset.tabId === tabId;
              btn.classList.toggle('tab-button--active', isActive);
              btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
              btn.tabIndex = isActive ? 0 : -1;
              
              if (isActive && focus) {
                btn.focus();
              }
            });
            
            // Update panels
            tabPanels.forEach(panel => {
              const isActive = panel.dataset.tabContent === tabId;
              panel.classList.toggle('tab-panel--active', isActive);
              panel.hidden = !isActive;
              
              // Load lazy content
              if (isActive && isLazy) {
                loadLazyContent(tabId, panel);
              }
            });
            
            activeTabId = tabId;
            
            // Save to localStorage if persistent
            if (isPersistent && storageKey) {
              localStorage.setItem(storageKey, tabId);
            }
            
            // Emit custom event
            tabsContainer.dispatchEvent(new CustomEvent('tabchange', {
              detail: { activeTab: tabId, tabsId: '${tabsId}' }
            }));
          }
          
          function loadLazyContent(tabId, panel) {
            const placeholder = panel.querySelector('[data-lazy-content="' + tabId + '"]');
            if (!placeholder || !lazyContent[tabId]) return;
            
            // Simulate loading delay for demo
            setTimeout(() => {
              placeholder.innerHTML = '<div class="tab-panel__content">' + lazyContent[tabId] + '</div>';
            }, 300);
          }
          
          function getTabIndex(tabId) {
            return Array.from(tabButtons).findIndex(btn => btn.dataset.tabId === tabId);
          }
          
          function getEnabledTabs() {
            return Array.from(tabButtons).filter(btn => !btn.hasAttribute('aria-disabled'));
          }
          
          function focusTab(direction) {
            const enabledTabs = getEnabledTabs();
            const currentIndex = enabledTabs.findIndex(btn => btn.dataset.tabId === activeTabId);
            let newIndex;
            
            if (direction === 'next') {
              newIndex = currentIndex + 1;
              if (newIndex >= enabledTabs.length) newIndex = 0;
            } else {
              newIndex = currentIndex - 1;
              if (newIndex < 0) newIndex = enabledTabs.length - 1;
            }
            
            const newTab = enabledTabs[newIndex];
            if (newTab) {
              activateTab(newTab.dataset.tabId, true);
            }
          }
          
          // Event listeners
          tabButtons.forEach(btn => {
            // Click handler
            btn.addEventListener('click', function() {
              if (this.hasAttribute('aria-disabled')) return;
              activateTab(this.dataset.tabId);
            });
            
            // Keyboard navigation
            if (isKeyboardNav) {
              btn.addEventListener('keydown', function(e) {
                if (this.hasAttribute('aria-disabled')) return;
                
                switch(e.key) {
                  case 'ArrowRight':
                  case 'ArrowDown':
                    e.preventDefault();
                    focusTab('next');
                    break;
                  case 'ArrowLeft':
                  case 'ArrowUp':
                    e.preventDefault();
                    focusTab('prev');
                    break;
                  case 'Home':
                    e.preventDefault();
                    const firstTab = getEnabledTabs()[0];
                    if (firstTab) activateTab(firstTab.dataset.tabId, true);
                    break;
                  case 'End':
                    e.preventDefault();
                    const enabledTabs = getEnabledTabs();
                    const lastTab = enabledTabs[enabledTabs.length - 1];
                    if (lastTab) activateTab(lastTab.dataset.tabId, true);
                    break;
                }
              });
            }
          });
          
          // Initialize with saved or default tab
          activateTab(activeTabId);
        });
      </script>
    `;
  },

  styles: `
    /* Tabs Container */
    .tabs {
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--color-background, #ffffff);
    }

    .tabs--horizontal {
      display: flex;
      flex-direction: column;
    }

    .tabs--vertical {
      display: flex;
      flex-direction: row;
      min-height: 400px;
    }

    /* Tab List */
    .tab-list-wrapper {
      background-color: var(--color-surface, #f9fafb);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .tabs--vertical .tab-list-wrapper {
      border-bottom: none;
      border-right: 1px solid var(--color-border, #e5e7eb);
      min-width: 200px;
      flex-shrink: 0;
    }

    .tab-list {
      display: flex;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .tab-list::-webkit-scrollbar {
      display: none;
    }

    .tabs--vertical .tab-list {
      flex-direction: column;
      overflow-x: visible;
      overflow-y: auto;
    }

    /* Tab Buttons */
    .tab-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      padding: var(--spacing-sm, 1rem) var(--spacing-md, 1.5rem);
      background: none;
      border: none;
      color: var(--color-text-light, #6b7280);
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      position: relative;
      flex-shrink: 0;
    }

    .tab-button:hover:not(.tab-button--disabled) {
      color: var(--color-text, #1f2937);
      background-color: var(--color-background, #ffffff);
    }

    .tab-button:focus {
      outline: 2px solid var(--color-primary, #3b82f6);
      outline-offset: -2px;
      z-index: 1;
    }

    .tab-button--active {
      color: var(--color-primary, #3b82f6);
      background-color: var(--color-background, #ffffff);
      font-weight: 600;
    }

    .tab-button--disabled {
      color: var(--color-text-light, #6b7280);
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Tab Button Elements */
    .tab-icon {
      font-size: 1rem;
      line-height: 1;
    }

    .tab-label {
      flex: 1;
    }

    .tab-badge {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
      line-height: 1.2;
    }

    .tab-button--active .tab-badge {
      background-color: var(--color-primary-dark, #2563eb);
    }

    /* Tab Variants */
    .tabs--pills .tab-button {
      margin: var(--spacing-xs, 0.5rem);
      border-radius: 6px;
      background-color: transparent;
    }

    .tabs--pills .tab-button--active {
      background-color: var(--color-primary, #3b82f6);
      color: white;
    }

    .tabs--pills .tab-button--active .tab-badge {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .tabs--underline .tab-button::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: transparent;
      transition: background-color 0.2s ease;
    }

    .tabs--underline .tab-button--active::after {
      background-color: var(--color-primary, #3b82f6);
    }

    .tabs--vertical.tabs--underline .tab-button::after {
      top: 0;
      bottom: 0;
      left: auto;
      right: 0;
      width: 2px;
      height: auto;
    }

    .tabs--bordered .tab-button {
      border-right: 1px solid var(--color-border, #e5e7eb);
    }

    .tabs--bordered .tab-button:last-child {
      border-right: none;
    }

    .tabs--vertical.tabs--bordered .tab-button {
      border-right: none;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .tabs--vertical.tabs--bordered .tab-button:last-child {
      border-bottom: none;
    }

    /* Tab Panels */
    .tab-panels {
      flex: 1;
      background-color: var(--color-background, #ffffff);
    }

    .tab-panel {
      display: none;
      padding: var(--spacing-lg, 2rem);
    }

    .tab-panel--active {
      display: block;
    }

    .tab-panel__content {
      color: var(--color-text, #1f2937);
      line-height: 1.6;
    }

    .tab-panel__content h1,
    .tab-panel__content h2,
    .tab-panel__content h3,
    .tab-panel__content h4 {
      margin-top: 0;
    }

    /* Lazy Loading */
    .tab-panel__placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }

    .tab-loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 1rem);
      color: var(--color-text-light, #6b7280);
      font-size: 0.875rem;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-border, #e5e7eb);
      border-top: 2px solid var(--color-primary, #3b82f6);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Responsive Design */
    @media (max-width: 767px) {
      .tabs--vertical {
        flex-direction: column;
        min-height: auto;
      }
      
      .tabs--vertical .tab-list-wrapper {
        border-right: none;
        border-bottom: 1px solid var(--color-border, #e5e7eb);
        min-width: auto;
      }
      
      .tabs--vertical .tab-list {
        flex-direction: row;
        overflow-x: auto;
      }
      
      .tab-button {
        padding: var(--spacing-sm, 1rem);
        font-size: 0.875rem;
      }
      
      .tab-panel {
        padding: var(--spacing-md, 1.5rem);
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .tab-button,
      .tab-button::after,
      .loading-spinner {
        transition: none;
        animation: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .tabs {
        border-width: 2px;
      }
      
      .tab-button:focus {
        outline-width: 3px;
      }
      
      .tab-button--active {
        background-color: var(--color-primary, #3b82f6);
        color: white;
      }
    }

    /* Focus management */
    .tab-button:focus-visible {
      outline: 2px solid var(--color-primary, #3b82f6);
      outline-offset: -2px;
    }

    /* Print styles */
    @media print {
      .tabs {
        border: none;
        page-break-inside: avoid;
      }
      
      .tab-list-wrapper {
        display: none;
      }
      
      .tab-panel {
        display: block !important;
        padding: 0;
        margin-bottom: 2rem;
      }
      
      .tab-panel::before {
        content: attr(aria-labelledby);
        display: block;
        font-weight: bold;
        margin-bottom: 1rem;
        text-transform: uppercase;
        font-size: 0.875rem;
        color: #666;
      }
    }
  `,

  metadata: {
    description:
      'Accessible tab interface with keyboard navigation and lazy loading',
    category: 'interactive',
    keywords: [
      'tabs',
      'navigation',
      'accessibility',
      'keyboard',
      'lazy-loading',
      'ARIA',
    ],
    usageExamples: [
      'Content organization with multiple sections',
      'Settings panels with different categories',
      'Product information with specs, reviews, etc.',
      'Documentation with different topics',
    ],
  },
};
