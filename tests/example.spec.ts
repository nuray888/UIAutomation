import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(
    "https://playground.bondaracademy.com/pages/modal-overlays/dialog",
  );

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  //get by tag
  page.locator("input");
  //get by id
  page.locator("#id");
  //get by class
  page.locator(".class");
  //get by attribute
  page.locator('[attribute="value"]');
  //get by text
  page.locator(':text("some text")');
  //get by exact text
  page.locator(':text-is("some text")');
  //get by several locators
  page.locator('input[placeholder="Search"]');
});

test("wait for element", async ({ page }) => {
  await page.goto(
    "https://playground.bondaracademy.com/pages/modal-overlays/dialog",
  );
  await page.getByRole("button", { name: "Open with delay 3 seconds" }).click();
  const dialogContainer = page.locator("nb-dialog-container");
  // await dialogContainer.waitFor()

  //wait for api response
  //await page.waitForResponse('**/delay/*')

  // const headerText = await dialogContainer.locator("nb-card-header").allTextContents();

  await expect(dialogContainer.locator("nb-card-header")).toHaveText(
    "Friendly reminder",
  );
  // await expect(headerText).toContain("Friendly reminder");
  // await dialogContainer.getByRole("button", { name: "OK" }).click();
});
