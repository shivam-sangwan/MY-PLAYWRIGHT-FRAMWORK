/**
 * Lean UI Helper
 * Only project-relevant reusable actions
 */

class UIHelpers {
  constructor(page) {
    this.page = page;
  }

  /* ===============================
     Navigation
  =============================== */

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForUrl(urlPattern, timeout = 30000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /* ===============================
     Core Element Actions
  =============================== */

  async click(locator, options = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.click(options);
  }

  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async clear(locator) {
    await locator.fill('');
  }

  async select(locator, value) {
    await locator.selectOption(value);
  }

  /* ===============================
     Wait Helpers
  =============================== */

  async waitForVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator, timeout = 30000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /* ===============================
     Getter Helpers
  =============================== */

  async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return locator.textContent();
  }

  async isVisible(locator) {
    return locator.isVisible();
  }

  /* ===============================
     Screenshot (Debugging)
  =============================== */

  async screenshot(name = 'debug') {
    await this.page.screenshot({
      path: `test-results/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }
}

module.exports = { UIHelpers };