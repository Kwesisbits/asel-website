import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPA_URL   = Deno.env.get("SUPABASE_URL")!;
const SUPA_SRV   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN      = "info@aselafrica.org";
const FROM       = "ASEL Africa <no-reply@aselafrica.org>";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const payload = await req.json();

    const db = createClient(SUPA_URL, SUPA_SRV);
    const { error } = await db.from("partner_inquiries").insert(payload);
    if (error) throw error;

    const name = payload.contact_name ?? "Partner";
    const org  = payload.organisation_name ?? "your organisation";

    // Receipt to partner
    await send(payload.email, `ASEL Africa — Partnership Enquiry Received`, `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a2e4a;padding:32px;text-align:center">
          <img src="https://www.aselafrica.org/logo.png" alt="ASEL Africa" height="56"/>
        </div>
        <div style="padding:32px;color:#1a2e4a">
          <h2>Thank you, ${name}</h2>
          <p>We have received your partnership enquiry from <strong>${org}</strong>.</p>
          <p>A member of the ASEL Africa team will follow up within <strong>3–5 business days</strong> to discuss next steps.</p>
          <p>Warm regards,<br/><strong>ASEL Africa Team</strong></p>
        </div>
        <div style="background:#f8f6f1;padding:16px;text-align:center;font-size:12px;color:#6b7280">
          info@aselafrica.org · aselafrica.org
        </div>
      </div>`);

    // Alert to admin
    await send(ADMIN, `New Partner Enquiry — ${org}`, `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a2e4a;padding:24px">
          <h2 style="color:#f5a800;margin:0">New Partner Enquiry</h2>
        </div>
        <div style="padding:24px">
          <p><strong>Organisation:</strong> ${org}</p>
          <p><strong>Contact:</strong> ${name} — ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone ?? "—"}</p>
          <p><strong>Partnership type:</strong> ${payload.partnership_type ?? "—"}</p>
          <p><strong>Message:</strong> ${payload.message ?? "—"}</p>
        </div>
      </div>`);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});

async function send(to: string, subject: string, html: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!r.ok) throw new Error(`Resend error: ${await r.text()}`);
}
