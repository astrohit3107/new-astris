/**
 * Nakshatraalay Gurgaon — registrations web app.
 *
 * Receives registrations from the website and appends them to this sheet.
 *
 * SETUP (once, about two minutes):
 *  1. Open the "Nakshatraalay Gurgaon — Registrations" Google Sheet.
 *  2. Extensions → Apps Script. Delete what is there and paste this file.
 *  3. Change TOKEN below to a long random string.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Authorise when asked, then copy the Web app URL (ends in /exec).
 *  5. In Vercel → new-astris → Settings → Environment Variables add:
 *       REGISTRATIONS_WEBHOOK_URL   = the /exec URL
 *       REGISTRATIONS_WEBHOOK_TOKEN = the same TOKEN as below
 *     and redeploy.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit →
 * New version, so the URL stays the same.
 */

var TOKEN = 'CHANGE-ME-to-a-long-random-string';
var TAB = 'Registrations';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return json_({ ok: false, error: 'unauthorised' });
    if (!body.values || !body.values.length) return json_({ ok: false, error: 'no values' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
      sheet.appendRow(body.values.map(String));
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err).slice(0, 200) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
