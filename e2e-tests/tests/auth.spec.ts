import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email] ").fill("test@test.com");
  await page.locator("[name=password] ").fill("12345678");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test${Math.floor(Math.random() * 9000) + 10000}@test.com`;
  await page.goto(UI_URL);

  // click sign in page
  await page.getByRole("link", { name: "Sign In" }).click();
  // click create an account
  await page.getByRole("link", { name: "Create an Account" }).click();

  // Expects page to have a heading with create an account.
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // Fill the register form
  await page.locator("[name=firstName] ").fill("test");
  await page.locator("[name=lastName] ").fill("test");
  await page.locator("[name=email] ").fill(testEmail);
  await page.locator("[name=password] ").fill("12345678");
  await page.locator("[name=confirmPassword] ").fill("12345678");
  //Click create account button
  await page.getByRole("button", { name: "Create Account" }).click();

  //Display toast message and links
  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
