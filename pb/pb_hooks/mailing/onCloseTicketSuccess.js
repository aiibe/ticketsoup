/// <reference path="../../../pb_data/types.d.ts" />

/**
 * Send email to customer when ticket is closed
 */
function onCloseTicketSuccess(e) {
  const ticketRecord = e.record;
  const prevTicketRecord = ticketRecord.original();

  // Check if ticket was just closed (status changed to closed)
  const wasClosed = !prevTicketRecord.get("closed") && ticketRecord.get("closed");

  if (wasClosed) {
    // Load mail utils to create email
    const mailUtils = require(`${__hooks}/mailing/mail.utils.js`);
    const ticketId = ticketRecord.get("id");

    // Get customer info
    const customerId = ticketRecord.get("customer_id");
    const customer = e.app.findRecordById("customers", customerId);

    // Email setup
    const { senderAddress, senderName, appName } = e.app.settings().meta;
    const from = { address: senderAddress, name: senderName };

    // Send notification to customer
    const customerMessage = new MailerMessage({
      from,
      to: [{ address: customer.email() }],
      subject: `Your ticket #${ticketId} has been resolved`,
      html: mailUtils.createHtml(`
        <p>Hi <strong>${customer.get("fullName")}</strong>,</p>
        <p>Your ticket #${ticketId} has been resolved and closed.</p>
        <p>Thank you for your feedback. If you have any further questions, please don't hesitate to create a new ticket.</p>
        <p>Best regards,<br/>${appName} team</p>
        <br>
        <p>Please do not reply to this email.</p>
      `),
    });

    e.app.newMailClient().send(customerMessage);
  }

  e.next();
}

module.exports = { onCloseTicketSuccess };