import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    // In production: send via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({...});

    console.log("Quote request received:", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      service: data.serviceType,
      urgency: data.urgency,
      city: data.city,
    });

    return NextResponse.json(
      { success: true, message: "Quote request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid submission" },
      { status: 400 }
    );
  }
}
