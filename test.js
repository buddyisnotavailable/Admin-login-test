
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Go to login page
  await page.goto('https://aither.neurosite.ch/admin/login');

  // Fill email and password fields
  await page.fill('input[name="email"]', process.env.ADMIN_EMAIL);
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD);

  // Click login button using the full selector you provided
  await page.click('body > div.s-wrapper.overflow-hidden.relative > main > div.flex.flex-col.justify-center.items-center.px-6.pt-20.pb-20.w-full.mx-auto.pt\\:mt-0.grow.relative > div > div > div > form > button');

  // Wait for navigation or a known dashboard element
  await page.waitForLoadState('networkidle');

  // Check if login was successful by verifying content
  const bodyText = await page.textContent('body');

  if (bodyText.includes("Dashboard") || bodyText.includes("SEO Benchmarking")) {
    console.log('✅ Test Passed: Login successful and dashboard is visible');
  } else {
    console.log('❌ Test Failed: Login unsuccessful or dashboard not loaded');
    process.exit(1);
  }

  await browser.close();
})();
