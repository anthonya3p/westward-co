const MAX = { nom: 120, email: 254, telephone: 40, objet: 160, situation: 160, rentree: 100, message: 5000 };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

function clean(value, key) {
  return String(value || '').trim().slice(0, MAX[key] || 500);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).hostname !== new URL(request.url).hostname) return json({ ok: false }, 403);

  let input;
  try { input = await request.json(); } catch { return json({ ok: false, code: 'invalid' }, 400); }
  if (input.website) return json({ ok: true });

  const type = input.type === 'campus' ? 'campus' : 'contact';
  const data = {
    nom: clean(input.nom, 'nom'), email: clean(input.email, 'email'), telephone: clean(input.telephone, 'telephone'),
    objet: clean(input.objet, 'objet'), situation: clean(input.situation, 'situation'), rentree: clean(input.rentree, 'rentree'),
    message: clean(input.message, 'message')
  };
  if (!data.nom || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ ok: false, code: 'invalid' }, 400);
  if (type === 'campus' && !data.situation) return json({ ok: false, code: 'invalid' }, 400);

  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_API_TOKEN;
  if (!accountId || !token) return json({ ok: false, code: 'email_not_configured' }, 503);

  const lines = type === 'campus'
    ? [`Nom : ${data.nom}`, `E-mail : ${data.email}`, `Téléphone : ${data.telephone || 'Non renseigné'}`, `Situation : ${data.situation}`, `Rentrée envisagée : ${data.rentree || 'Non renseignée'}`, '', 'Projet :', data.message]
    : [`Nom : ${data.nom}`, `E-mail : ${data.email}`, '', 'Message :', data.message];
  const subject = type === 'campus' ? 'Nouveau projet d’études — Westward Co. Campus' : `Nouveau contact — ${data.objet || 'Westward Co.'}`;
  const text = lines.join('\n');
  const html = `<h1>${escapeHtml(subject)}</h1><p>${lines.map(escapeHtml).join('<br>')}</p>`;

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      to: env.CONTACT_TO_EMAIL || 'anthony@westwardco.fr',
      from: env.CONTACT_FROM_EMAIL || 'website@westwardco.fr',
      replyTo: data.email,
      subject,
      text,
      html
    })
  });
  if (!response.ok) {
    console.error('Email delivery failed', response.status, await response.text());
    return json({ ok: false, code: 'delivery_failed' }, 502);
  }
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false }, 405);
}
