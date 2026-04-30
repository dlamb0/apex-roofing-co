import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays hero section", async ({ page }) => {
    await expect(page).toHaveTitle(/Apex Roofing/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/Minneapolis/i).first()).toBeVisible();
  });

  test("displays navigation with logo", async ({ page }) => {
    const logo = page.locator("svg[aria-label='Apex Roofing Co.']").first();
    await expect(logo).toBeVisible();
  });

  test("Get Free Estimate CTA is clickable", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Free Estimate/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL("/quote");
  });

  test("shows stats section", async ({ page }) => {
    await page.locator("#services").scrollIntoViewIfNeeded();
    await expect(page.getByText(/Years in Business/i)).toBeVisible();
  });

  test("shows services section", async ({ page }) => {
    await expect(page.getByText(/Residential Roofing/i).first()).toBeVisible();
    await expect(page.getByText(/Commercial Roofing/i).first()).toBeVisible();
  });

  test("pricing calculator is interactive", async ({ page }) => {
    const calc = page.locator("#calculator");
    await calc.scrollIntoViewIfNeeded();
    await expect(page.getByText(/Estimated Project Cost/i)).toBeVisible();
  });

  test("footer has contact info", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/(612)/i).first()).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("Services dropdown works on desktop", async ({ page }) => {
    await page.goto("/");
    const servicesNav = page.getByRole("button", { name: /Services/i }).first();
    await servicesNav.hover();
    await expect(page.getByRole("link", { name: /Residential Roofing/i })).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const menuBtn = page.getByRole("button", { name: /Toggle menu/i });
    await menuBtn.click();
    await expect(page.getByRole("link", { name: /About/i })).toBeVisible();
    await menuBtn.click();
    await expect(page.getByRole("link", { name: /About/i })).not.toBeVisible();
  });
});

test.describe("Quote Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quote");
  });

  test("displays form page correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Free Inspection/i })).toBeVisible();
    await expect(page.getByPlaceholder("John")).toBeVisible();
    await expect(page.getByPlaceholder("john@example.com")).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Submit Estimate/i });
    await submitBtn.click();
    await expect(page.getByText(/required/i).first()).toBeVisible();
  });

  test("successfully submits valid form", async ({ page }) => {
    await page.route("/api/quote", async (route) => {
      await route.fulfill({ json: { success: true }, status: 200 });
    });

    await page.getByPlaceholder("John").fill("Jane");
    await page.getByPlaceholder("Smith").fill("Doe");
    await page.getByPlaceholder("john@example.com").fill("jane@test.com");
    await page.getByPlaceholder("(612) 555-0100").fill("6125550199");
    await page.getByPlaceholder("1234 Main St").fill("5678 Oak Ave");
    await page.getByPlaceholder("Minneapolis").fill("Edina");
    await page.locator("select[name='serviceType']").selectOption("residential");
    await page.locator("input[value='within-month']").click();
    await page.locator("textarea[name='description']").fill(
      "I need a full roof replacement for my home. The roof is about 20 years old and showing wear."
    );

    await page.getByRole("button", { name: /Submit Estimate/i }).click();
    await expect(page.getByText(/Request Received/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Contact Page", () => {
  test("contact form displays correctly", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Contact Apex/i })).toBeVisible();
    await expect(page.getByPlaceholder("John Smith")).toBeVisible();
  });

  test("shows company phone number", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/(612)/i).first()).toBeVisible();
  });
});

test.describe("Services Pages", () => {
  test("residential service page loads", async ({ page }) => {
    await page.goto("/services/residential");
    await expect(page.getByRole("heading", { name: /Residential Roofing/i })).toBeVisible();
    await expect(page.getByText(/25-Year Warranty/i)).toBeVisible();
  });

  test("commercial service page loads", async ({ page }) => {
    await page.goto("/services/commercial");
    await expect(page.getByRole("heading", { name: /Commercial Roofing/i })).toBeVisible();
  });

  test("returns 404 for unknown service", async ({ page }) => {
    const response = await page.goto("/services/nonexistent-service");
    expect(response?.status()).toBe(404);
  });
});

test.describe("About Page", () => {
  test("loads with team section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /Years of Protecting/i })).toBeVisible();
    await expect(page.getByText(/Mike Halvorsen/i)).toBeVisible();
  });
});

test.describe("Blog Page", () => {
  test("blog listing loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText(/Roofing Insights/i)).toBeVisible();
    await expect(page.getByText(/Hail Damage/i)).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("homepage has no missing alt text on key images", async ({ page }) => {
    await page.goto("/");
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("links have accessible text", async ({ page }) => {
    await page.goto("/");
    const links = await page.locator("a:not([aria-label])").all();
    for (const link of links.slice(0, 10)) {
      const text = await link.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });
});

test.describe("SEO", () => {
  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    const meta = await page.locator("meta[name='description']").getAttribute("content");
    expect(meta).toBeTruthy();
    expect(meta!.length).toBeGreaterThan(50);
  });

  test("each service page has unique title", async ({ page }) => {
    const slugs = ["residential", "commercial", "storm-damage", "gutters"];
    const titles: string[] = [];
    for (const slug of slugs) {
      await page.goto(`/services/${slug}`);
      titles.push(await page.title());
    }
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });
});
