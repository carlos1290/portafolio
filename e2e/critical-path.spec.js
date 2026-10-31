import { test, expect } from '@playwright/test'

// Ruta crítica: superficie → pasarela → ficha modal → contacto
test.describe('portafolio iceberg — ruta crítica', () => {
  test('carga en la superficie con el HUD en 0 m', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: /Carlos Gonzalez/ })).toBeVisible()
    await expect(page.locator('#gauge-depth')).toHaveText('−000 m')
    await expect(page.locator('#gauge-zone')).toHaveText(/SUPERFICIE|SURFACE/)
  })

  test('el scroll hunde el iceberg y actualiza el HUD', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
    )
    await expect(page.locator('#gauge-depth')).toHaveText('−900 m')
    await expect(page.locator('#gauge-zone')).toHaveText(/ABISMO|ABYSS/)
  })

  test('la pasarela abre la ficha completa y devuelve el foco al cerrar', async ({
    page,
    context,
  }) => {
    // reduced-motion desactiva el autoplay: el carrusel no se mueve bajo el click
    await context.addInitScript(() => {
      window.matchMedia = (q) =>
        q.includes('reduced-motion')
          ? { matches: true, media: q, addEventListener() {}, removeEventListener() {} }
          : { matches: false, media: q, addEventListener() {}, removeEventListener() {} }
    })
    await page.goto('/')
    await page.locator('#proyectos').scrollIntoViewIfNeeded()
    await page
      .getByRole('button', { name: /Ficha completa/ })
      .first()
      .click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 3 })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Ficha completa/ }).first()).toBeFocused()
  })

  test('el botón de flechas avanza el carrusel', async ({ page }) => {
    await page.goto('/')
    await page.locator('#proyectos').scrollIntoViewIfNeeded()
    const before = await page.locator('.gallery-track').evaluate((el) => el.scrollLeft)
    await page.getByRole('button', { name: /siguiente/i }).click()
    await page.waitForTimeout(700)
    const after = await page.locator('.gallery-track').evaluate((el) => el.scrollLeft)
    expect(after).toBeGreaterThan(before)
  })

  test('el conmutador de idioma traduce la navegación', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Bitácora' })).toBeVisible()
    await page.getByRole('button', { name: /Switch to English/ }).click()
    await expect(page.getByRole('link', { name: 'Logbook' })).toBeVisible()
    await expect(page.locator('#gauge-label, .gauge__label')).toHaveText('DEPTH')
  })

  test('el CV se descarga desde el Hero', async ({ page }) => {
    await page.goto('/')
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: /Descargar CV/ }).click(),
    ])
    expect(download.suggestedFilename()).toBe('CV-Carlos-Gonzalez.pdf')
  })
})
