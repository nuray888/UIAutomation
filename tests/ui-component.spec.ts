import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle("Forms").click();
    await page.getByTitle("Form Layouts").click();
  });

  test("ui component test", async ({ page }) => {
    var emailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByPlaceholder("Email");
    await emailInput.fill("Nuray Muxtarli");
  });

  test("radio test", async ({ page }) => {
    var card = page.locator("nb-card", { hasText: "Using the Grid" });
    // card.getByLabel('Option 1').check()

    await expect(
      card.getByRole("radio", { name: "Option 1" }),
    ).not.toBeChecked();
  });
});

test.describe("Toastr Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle("Modal & Overlays").click();
    await page.getByTitle("Toastr").click();
  });

  test("checkbox test", async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .check({ force: true });
    await expect(
      page.getByRole("checkbox", { name: "Hide on click" }),
    ).toBeChecked();
  });

  test("dropdown test", async ({ page }) => {
    //standard dropdown
    // await page.getByRole('combobox').selectOption('info');
    // await expect(page.getByRole('combobox')).toHaveValue('info');

    //custom dropdown
    await page
      .locator(".form-group", { hasText: "Position:" })
      .locator("nb-select")
      .click();
    //option1
    await page.locator("#nb-option-11").click();
    //option2
    await page.getByRole("list").getByText("bottom-end").click();
    await expect(
      page.locator(".form-group", { hasText: "Position:" }),
    ).toContainText("top-left");
  });
});

test("tooltip test", async ({ page }) => {
  await page.getByTitle("Modal & Overlays").click();
  await page.getByTitle("Tooltip").click();

  await page.getByRole("button", { name: "Top" }).hover();
  await expect(page.getByRole("tooltip")).toHaveText("This is a tooltip");
});

test("dialog test", async ({ page }) => {
  await page.getByTitle("Tables & Data").click();
  await page.getByTitle("Smart Table").click();

  page.on("dialog", async (dialog) => {
    dialog.accept();
  });

  await page
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  await expect(
    page.locator("tr", { hasText: "mdo@gmail.com" }),
  ).not.toBeVisible();
});

test("web table test", async ({ page }) => {
  await page.getByTitle("Tables & Data").click();
  await page.getByTitle("Smart Table").click();
  //how to select row by any visible text
  // var row = page.getByRole("row", { name: "twitter@outlook.com" });
  // await row.locator(".nb-edit").click();
  // await row.getByPlaceholder("E-mail").fill("test@test.mail.ru");
  // await page.locator(".nb-checkmark").click();

  //loop through table rows
  const ages = [20, 30, 40, 200];
  for (const age of ages) {
    await page.getByPlaceholder("Age").fill(age.toString());

    if (age === 200) {
      await expect(page.getByText("No data found")).toBeVisible();
    } else {
      var rows = await page
        .getByRole("row")
        .filter({ has: page.locator("tbody") })
        .all();
      for (const row of rows) {
        await expect(row).toContainText(age.toString());
      }
    }
  }
});

test("slider test", async ({ page }) => {
  //setting attribute values
  // var temp = page.locator('[tabtitle="Temperature"] circle');
  // temp.evaluate((element) => {
  //   element.setAttribute("cx", "232.63098833543773");
  //   element.setAttribute("cy", "232.6309883354377");
  // });
  // await temp.click();

  //setting mouse movememnt
  var tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger',
  );
  await tempBox.scrollIntoViewIfNeeded();
  const box = await tempBox.boundingBox();
  const x = box?.x + box?.width / 2; //30
  const y = box?.y + box?.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y); //130
  await page.mouse.move(x + 100, y + 100); //
  await page.mouse.up;
});

test("open dialog test", async ({ page }) => {
  await page.getByTitle("Modal & Overlays").click();
  await page.getByTitle("Dialog").click();
  await page
    .locator("nb-card", { hasText: "Open Dialog with component" })
    .getByRole("button", { name: "Component" })
    .click();
  await page.getByRole("button", { name: "Dismiss Dialog" }).click();
});

test("open dialog iframe", async ({ page }) => {
  await page.getByTitle("Modal & Overlays").click();
  await page.getByTitle("Dialog").click();
  await page.frameLocator('[data-cy="esc-close-iframe"]');
  await page
    .locator("nb-card", { hasText: "iFrame Dialog" })
    .getByRole("button", { name: "Open Dialog with esc close" })
    .click();
});
// await page.getByRole('button', { name: 'Dismiss Dialog' }).click();

//hardcoded
test("date picker test 1", async ({ page }) => {
  await page.getByTitle("Forms").click();
  await page.getByTitle("DatePicker").click();
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  await page
    .locator("nb-calendar .cell-content:not(.bounding-month)")
    .getByText("1", { exact: true })
    .click();
});

//with js date object
test("date picker with js method", async ({ page }) => {
  await page.getByTitle("Forms").click();
  await page.getByTitle("DatePicker").click();
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  const todaysDate = new Date();
  todaysDate.setDate(todaysDate.getDate() + 30);
  const expectedDay = todaysDate.getDate().toString();
  const expectedMonth = todaysDate.toLocaleString("En-US", { month: "short" });
  const expectedMonthLong = todaysDate.toLocaleString("En-US", {
    month: "long",
  });
  const expectedYear = todaysDate.getFullYear();
  const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`;

  let currentDateBtn = await page
    .locator("nb-calendar-view-mode")
    .getByRole("button")
    .textContent();
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
  while (!currentDateBtn?.includes(expectedMonthAndYear)) {
    await page.locator(".next-month").click()
    currentDateBtn=await page
    .locator("nb-calendar-view-mode")
    .getByRole("button")
    .textContent();

  }
  await page
    .locator("nb-calendar .day-cell:not(.bounding-month)")
    .getByText(expectedDay, { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue(expectedDate);
});
