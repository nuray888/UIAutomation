import { Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridForm(
    email: string,
    password: string,
    optional: string,
  ) {
    const card = this.page.locator("nb-card", { hasText: "Using the Grid" });
    await card.getByPlaceholder("Email").fill(email);
    await card.getByPlaceholder("Password").fill(password);
    await card.getByRole("radio", { name: optional }).check({ force: true });
    await card.getByRole("button", { name: "Sign in" }).click();
  }
}
