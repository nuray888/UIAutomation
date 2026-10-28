import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToFormLayoutsPage() {
    await this.page.getByTitle("Forms").click();
    await this.page.getByTitle("Form Layouts").click();
  }

  async DatePickerPage() {
    await this.page.getByTitle("Modal & Overlays").click();
    await this.page.getByTitle("DatePicker").click();
  }
  async toastrPage() {
    await this.page.getByTitle("Modal & Overlays").click();
    await this.page.getByTitle("Toastr").click();
  }
  async toolTipPage() {
    await this.page.getByTitle("Modal & Overlays").click();
    await this.page.getByTitle("Tooltip").click();
  }
  async smartTablePage() {
    await this.page.getByTitle("Tables & Data").click();
    await this.page.getByTitle("Smart Table").click();
  }
}
