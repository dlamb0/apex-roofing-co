import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Next.js server components
vi.mock("next/server", () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status ?? 200,
    }),
  },
}));

describe("Contact API Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 for valid contact submission", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Smith",
        email: "john@example.com",
        subject: "Question about residential roofing",
        message: "I need help understanding what type of roof is best for my home in Minnesota winters.",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Smith",
        email: "not-valid",
        subject: "Test subject",
        message: "This is a test message with enough content.",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for missing required fields", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "John" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for empty body", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});

describe("Quote API Route", () => {
  const validQuotePayload = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "6125550199",
    address: "5678 Oak Ave",
    city: "Edina",
    serviceType: "residential",
    urgency: "within-month",
    description: "Looking for a complete roof replacement on my single-family home. The roof is 20 years old.",
    preferredContact: "email",
  };

  it("returns 200 for valid quote submission", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validQuotePayload),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("returns 400 for invalid service type", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validQuotePayload, serviceType: "painting" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for missing city", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const { city: _, ...withoutCity } = validQuotePayload;
    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(withoutCity),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("accepts emergency urgency", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validQuotePayload, urgency: "emergency" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it("accepts all valid service types", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const types = ["residential", "commercial", "storm-damage", "gutters"];

    for (const serviceType of types) {
      const request = new Request("http://localhost/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validQuotePayload, serviceType }),
      });
      const response = await POST(request);
      expect(response.status).toBe(200);
    }
  });
});
