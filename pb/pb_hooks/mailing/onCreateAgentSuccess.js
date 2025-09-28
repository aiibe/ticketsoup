/// <reference path="../../../pb_data/types.d.ts" />

/**
 * Send invitation email to new agent
 */
function onCreateAgentSuccess(e) {
  e.next();

  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mailing/mail.utils.js`);

  // Agent
  const agentRecord = e.record;
  const agentEmail = agentRecord.get("email");
  const agentFullName = agentRecord.get("fullName");

  // Generate password reset token
  const token = e.record.newPasswordResetToken();

  // Email
  const { senderAddress, senderName, appName, appURL } = e.app.settings().meta;
  const from = { address: senderAddress, name: senderName };

  const message = new MailerMessage({
    from,
    to: [{ address: agentEmail }],
    subject: `You have been invited to join ${appName}`,
    html: mailUtils.createHtml(`
        <p>Hello ${agentFullName},</p>
        <p>You are invited to join us at ${appName}.</p>
        <p>Click on the button below to reset your account's password.</p>
        <p>
          <a class="btn" href="${appURL}/confirm-agent/${token}" target="_blank" rel="noopener">Reset password</a>
        </p>
        <p>
          Thanks,<br/>
          ${appName} team
        </p>
        <br>
        <p>Please do not reply to this email.</p>
    `),
  });

  e.app.newMailClient().send(message);
}

module.exports = { onCreateAgentSuccess };