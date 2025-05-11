/**
 * Send email to customer and agents when ticket is submitted
 */
onRecordAfterCreateSuccess((e) => {
  e.next();

  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mail.utils.js`);

  // Ticket
  const ticketRecord = e.record;

  // Sender
  const { senderAddress, senderName } = e.app.settings().meta;
  const from = { address: senderAddress, name: senderName };

  // Customer
  const customerId = ticketRecord.get("customer_id");
  const customer = e.app.findRecordById("customers", customerId);

  // Message to customer
  const customerMessage = new MailerMessage({
    from,
    to: [{ address: customer.email() }],
    subject: "Your ticket has been created",
    html: mailUtils.createHtml(`
        <p>Hi <strong>${customer.get("fullName")}</strong>, your ticket has been created.</p>
        <p>Thank you for your feedback. We will get back to you as soon as possible.</p>
    `),
  });

  e.app.newMailClient().send(customerMessage);

  // Agents
  const agents = e.app.findAllRecords("agents");

  // Message each agent
  agents.forEach((agent) => {
    const message = new MailerMessage({
      from,
      to: [{ address: agent.email() }],
      subject: "New ticket submitted",
      html: mailUtils.createHtml(`
          <p>A new ticket has been submitted by <strong>${customer.get("fullName")}</strong></p>
          <br />
          <blockquote>
            <pre><small>${ticketRecord.get("message")}</small></pre>
          </blockquote>
      `),
    });

    e.app.newMailClient().send(message);
  });
}, "tickets");

/**
 * Send email to agent when ticket is updated
 */
onRecordAfterUpdateSuccess((e) => {
  e.next();

  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mail.utils.js`);

  // Ticket
  const ticketRecord = e.record;
  const ticketId = ticketRecord.get("id");

  // Agent assigned to ticket
  const agentId = ticketRecord.get("assigned_to");
  const agent = e.app.findRecordById("agents", agentId);

  // Sender
  const { senderAddress, senderName } = e.app.settings().meta;
  const from = { address: senderAddress, name: senderName };

  // Message to agent
  const message = new MailerMessage({
    from,
    to: [{ address: agent.email() }],
    subject: `Ticket assigned to you`,
    html: mailUtils.createHtml(`
        <p>Ticket ${ticketId} has been assigned to you</p>
    `),
  });

  e.app.newMailClient().send(message);
}, "tickets");
