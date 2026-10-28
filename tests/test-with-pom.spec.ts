import { NavigationPage } from "../pom/navigation-pagfe";
import { test } from "@playwright/test";
import { FormLayoutsPage } from "../pom/form-layouyts-page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/");
});

test("Navigation test", async ({ page }) => {
  const NavigateTo = new NavigationPage(page);
  await NavigateTo.navigateToFormLayoutsPage();
});

test("SubmitForm", async ({ page }) => {
  const NavigateTo = new NavigationPage(page);
  await NavigateTo.navigateToFormLayoutsPage();
  const FormPage = new FormLayoutsPage(page);
  await FormPage.submitUsingTheGridForm(
    "testemail@gmail.com",
    "myPassword123",
    "Option 1",
  );
});
