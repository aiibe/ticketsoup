/// <reference path="../../../pb_data/types.d.ts" />

/**
 * Send email to customer and agents when ticket is submitted
 */
function onCreateTicketSuccess(e) {
  e.next();

  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mailing/mail.utils.js`);

  // Ticket
  const ticketRecord = e.record;
  const ticketId = ticketRecord.get("id");

  // Sender
  const { senderAddress, senderName, appName } = e.app.settings().meta;
  const from = { address: senderAddress, name: senderName };

  // Customer
  const customerId = ticketRecord.get("customer_id");
  const customer = e.app.findRecordById("customers", customerId);

  // Message to customer
  const customerMessage = new MailerMessage({
    from,
    to: [{ address: customer.email() }],
    subject: `Your ticket #${ticketId} has been created`,
    html: mailUtils.createHtml(`
        <p>Hi <strong>${customer.get("fullName")}</strong>, your ticket has been created.</p>
        <p>Thank you for your feedback. We will get back to you as soon as possible.</p>
        <p>${appName} team</p>
        <br>
        <p>Please do not reply to this email.</p>
    `),
  });

  e.app.newMailClient().send(customerMessage);

  // Agents
  const agents = e.app.findAllRecords("agents");
  const { appURL } = e.app.settings().meta;

  // Message each agent
  agents.forEach((agent) => {
    const message = new MailerMessage({
      from,
      to: [{ address: agent.email() }],
      subject: `New ticket #${ticketId} submitted`,
      html: mailUtils.createHtml(`
          <p>A new <a href="${appURL}/ticket/${ticketId}" target="_blank" rel="noopener">ticket #${ticketId}</a> has been submitted by <strong>${customer.get("fullName")}</strong></p>
          <br />
          <blockquote>
            <pre><small>${ticketRecord.get("message")}</small></pre>
          </blockquote>
          <br>
          <p>Please do not reply to this email.</p>
      `),
    });

    e.app.newMailClient().send(message);
  });
}

module.exports = { onCreateTicketSuccess };