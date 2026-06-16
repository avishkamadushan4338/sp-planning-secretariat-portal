const express    = require('express')
const nodemailer = require('nodemailer')
const fs         = require('fs')
const path       = require('path')

const router   = express.Router()
const DATA_DIR  = path.join(__dirname, '../../data')
const DATA_FILE = path.join(DATA_DIR, 'complaints.json')


// ── JSON persistence helpers ────────────────────────────────────────────────
function readComplaints() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return []
  }
}

function writeComplaints(items) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

// ── Nodemailer transporter ──────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:              process.env.SMTP_HOST,
    port:              Number(process.env.SMTP_PORT) || 587,
    secure:            process.env.SMTP_SECURE === 'true',
    connectionTimeout: 8000,
    greetingTimeout:   5000,
    socketTimeout:     10000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ── POST /api/contact ───────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { name, email, phone, type, dept, subject, message } = req.body

  if (!name?.trim())                               return res.status(400).json({ error: 'Name is required.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  return res.status(400).json({ error: 'Valid email is required.' })
  if (!subject?.trim())                            return res.status(400).json({ error: 'Subject is required.' })
  if ((message?.trim() ?? '').length < 20)         return res.status(400).json({ error: 'Message must be at least 20 characters.' })

  const complaints = readComplaints()
  const entry = {
    id:        Date.now(),
    createdAt: new Date().toISOString(),
    status:    'New',
    name:      name.trim(),
    email:     email.trim().toLowerCase(),
    phone:     phone?.trim() || null,
    type:      type?.trim() || 'General Inquiry',
    dept:      dept?.trim() || null,
    subject:   subject.trim(),
    message:   message.trim(),
  }
  complaints.unshift(entry)
  writeComplaints(complaints)

  // Respond immediately — email is fire-and-forget
  res.status(201).json({ ok: true, id: entry.id })

  // Send emails in background
  try {
    const transporter = createTransporter()
    const adminEmail  = process.env.ADMIN_EMAIL   || 'info@splanning.gov.lk'
    const senderLabel = process.env.SMTP_FROM_NAME || 'SP Planning Portal'
    const senderAddr  = process.env.SMTP_USER

    const refId   = String(entry.id).slice(-8).toUpperCase()
    const dateStr = new Date(entry.createdAt).toLocaleString('en-LK', {
      timeZone: 'Asia/Colombo', weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })

    const TYPE_EMOJI = {
      'Complaint':                  '⚑',
      'Suggestion':                 '◈',
      'General Inquiry':            '◎',
      'Service Feedback':           '◆',
      'Right to Information (RTI)': '◉',
    }
    const typeEmoji = TYPE_EMOJI[entry.type] || '◈'

    /* ════════════════════════════════════════════════════════
       ADMIN EMAIL
    ════════════════════════════════════════════════════════ */
    const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New ${entry.type} — Ref #${refId}</title>
</head>
<body style="margin:0;padding:0;background:#1a0a0e;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0a0e;padding:40px 16px;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

  <!-- Thin gold rule top -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>
  <tr><td style="height:3px;background:linear-gradient(90deg,transparent,#4A0918,#6E1024,#4A0918,transparent);font-size:0;">&nbsp;</td></tr>
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>

  <!-- Masthead -->
  <tr><td style="background:linear-gradient(180deg,#2d0a14 0%,#4A0918 60%,#3a0712 100%);padding:44px 48px 36px;text-align:center;border-left:1px solid rgba(199,154,43,0.25);border-right:1px solid rgba(199,154,43,0.25);">
    <p style="margin:0 0 4px;font-size:10px;font-weight:400;letter-spacing:6px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">SOUTHERN PROVINCE</p>
    <h1 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#E8C55A;letter-spacing:1px;line-height:1.3;">Planning Secretariat</h1>
    <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(199,154,43,0.5);font-family:Arial,sans-serif;">Sri Lanka Government</p>
    <!-- Divider ornament -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(199,154,43,0.4));"></td>
        <td style="width:12px;text-align:center;color:#C79A2B;font-size:16px;padding:0 8px;">&#10022;</td>
        <td style="height:1px;background:linear-gradient(90deg,rgba(199,154,43,0.4),transparent);"></td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(232,197,90,0.45);font-family:Arial,sans-serif;">OFFICIAL CORRESPONDENCE</p>
  </td></tr>

  <!-- Notification type banner -->
  <tr><td style="background:#6E1024;border-left:1px solid rgba(199,154,43,0.25);border-right:1px solid rgba(199,154,43,0.25);padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:14px 48px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:3px;height:100%;background:#C79A2B;border-radius:2px;"></td>
              <td style="padding-left:14px;">
                <p style="margin:0 0 1px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:rgba(232,197,90,0.6);font-family:Arial,sans-serif;">INCOMING</p>
                <p style="margin:0;font-size:15px;font-weight:700;color:#FCFBFA;letter-spacing:0.5px;font-family:Arial,sans-serif;">${entry.type}</p>
              </td>
            </tr>
          </table>
        </td>
        <td style="padding:14px 48px 14px 0;text-align:right;">
          <p style="margin:0 0 1px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:rgba(232,197,90,0.6);font-family:Arial,sans-serif;">REFERENCE</p>
          <p style="margin:0;font-size:15px;font-weight:700;color:#E8C55A;font-family:'Courier New',monospace;letter-spacing:3px;">#${refId}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Main body -->
  <tr><td style="background:#FCFBFA;border-left:1px solid rgba(74,9,24,0.15);border-right:1px solid rgba(74,9,24,0.15);padding:44px 48px 36px;">

    <!-- Date line -->
    <p style="margin:0 0 32px;font-size:12px;color:#9A7520;letter-spacing:1px;font-family:Arial,sans-serif;border-bottom:1px solid #E7E1DC;padding-bottom:16px;">${dateStr}</p>

    <!-- Submitter block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="vertical-align:top;width:4px;background:linear-gradient(180deg,#C79A2B,#9A7520);border-radius:2px;">&nbsp;</td>
        <td style="padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 14px;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">Submitted By</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:90px;padding:7px 0;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9A7520;vertical-align:top;font-family:Arial,sans-serif;">Name</td>
              <td style="padding:7px 0;font-size:15px;color:#2a0810;font-weight:600;border-bottom:1px solid #E7E1DC;">${entry.name}</td>
            </tr>
            <tr>
              <td style="width:90px;padding:7px 0;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9A7520;vertical-align:top;font-family:Arial,sans-serif;">Email</td>
              <td style="padding:7px 0;border-bottom:1px solid #E7E1DC;"><a href="mailto:${entry.email}" style="font-size:14px;color:#4A0918;text-decoration:none;font-weight:600;">${entry.email}</a></td>
            </tr>
            <tr>
              <td style="width:90px;padding:7px 0;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9A7520;vertical-align:top;font-family:Arial,sans-serif;">Phone</td>
              <td style="padding:7px 0;font-size:14px;color:#2a0810;${entry.dept ? 'border-bottom:1px solid #E7E1DC;' : ''}">${entry.phone || '<span style="color:#C79A2B;font-style:italic;">Not provided</span>'}</td>
            </tr>
            ${entry.dept ? `<tr>
              <td style="width:90px;padding:7px 0;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9A7520;vertical-align:top;font-family:Arial,sans-serif;">Department</td>
              <td style="padding:7px 0;font-size:14px;color:#2a0810;">${entry.dept}</td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>

    <!-- Subject -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:#F5EFE6;border-top:2px solid #C79A2B;border-bottom:1px solid #E7E1DC;padding:18px 24px;">
        <p style="margin:0 0 5px;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">Subject</p>
        <p style="margin:0;font-size:20px;color:#2a0810;line-height:1.35;font-weight:700;">${entry.subject}</p>
      </td></tr>
    </table>

    <!-- Message -->
    <p style="margin:0 0 12px;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">Message</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      <tr><td style="background:#FCFBFA;border:1px solid #E7E1DC;border-left:3px solid #C79A2B;padding:22px 26px;">
        <p style="margin:0;font-size:15px;color:#2a0810;line-height:2;white-space:pre-wrap;">${entry.message}</p>
      </td></tr>
    </table>

    <!-- Gold rule -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,transparent);font-size:0;">&nbsp;</td>
      </tr>
    </table>

    <!-- Reply CTA -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <a href="mailto:${entry.email}?subject=Re:%20${encodeURIComponent('[' + entry.type + '] ' + entry.subject)}%20(Ref%20%23${refId})"
          style="display:inline-block;background:linear-gradient(135deg,#4A0918 0%,#6E1024 50%,#4A0918 100%);color:#E8C55A;font-size:12px;font-weight:700;text-decoration:none;padding:16px 44px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;border:1px solid rgba(199,154,43,0.4);">
          Reply to Submitter
        </a>
      </td></tr>
    </table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#2d0a14;border-left:1px solid rgba(199,154,43,0.25);border-right:1px solid rgba(199,154,43,0.25);padding:28px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-size:11px;color:rgba(199,154,43,0.5);line-height:2;font-family:Arial,sans-serif;">
          <span style="color:rgba(199,154,43,0.7);font-weight:600;">SP Planning Secretariat</span> &nbsp;&mdash;&nbsp; Southern Province, Sri Lanka<br>
          153B, S.H. Dahanayaka Mawatha, Galle &nbsp;&bull;&nbsp; Tel: +94 912234503 &nbsp;&bull;&nbsp; Fax: +94 912246554 &nbsp;&bull;&nbsp; spdcsp@gmail.com<br>
          <span style="color:rgba(199,154,43,0.35);">Auto-generated &nbsp;&bull;&nbsp; Ref #${refId} &nbsp;&bull;&nbsp; Do not reply directly to this message</span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Bottom gold rule -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body></html>`

    /* ════════════════════════════════════════════════════════
       USER CONFIRMATION EMAIL
    ════════════════════════════════════════════════════════ */
    const userHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Submission Confirmed — Ref #${refId}</title>
</head>
<body style="margin:0;padding:0;background:#1a0a0e;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0a0e;padding:40px 16px;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

  <!-- Thin gold rule top -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>
  <tr><td style="height:3px;background:linear-gradient(90deg,transparent,#4A0918,#6E1024,#4A0918,transparent);font-size:0;">&nbsp;</td></tr>
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>

  <!-- Masthead -->
  <tr><td style="background:linear-gradient(180deg,#2d0a14 0%,#4A0918 60%,#3a0712 100%);padding:44px 48px 36px;text-align:center;border-left:1px solid rgba(199,154,43,0.25);border-right:1px solid rgba(199,154,43,0.25);">
    <p style="margin:0 0 4px;font-size:10px;font-weight:400;letter-spacing:6px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">SOUTHERN PROVINCE</p>
    <h1 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#E8C55A;letter-spacing:1px;line-height:1.3;">Planning Secretariat</h1>
    <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(199,154,43,0.5);font-family:Arial,sans-serif;">Sri Lanka Government</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(199,154,43,0.4));"></td>
        <td style="width:12px;text-align:center;color:#C79A2B;font-size:16px;padding:0 8px;">&#10022;</td>
        <td style="height:1px;background:linear-gradient(90deg,rgba(199,154,43,0.4),transparent);"></td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(232,197,90,0.45);font-family:Arial,sans-serif;">ACKNOWLEDGEMENT OF RECEIPT</p>
  </td></tr>

  <!-- Confirmation banner -->
  <tr><td style="background:#F5EFE6;border-left:1px solid rgba(199,154,43,0.4);border-right:1px solid rgba(199,154,43,0.4);border-top:2px solid #C79A2B;border-bottom:2px solid #C79A2B;padding:28px 48px;text-align:center;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">Reference Number</p>
    <p style="margin:0 0 16px;font-size:32px;font-weight:700;color:#4A0918;font-family:'Courier New',monospace;letter-spacing:6px;">#${refId}</p>
    <p style="margin:0;font-size:13px;color:#6E1024;letter-spacing:0.5px;font-family:Arial,sans-serif;">Keep this number for your records. You will need it for any future correspondence.</p>
  </td></tr>

  <!-- Main body -->
  <tr><td style="background:#FCFBFA;border-left:1px solid rgba(74,9,24,0.12);border-right:1px solid rgba(74,9,24,0.12);padding:44px 48px 36px;">

    <!-- Salutation -->
    <p style="margin:0 0 8px;font-size:12px;color:#9A7520;letter-spacing:1px;font-family:Arial,sans-serif;border-bottom:1px solid #E7E1DC;padding-bottom:16px;">${dateStr}</p>
    <p style="margin:24px 0 6px;font-size:18px;color:#2a0810;font-weight:400;">Dear <strong style="color:#4A0918;">${entry.name}</strong>,</p>
    <p style="margin:0 0 32px;font-size:15px;color:#3a1018;line-height:1.9;">
      We acknowledge receipt of your <strong>${entry.type.toLowerCase()}</strong> submitted to the
      <strong>Planning Secretariat of the Southern Provincial Council of Sri Lanka</strong>.
      Your submission has been duly recorded and assigned the reference number above.
      A designated officer will review your submission and respond within
      <strong style="color:#4A0918;">three (3) working days</strong>.
    </p>

    <!-- Gold rule -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="width:40px;height:1px;background:#E7E1DC;"></td>
        <td style="height:1px;background:linear-gradient(90deg,#E7E1DC,#C79A2B,#E7E1DC);"></td>
        <td style="width:40px;height:1px;background:#E7E1DC;"></td>
      </tr>
    </table>

    <!-- Submission summary -->
    <p style="margin:0 0 16px;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">Submission Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;border:1px solid #E7E1DC;">
      <tr style="background:#F5EFE6;">
        <td style="padding:12px 20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9A7520;width:130px;border-right:1px solid #E7E1DC;border-bottom:1px solid #E7E1DC;font-family:Arial,sans-serif;">Reference</td>
        <td style="padding:12px 20px;font-size:14px;color:#4A0918;font-family:'Courier New',monospace;font-weight:700;letter-spacing:2px;border-bottom:1px solid #E7E1DC;">#${refId}</td>
      </tr>
      <tr>
        <td style="padding:12px 20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9A7520;border-right:1px solid #E7E1DC;border-bottom:1px solid #E7E1DC;font-family:Arial,sans-serif;">Type</td>
        <td style="padding:12px 20px;font-size:14px;color:#2a0810;border-bottom:1px solid #E7E1DC;">${entry.type}</td>
      </tr>
      <tr style="background:#F5EFE6;">
        <td style="padding:12px 20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9A7520;border-right:1px solid #E7E1DC;border-bottom:1px solid #E7E1DC;font-family:Arial,sans-serif;">Subject</td>
        <td style="padding:12px 20px;font-size:14px;color:#2a0810;font-weight:600;border-bottom:1px solid #E7E1DC;">${entry.subject}</td>
      </tr>
      <tr>
        <td style="padding:12px 20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9A7520;border-right:1px solid #E7E1DC;${entry.dept ? 'border-bottom:1px solid #E7E1DC;' : ''}font-family:Arial,sans-serif;">Submitted</td>
        <td style="padding:12px 20px;font-size:13px;color:#2a0810;${entry.dept ? 'border-bottom:1px solid #E7E1DC;' : ''}">${dateStr}</td>
      </tr>
      ${entry.dept ? `<tr style="background:#F5EFE6;">
        <td style="padding:12px 20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9A7520;border-right:1px solid #E7E1DC;font-family:Arial,sans-serif;">Department</td>
        <td style="padding:12px 20px;font-size:14px;color:#2a0810;">${entry.dept}</td>
      </tr>` : ''}
    </table>

    <!-- Process steps -->
    <p style="margin:0 0 20px;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9A7520;font-family:Arial,sans-serif;">What Happens Next</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      <tr>
        <td style="vertical-align:top;width:52px;text-align:center;padding-top:2px;">
          <div style="width:36px;height:36px;border:2px solid #C79A2B;background:#F5EFE6;text-align:center;line-height:32px;font-size:13px;font-weight:700;color:#4A0918;font-family:Arial,sans-serif;display:inline-block;">I</div>
        </td>
        <td style="padding:4px 0 20px 4px;border-left:1px dashed rgba(199,154,43,0.4);">
          <p style="margin:0 0 4px 16px;font-size:13px;font-weight:700;color:#2a0810;">Recorded &amp; Assigned</p>
          <p style="margin:0 0 0 16px;font-size:13px;color:#6E1024;line-height:1.6;">Your submission has been securely recorded and assigned to the appropriate division.</p>
        </td>
      </tr>
      <tr>
        <td style="vertical-align:top;width:52px;text-align:center;padding-top:2px;">
          <div style="width:36px;height:36px;border:2px solid #C79A2B;background:#F5EFE6;text-align:center;line-height:32px;font-size:13px;font-weight:700;color:#4A0918;font-family:Arial,sans-serif;display:inline-block;">II</div>
        </td>
        <td style="padding:4px 0 20px 4px;border-left:1px dashed rgba(199,154,43,0.4);">
          <p style="margin:0 0 4px 16px;font-size:13px;font-weight:700;color:#2a0810;">Under Review</p>
          <p style="margin:0 0 0 16px;font-size:13px;color:#6E1024;line-height:1.6;">A review officer will examine your ${entry.type.toLowerCase()} within three (3) working days.</p>
        </td>
      </tr>
      <tr>
        <td style="vertical-align:top;width:52px;text-align:center;padding-top:2px;">
          <div style="width:36px;height:36px;border:2px solid #C79A2B;background:#F5EFE6;text-align:center;line-height:32px;font-size:13px;font-weight:700;color:#4A0918;font-family:Arial,sans-serif;display:inline-block;">III</div>
        </td>
        <td style="padding:4px 0 0 4px;">
          <p style="margin:0 0 4px 16px;font-size:13px;font-weight:700;color:#2a0810;">Official Response</p>
          <p style="margin:0 0 0 16px;font-size:13px;color:#6E1024;line-height:1.6;">Our official response will be sent to <strong>${entry.email}</strong>.</p>
        </td>
      </tr>
    </table>

    <!-- Gold rule -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="width:40px;height:1px;background:#E7E1DC;"></td>
        <td style="height:1px;background:linear-gradient(90deg,#E7E1DC,#C79A2B,#E7E1DC);"></td>
        <td style="width:40px;height:1px;background:#E7E1DC;"></td>
      </tr>
    </table>

    <!-- Closing -->
    <p style="margin:0 0 4px;font-size:15px;color:#2a0810;line-height:1.8;">Yours faithfully,</p>
    <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#4A0918;">Office of the Planning Secretariat</p>
    <p style="margin:0;font-size:13px;color:#9A7520;font-style:italic;">Southern Province, Sri Lanka</p>

    <!-- Follow-up note -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr><td style="background:#F5EFE6;border-left:3px solid #C79A2B;padding:14px 18px;">
        <p style="margin:0;font-size:12px;color:#4A0918;line-height:1.8;font-family:Arial,sans-serif;">
          To follow up on this matter, please reply to this email quoting your reference number
          <strong style="font-family:'Courier New',monospace;color:#6E1024;letter-spacing:2px;">#${refId}</strong>.
        </p>
      </td></tr>
    </table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#2d0a14;border-left:1px solid rgba(199,154,43,0.25);border-right:1px solid rgba(199,154,43,0.25);padding:28px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="border-bottom:1px solid rgba(199,154,43,0.15);padding-bottom:16px;margin-bottom:16px;">
        <p style="margin:0;font-size:12px;color:rgba(199,154,43,0.6);line-height:2;font-family:Arial,sans-serif;">
          <span style="color:rgba(199,154,43,0.85);font-weight:600;letter-spacing:1px;">Planning Secretariat — Southern Province</span><br>
          153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka<br>
          <a href="tel:+94912234503" style="color:rgba(199,154,43,0.6);text-decoration:none;">Tel: +94 912234503</a>
          &nbsp;&bull;&nbsp;
          Fax: +94 912246554
          &nbsp;&bull;&nbsp;
          <a href="mailto:spdcsp@gmail.com" style="color:rgba(199,154,43,0.6);text-decoration:none;">spdcsp@gmail.com</a>
          &nbsp;&bull;&nbsp; Mon – Fri &nbsp; 8:30 AM – 4:30 PM
        </p>
      </td></tr>
      <tr><td style="padding-top:14px;">
        <p style="margin:0;font-size:10px;color:rgba(199,154,43,0.3);letter-spacing:1px;font-family:Arial,sans-serif;">
          This is an automatically generated acknowledgement. Ref #${refId}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Bottom gold rule -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#C79A2B,#E8C55A,#C79A2B,transparent);font-size:0;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body></html>`

    await Promise.all([
      transporter.sendMail({
        from:    `"${senderLabel}" <${senderAddr}>`,
        to:      adminEmail,
        replyTo: entry.email,
        subject: `${typeEmoji} [${entry.type}] ${entry.subject} — Ref #${refId}`,
        html:    adminHtml,
      }),
      transporter.sendMail({
        from:    `"${senderLabel}" <${senderAddr}>`,
        to:      `"${entry.name}" <${entry.email}>`,
        subject: `✅ Received: ${entry.subject} (Ref #${refId})`,
        html:    userHtml,
      }),
    ])
  } catch (mailErr) {
    console.error('[contact] Email send failed:', mailErr.message)
  }
})

// ── GET /api/contact ────────────────────────────────────────────────────────
router.get('/', (_req, res) => {
  res.json(readComplaints())
})

// ── PATCH /api/contact/:id ──────────────────────────────────────────────────
router.patch('/:id', (req, res) => {
  const id      = Number(req.params.id)
  const { status } = req.body
  const allowed = ['New', 'In Review', 'Resolved', 'Closed']
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status.' })

  const items = readComplaints()
  const idx   = items.findIndex(c => c.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found.' })

  items[idx].status = status
  writeComplaints(items)
  res.json({ ok: true, item: items[idx] })
})

// ── DELETE /api/contact/:id ─────────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const id   = Number(req.params.id)
  const items = readComplaints()
  const next  = items.filter(c => c.id !== id)
  if (next.length === items.length) return res.status(404).json({ error: 'Not found.' })
  writeComplaints(next)
  res.json({ ok: true })
})

module.exports = router
