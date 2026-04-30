"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Section, Container } from "@/components/ui/Section";
import { COMPANY, SERVICES } from "@/lib/constants";
import { CheckCircle2, Phone, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { preferredContact: "phone", urgency: "within-month" },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please call us directly at " + COMPANY.phone);
    }
  };

  if (submitted) {
    return (
      <Section background="cream" padding="xl">
        <Container size="sm">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-brand-charcoal mb-4">Request Received!</h1>
            <p className="text-gray-600 mb-2">We&apos;ll reach out within <strong>24 hours</strong> to confirm your free inspection.</p>
            <p className="text-gray-600 mb-8">For urgent needs, call us directly at <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="text-brand-orange font-semibold">{COMPANY.phone}</a>.</p>
            <Button href="/">Back to Home</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Page header */}
      <div className="bg-brand-charcoal py-16">
        <Container>
          <div className="max-w-2xl">
            <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Free Estimate</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Request Your Free Inspection</h1>
            <p className="text-gray-300 text-lg">No pressure, no obligation. We&apos;ll assess your roof and give you an honest, detailed estimate within 48 hours.</p>
          </div>
        </Container>
      </div>

      <Section background="cream" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-brand-charcoal">Your Contact Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name *</label>
                    <input {...register("firstName")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.firstName ? "border-red-400" : "border-gray-300")} placeholder="John" />
                    <FieldError message={errors.firstName?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name *</label>
                    <input {...register("lastName")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.lastName ? "border-red-400" : "border-gray-300")} placeholder="Smith" />
                    <FieldError message={errors.lastName?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input {...register("email")} type="email" className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.email ? "border-red-400" : "border-gray-300")} placeholder="john@example.com" />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input {...register("phone")} type="tel" className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.phone ? "border-red-400" : "border-gray-300")} placeholder="(612) 555-0100" />
                    <FieldError message={errors.phone?.message} />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-bold text-brand-charcoal mb-4">Property Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Street Address *</label>
                    <input {...register("address")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.address ? "border-red-400" : "border-gray-300")} placeholder="1234 Main St" />
                    <FieldError message={errors.address?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                    <input {...register("city")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.city ? "border-red-400" : "border-gray-300")} placeholder="Minneapolis" />
                    <FieldError message={errors.city?.message} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Type *</label>
                  <select {...register("serviceType")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white", errors.serviceType ? "border-red-400" : "border-gray-300")}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                  <FieldError message={errors.serviceType?.message} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Urgency *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "emergency", label: "Emergency", sub: "Active leak / damage" },
                      { value: "within-month", label: "Within 30 Days", sub: "Soon but not urgent" },
                      { value: "planning", label: "Planning Ahead", sub: "No rush" },
                    ].map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input {...register("urgency")} type="radio" value={opt.value} className="sr-only" />
                        <div className={cn("border rounded-lg p-3 text-center transition-all", "hover:border-brand-orange cursor-pointer",
                          errors.urgency ? "border-red-400" : "border-gray-300"
                        )}>
                          <div className="text-sm font-semibold text-brand-charcoal">{opt.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{opt.sub}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <FieldError message={errors.urgency?.message} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe Your Project *</label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none", errors.description ? "border-red-400" : "border-gray-300")}
                    placeholder="Tell us about your roof — age, any known issues, what you're hoping to accomplish..."
                  />
                  <FieldError message={errors.description?.message} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    {["phone", "email", "text"].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input {...register("preferredContact")} type="radio" value={method} className="accent-brand-orange" />
                        <span className="text-sm capitalize text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {serverError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{serverError}</div>
                )}

                <Button type="submit" size="lg" className="w-full justify-center" loading={isSubmitting}>
                  Submit Estimate Request
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to be contacted about your roofing project. We never share your information.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-brand-charcoal mb-4">What Happens Next</h3>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "We contact you", desc: "Within 24 hours to schedule your inspection" },
                    { step: "2", title: "Free roof inspection", desc: "Thorough assessment of your roof's condition" },
                    { step: "3", title: "Detailed estimate", desc: "Written quote with full materials and labor breakdown" },
                    { step: "4", title: "You decide", desc: "No pressure — take all the time you need" },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-brand-orange text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-brand-charcoal">{item.title}</p>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-brand-charcoal text-white rounded-2xl p-6">
                <h3 className="font-bold mb-4">Need Immediate Help?</h3>
                <div className="space-y-3">
                  <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 text-white hover:text-brand-orange transition-colors">
                    <Phone size={18} className="text-brand-orange" />
                    <span className="font-semibold">{COMPANY.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Clock size={16} className="text-brand-orange flex-shrink-0" />
                    <span>Mon–Fri 7am–6pm, Sat 8am–4pm</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400 text-sm">
                    <Shield size={16} className="flex-shrink-0" />
                    <span>24/7 Emergency Storm Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
