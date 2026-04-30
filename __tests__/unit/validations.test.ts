import { describe, it, expect } from "vitest";
import { contactSchema, quoteSchema } from "@/lib/validations";

describe("contactSchema", () => {
  const validContact = {
    name: "John Smith",
    email: "john@example.com",
    subject: "Question about roofing",
    message: "I have a question about my roof that I need answered please.",
  };

  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({ ...validContact, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects short subject", () => {
    const result = contactSchema.safeParse({ ...validContact, subject: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({ ...validContact, message: "Short" });
    expect(result.success).toBe(false);
  });

  it("accepts optional phone field", () => {
    const result = contactSchema.safeParse({ ...validContact, phone: "(612) 555-0100" });
    expect(result.success).toBe(true);
  });

  it("accepts missing optional phone field", () => {
    const { phone: _, ...withoutPhone } = { ...validContact, phone: undefined };
    const result = contactSchema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });
});

describe("quoteSchema", () => {
  const validQuote = {
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "6125550100",
    address: "1234 Main St",
    city: "Minneapolis",
    serviceType: "residential" as const,
    urgency: "within-month" as const,
    description: "I need my entire roof replaced after hail damage from last month.",
    preferredContact: "phone" as const,
  };

  it("accepts valid quote data", () => {
    const result = quoteSchema.safeParse(validQuote);
    expect(result.success).toBe(true);
  });

  it("rejects invalid service type", () => {
    const result = quoteSchema.safeParse({ ...validQuote, serviceType: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid urgency", () => {
    const result = quoteSchema.safeParse({ ...validQuote, urgency: "someday" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid preferred contact", () => {
    const result = quoteSchema.safeParse({ ...validQuote, preferredContact: "fax" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid service types", () => {
    const types = ["residential", "commercial", "storm-damage", "gutters"] as const;
    types.forEach((serviceType) => {
      const result = quoteSchema.safeParse({ ...validQuote, serviceType });
      expect(result.success).toBe(true);
    });
  });

  it("accepts all valid urgency levels", () => {
    const urgencies = ["emergency", "within-month", "planning"] as const;
    urgencies.forEach((urgency) => {
      const result = quoteSchema.safeParse({ ...validQuote, urgency });
      expect(result.success).toBe(true);
    });
  });

  it("rejects short description", () => {
    const result = quoteSchema.safeParse({ ...validQuote, description: "Need help" });
    expect(result.success).toBe(false);
  });

  it("rejects short phone", () => {
    const result = quoteSchema.safeParse({ ...validQuote, phone: "123" });
    expect(result.success).toBe(false);
  });
});
