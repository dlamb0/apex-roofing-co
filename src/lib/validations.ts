import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Please provide more detail (at least 20 characters)"),
});

export const quoteSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Street address required"),
  city: z.string().min(2, "City required"),
  serviceType: z.enum(["residential", "commercial", "storm-damage", "gutters"], {
    message: "Please select a service type",
  }),
  roofSize: z.string().optional(),
  urgency: z.enum(["emergency", "within-month", "planning"], {
    message: "Please select urgency",
  }),
  description: z.string().min(20, "Please describe your project (at least 20 characters)"),
  preferredContact: z.enum(["phone", "email", "text"]),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type QuoteFormValues = z.infer<typeof quoteSchema>;
