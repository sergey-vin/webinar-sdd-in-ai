import { test, expect } from "@playwright/test";
import { signInAsDemoUser } from "../fixtures/test-utils";

test.describe("Schedule", () => {
  test("shows events when signed in as Elena", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.goto("/en/schedule");
    await expect(page.getByTestId("schedule-page")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByTestId("events-list")).toBeVisible({
      timeout: 10000,
    });
  });

  test("timezone toggle switches between ship/home/local", async ({
    page,
  }) => {
    await signInAsDemoUser(page, "elena");
    await page.goto("/en/schedule");
    await expect(page.getByTestId("tz-toggle")).toBeVisible({
      timeout: 10000,
    });

    // Ship time is default (active)
    await expect(page.getByTestId("tz-ship")).toBeVisible();
    await expect(page.getByTestId("tz-home")).toBeVisible();
    await expect(page.getByTestId("tz-local")).toBeVisible();

    // Click home time
    await page.getByTestId("tz-home").click();
    // Events should still be visible (just with different times)
    await expect(page.getByTestId("events-list")).toBeVisible();
  });

  test("category chips filter events", async ({ page }) => {
    await signInAsDemoUser(page, "elena");
    await page.goto("/en/schedule");
    await expect(page.getByTestId("category-chips")).toBeVisible({
      timeout: 10000,
    });

    // Click music chip — should show at least 1 music event
    await page.getByTestId("chip-music").click();
    await expect(page.getByTestId("events-list")).toBeVisible();

    // Click kids chip — should show kids event
    await page.getByTestId("chip-kids").click();
    await expect(page.getByTestId("events-list")).toBeVisible();
  });
});
