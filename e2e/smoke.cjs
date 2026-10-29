const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });

  const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.shell').waitFor();
  assert.match(await page.locator('body').innerText(), /QuotePilot/);

  // A quote must not save when a required field is missing.
  await page.goto(base + '#new', { waitUntil: 'networkidle' });
  await page.locator('#nq-service').fill('');
  await page.locator('#save-quote').click();
  assert.match(await page.locator('#toast-root').innerText(), /service type/i);
  assert.match(page.url(), /#new$/);

  // Valid quote creation still works after validation.
  await page.locator('#nq-service').fill('QA home service');
  await page.locator('#nq-job').fill('QA quote job description');
  await page.locator('#nq-discount').fill('10');
  await page.locator('#nq-tax').fill('8');
  await page.locator('#save-quote').click();
  await page.waitForURL(/#quote\/q-/);
  const savedQuote = await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('quotepilot-v050'));
    return state.quotes[0];
  });
  assert.equal(savedQuote.service, 'QA home service');
  assert.equal(savedQuote.status, 'draft');
  assert.ok(savedQuote.items.length > 0);

  // Editing a customer actually updates the selected record.
  await page.goto(base + '#customers', { waitUntil: 'networkidle' });
  const customerValues = ['QA Edited Customer', 'qa-edited@example.com', '+1 555 0100', '42 Test Road'];
  const customerDialogHandler = dialog => {
    const value = customerValues.shift() || '';
    if (!customerValues.length) page.off('dialog', customerDialogHandler);
    dialog.accept(value);
  };
  page.on('dialog', customerDialogHandler);
  await page.locator('[data-customer]').first().click();
  const editedCustomer = await page.evaluate(() => JSON.parse(localStorage.getItem('quotepilot-v050')).customers[0]);
  assert.equal(editedCustomer.name, 'QA Edited Customer');
  assert.equal(editedCustomer.email, 'qa-edited@example.com');

  // Editing a service is functional and validates its numeric rate.
  await page.goto(base + '#services', { waitUntil: 'networkidle' });
  const serviceValues = ['QA Edited Service', '125', 'hour', 'QA Category'];
  const serviceDialogHandler = dialog => {
    const value = serviceValues.shift() || '';
    if (!serviceValues.length) page.off('dialog', serviceDialogHandler);
    dialog.accept(value);
  };
  page.on('dialog', serviceDialogHandler);
  await page.locator('[data-edit-service]').first().click();
  const editedService = await page.evaluate(() => JSON.parse(localStorage.getItem('quotepilot-v050')).services[0]);
  assert.equal(editedService.name, 'QA Edited Service');
  assert.equal(editedService.rate, 125);

  // A quote changed to invoiced before visiting the register must still get an invoice.
  await page.goto(base + '#quote/q1041', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Next stage' }).click();
  await page.getByRole('button', { name: 'Next stage' }).click();
  let quoteState = await page.evaluate(() => JSON.parse(localStorage.getItem('quotepilot-v050')).quotes.find(q => q.id === 'q1041'));
  assert.equal(quoteState.status, 'invoiced');
  await page.goto(base + '#invoices', { waitUntil: 'networkidle' });
  assert.match(await page.locator('body').innerText(), /INV-1041/);
  const invoiceCount = await page.locator('tbody tr').count();
  await page.goto(base + '#invoices', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('tbody tr').count(), invoiceCount, 'invoice register must not create duplicates');

  // Import must normalize malformed settings and tolerate invalid scenario-like fields safely.
  await page.goto(base + '#settings', { waitUntil: 'networkidle' });
  const backup = await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('quotepilot-v050'));
    state.settings.currency = 'INVALID';
    state.settings.taxRate = 150;
    state.customers[0].name = '<img src=x onerror=alert(1)>';
    return JSON.stringify(state);
  });
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#import-file').setInputFiles({
    name: 'edited-backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(backup)
  });
  await page.waitForTimeout(500);
  const importToast = await page.locator('#toast-root').innerText();
  const restoredState = await page.evaluate(() => JSON.parse(localStorage.getItem('quotepilot-v050')));
  console.log('Import toast:', importToast);
  console.log('Restored settings:', JSON.stringify(restoredState && restoredState.settings));
  assert.match(importToast, /Workspace backup imported/i, 'backup import should show successful completion');
  assert.equal(restoredState.settings.currency, 'USD');
  assert.equal(restoredState.settings.taxRate, 100);
  assert.equal(await page.locator('img[src="x"]').count(), 0);

  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));
  console.log('QuotePilot smoke PASS: safe state load, quote validation/create, customer/service editing, invoice sync, backup restore.');
  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
