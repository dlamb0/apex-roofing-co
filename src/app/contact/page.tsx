"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Section, Container } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please call us at " + COMPANY.phone);
    }
  };

  return (
    <>
      <div className="bg-brand-charcoal py-20">
        <Container>
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Apex Roofing</h1>
          <p className="text-gray-300 text-lg max-w-2xl">Questions about a project, a quote request, or just want to say hello — we&apos;re here and we respond fast.</p>
        </Container>
      </div>

      <Section background="cream" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-brand-charcoal text-lg mb-5">Contact Information</h2>
                <div className="space-y-4">
                  <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                      <p className="font-semibold text-brand-charcoal group-hover:text-brand-orange transition-colors">{COMPANY.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="font-semibold text-brand-charcoal group-hover:text-brand-orange transition-colors text-sm">{COMPANY.email}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Address</p>
                      <p className="font-semibold text-brand-charcoal text-sm">{COMPANY.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Hours</p>
                      <p className="text-sm text-brand-charcoal">Mon–Fri: 7am–6pm</p>
                      <p className="text-sm text-brand-charcoal">Saturday: 8am–4pm</p>
                      <p className="text-sm text-green-600 font-semibold">24/7 Emergency Line</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-orange rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Storm Emergency?</h3>
                <p className="text-white/80 text-sm mb-4">Our emergency team is on call 24/7 for active roof damage, tarping, and board-up services.</p>
                <a
                  href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 bg-white text-brand-orange font-bold px-5 py-3 rounded-lg hover:bg-brand-cream transition-colors w-full justify-center"
                >
                  <Phone size={18} /> Call Now: {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Message Sent!</h2>
                  <p className="text-gray-600">We&apos;ll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5">
                  <h2 className="text-xl font-bold text-brand-charcoal">Send Us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                      <input {...register("name")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.name ? "border-red-400" : "border-gray-300")} placeholder="John Smith" />
                      <FieldError message={errors.name?.message} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input {...register("email")} type="email" className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.email ? "border-red-400" : "border-gray-300")} placeholder="john@example.com" />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (optional)</label>
                    <input {...register("phone")} type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange" placeholder="(612) 555-0100" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                    <input {...register("subject")} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange", errors.subject ? "border-red-400" : "border-gray-300")} placeholder="Question about residential roofing" />
                    <FieldError message={errors.subject?.message} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea {...register("message")} rows={5} className={cn("w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none", errors.message ? "border-red-400" : "border-gray-300")} placeholder="Tell us what you need..." />
                    <FieldError message={errors.message?.message} />
                  </div>

                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{serverError}</div>
                  )}

                  <Button type="submit" size="lg" className="w-full justify-center" loading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
