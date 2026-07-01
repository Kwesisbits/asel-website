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
    const { error } = await db.from("course_registrations").insert(payload);
    if (error) throw error;

    const name    = payload.full_name ?? payload.contact_name ?? "Applicant";
    const email   = payload.email;
    const program = payload.program ?? "ASEL Program";

    // Receipt to applicant
    await send(email, `Your ASEL Africa Application — ${program}`, `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a2e4a;padding:32px;text-align:center">
          <img src="https://www.aselafrica.org/logo.png" alt="ASEL Africa" height="56"/>
        </div>
        <div style="padding:32px;color:#1a2e4a">
          <h2>Application Received — ${name}</h2>
          <p>Thank you for applying to <strong>${program}</strong>.</p>
          <p>Our team will be in touch within <strong>24–48 hours</strong> with:</p>
          <ul>
            <li>Payment options and amount (GHS)</li>
            <li>Cohort start date confirmation</li>
            <li>Pre-course preparation materials</li>
          </ul>
          <p>Warm regards,<br/><strong>ASEL Africa Team</strong></p>
        </div>
        <div style="background:#f8f6f1;padding:16px;text-align:center;font-size:12px;color:#6b7280">
          info@aselafrica.org · aselafrica.org
        </div>
      </div>`);

    // Alert to admin
    const rows = Object.entries(payload)
      .filter(([k]) => !["source", "created_at"].includes(k))
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;color:#1a2e4a">${k.replace(/_/g, " ")}</td><td style="padding:6px 12px">${v ?? "—"}</td></tr>`)
      .join("");

    await send(ADMIN, `New Registration — ${program} — ${name}`, `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a2e4a;padding:24px">
          <h2 style="color:#f5a800;margin:0">New Course Registration</h2>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse">${rows}</table>
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
