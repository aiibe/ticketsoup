/// <reference path="../../../pb_data/types.d.ts" />

/**
 * Send email to agent when ticket is assigned
 */
function onAssignAgentTicketSuccess(e) {
  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mailing/mail.utils.js`);

  // Ticket
  const ticketRecord = e.record;
  const ticketId = ticketRecord.get("id");

  // Previous ticket state
  const prevTicketRecord = ticketRecord.original();
  const prevAgentId = prevTicketRecord.get("assigned_to");

  // Agent assigned to ticket
  const agentId = ticketRecord.get("assigned_to");
  if (!agentId) return e.next();

  const agent = e.app.findRecordById("agents", agentId);
  if (!agent) return e.next();

  // Unless ticket's agent changes, do not send email
  if (prevAgentId !== agentId) {
    // Sender
    const { senderAddress, senderName, appURL } = e.app.settings().meta;
    const from = { address: senderAddress, name: senderName };

    // Message to agent
    const message = new MailerMessage({
      from,
      to: [{ address: agent.email() }],
      subject: `Ticket #${ticketId} assigned to you`,
      html: mailUtils.createHtml(`
        <p><a href="${appURL}/ticket/${ticketId}" target="_blank" rel="noopener">Ticket #${ticketId}</a> has been assigned to you</p>
        <p><em>"${ticketRecord.get("message").substring(0, 100)}..."</em></p>
    `),
    });

    e.app.newMailClient().send(message);
  }

  e.next();
}

module.exports = { onAssignAgentTicketSuccess };