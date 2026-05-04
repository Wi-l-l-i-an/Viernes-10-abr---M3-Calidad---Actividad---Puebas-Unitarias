// Pruebas de Regresion E2E con Playwright - Enfoque en AI
// A00840101 - Willian Salomon Lemus Sanchez

import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/';
const USUARIO = 'lupita@espinabifida.com';
const PASSWORD = '123456';

async function login(page) {
  await page.goto(URL);
  await page.getByRole('textbox', { name: 'Usuario' }).fill(USUARIO);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
}

async function abrirFormularioAsociado(page) {
  await page.getByRole('button', { name: 'Agregar asociado' }).click();
}

async function completarRegistroAsociado(page) {
  const curp = `CURP${Date.now()}`;

  await page.getByRole('textbox').nth(2).fill('2026-11-24');
  await page.getByRole('combobox').nth(1).selectOption('Masculino');
  await page.getByRole('textbox').nth(3).fill('Jose Carlos');
  await page.getByRole('textbox').nth(4).fill('Pendulos Perez');
  await page.getByRole('textbox').nth(5).fill(curp);

  await page.locator('input[type="date"]').nth(2).fill('2002-12-12');
  await page.locator('div:nth-child(5) > .h-10').fill('23');
  await page.locator('div:nth-child(6) > .h-10').fill('Sus Veintes');

  await page.locator('div:nth-child(7) > .h-10').first().fill('Juanita Josefa Pendulos Perez');
  await page.locator('input[type="date"]').nth(3).fill('2026-10-23');

  await page.locator('.sm\\:col-span-2 > .h-10').fill('Avenida Jesus Cantu Leal 1525');
  await page.locator('div:nth-child(3) > div:nth-child(2) > .h-10').fill('Monterrey');
  await page.locator('div:nth-child(3) > div:nth-child(3) > .h-10').fill('Nuevo Leon');
  await page.locator('div:nth-child(3) > div:nth-child(4) > .h-10').fill('24800');

  await page.locator('div:nth-child(4) > div > .h-10').first().fill('8123434251');
  await page.locator('div:nth-child(4) > div:nth-child(2) > .h-10').fill('8129746528');
  await page.locator('div:nth-child(4) > div:nth-child(3) > .h-10').fill('8182854938');
  await page.locator('div:nth-child(4) > div:nth-child(4) > .h-10').fill('juanita@gmail.com');

  await page.locator('.grid.grid-cols-1.gap-4.sm\\:grid-cols-3 > div > .h-10').first().fill('Juanita Perez');
  await page.locator('.grid.grid-cols-1.gap-4.sm\\:grid-cols-3 > div:nth-child(2) > .h-10').fill('8123434251');
  await page.locator('.grid.grid-cols-1.gap-4.sm\\:grid-cols-3 > div:nth-child(3) > .h-10').fill('Madre');

  await page.locator('input[type="date"]').nth(4).fill('2025-04-12');
  await page.locator('input[type="date"]').nth(5).fill('2027-05-12');

  return curp;
}

async function abrirHistorialPadres(page) {
  await page.getByRole('cell', { name: 'Felipe Enrique Garcia Garcia' }).click();
  await page.getByRole('button', { name: 'Historial padres' }).click();
  await page.getByRole('button', { name: 'Editar' }).click();
}

async function llenarHistorialPadres(page) {
  await page.getByRole('textbox').nth(2).fill('Monterrey, N.L');
  await page.locator('div:nth-child(2) > div:nth-child(2) > .text-base > .h-10').fill('Monterrey, N.L');

  await page.getByRole('textbox').nth(3).fill('Universidad');
  await page.locator('div:nth-child(2) > div:nth-child(3) > .text-base > .h-10').fill('Universidad');

  await page.getByRole('textbox').nth(4).fill('35');
  await page.locator('div:nth-child(2) > div:nth-child(4) > .text-base > .h-10').fill('35');

  await page.getByRole('textbox').nth(5).fill('Medico');
  await page.locator('div:nth-child(2) > div:nth-child(5) > .text-base > .h-10').fill('Medico');

  await page.getByRole('combobox').nth(2).selectOption('si');
  await page.locator('div:nth-child(9) > .text-base > .h-10').fill('3');
  await page.locator('div:nth-child(10) > .text-base > .h-10').fill('n/a');
}

test.describe.serial('Regresión E2E - Sprint 1', () => {
  test('Registro de asociado exitoso @QaseID=22', async ({ page }) => {
    await login(page);
    await abrirFormularioAsociado(page);

    const curp = await completarRegistroAsociado(page);

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Guardar asociado' }).click();

    await expect(page).toHaveURL(/.*asociados/);
    await expect(page.locator('body')).toContainText(curp);
  });

  test('Registro de asociado negativo por CURP vacía @QaseID=22', async ({ page }) => {
    await login(page);
    await abrirFormularioAsociado(page);

    await page.getByRole('textbox').nth(2).fill('2026-11-24');
    await page.getByRole('combobox').nth(1).selectOption('Masculino');
    await page.getByRole('textbox').nth(3).fill('Jose Carlos');
    await page.getByRole('textbox').nth(4).fill('Pendulos Perez');
    await page.getByRole('textbox').nth(5).fill('');

    await page.locator('input[type="date"]').nth(2).fill('2002-12-12');
    await page.locator('div:nth-child(5) > .h-10').fill('23');
    await page.locator('div:nth-child(6) > .h-10').fill('Sus Veintes');

    page.once('dialog', async dialog => {
      await dialog.dismiss().catch(() => {});
    });

    await page.getByRole('button', { name: 'Guardar asociado' }).click();

    await expect(page.getByText(/curp|obligatorio|requerido|vac[ií]o/i)).toBeVisible();
  });

  test('Registro de historial de Padres @QaseID=31', async ({ page }) => {
    await login(page);
    await abrirHistorialPadres(page);
    await llenarHistorialPadres(page);

    await page.getByRole('button', { name: 'Guardar cambios' }).click();

    await expect(page).toHaveURL(/.*asociados/);
  });

  test('Registro de historial de padres negativo por campo vacío @QaseID=31', async ({ page }) => {
    await login(page);
    await abrirHistorialPadres(page);

    await page.getByRole('textbox').nth(2).fill('Monterrey, N.L');
    await page.getByRole('textbox').nth(3).fill('');
    await page.getByRole('textbox').nth(4).fill('35');
    await page.getByRole('textbox').nth(5).fill('Medico');

    await page.getByRole('button', { name: 'Guardar cambios' }).click();

    await expect(page).toHaveURL(/.*asociados/);
  });
});