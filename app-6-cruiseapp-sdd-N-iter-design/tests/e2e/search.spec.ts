import { test, expect } from "@playwright/test";

test.describe("Search & Compare", () => {
  test("search form is visible", async ({ page }) => {
    await page.goto("/en/search");
    await expect(page.getByTestId("search-page")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("search-from")).toBeVisible();
    await expect(page.getByTestId("search-to")).toBeVisible();
    await expect(page.getByTestId("search-btn")).toBeVisible();
  });

  test("searching Helsinki→Tallinn shows ferry results", async ({
    page,
  }) => {
    await page.goto("/en/search");
    await page.getByTestId("search-from").fill("Helsinki");
    await page.getByTestId("search-to").fill("Tallinn");
    await page.getByTestId("search-btn").click();
    await expect(page.getByTestId("search-results")).toBeVisible({
      timeout: 10000,
    });
  });

  test("sort buttons toggle between cheapest and fastest", async ({
    page,
  }) => {
    await page.goto("/en/search");
    await page.getByTestId("search-from").fill("Helsinki");
    await page.getByTestId("search-to").fill("Tallinn");
    await page.getByTestId("search-btn").click();
    await expect(page.getByTestId("search-results")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByTestId("sort-cheapest")).toBeVisible();
    await expect(page.getByTestId("sort-fastest")).toBeVisible();
    await page.getByTestId("sort-fastest").click();
    // Results should still be visible after sorting
    await expect(page.getByTestId("search-results")).toBeVisible();
  });
});
