import { Page ,expect} from "@playwright/test";

export class DatePickerPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePicker(daysFromToday:number){
      const calendarInputField = this.page.getByPlaceholder("Form Picker");
      await calendarInputField.click();
      const todaysDate = new Date();
      todaysDate.setDate(todaysDate.getDate() + daysFromToday);
      const expectedDay = todaysDate.getDate().toString();
      const expectedMonth = todaysDate.toLocaleString("En-US", { month: "short" });
      const expectedMonthLong = todaysDate.toLocaleString("En-US", {
        month: "long",
      });
      const expectedYear = todaysDate.getFullYear();
      const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`;
    
      let currentDateBtn = await this.page
        .locator("nb-calendar-view-mode")
        .getByRole("button")
        .textContent();
      const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
      while (!currentDateBtn?.includes(expectedMonthAndYear)) {
        await this.page.locator(".next-month").click()
        currentDateBtn=await this.page
        .locator("nb-calendar-view-mode")
        .getByRole("button")
        .textContent();
    
      }
      await this.page
        .locator("nb-calendar .day-cell:not(.bounding-month)")
        .getByText(expectedDay, { exact: true })
        .click();
      await expect(calendarInputField).toHaveValue(expectedDate);
  }
}
