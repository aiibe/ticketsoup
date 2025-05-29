/// <reference path="../pb_data/types.d.ts" />

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
        <p>${appName} team</p>
        <br>
        <p>Please do not reply to this email.</p>
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
          <br>
          <p>Please do not reply to this email.</p>
      `),
    });

    e.app.newMailClient().send(message);
  });
}, "tickets");

/**
 * Send email to agent when ticket is updated
 */
onRecordAfterUpdateSuccess((e) => {
  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mail.utils.js`);

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
  }

  e.next();
}, "tickets");

/**
 * Send invitation email to new agent
 */
onRecordAfterCreateSuccess((e) => {
  e.next();

  // Load mail utils to create email
  // https://pocketbase.io/docs/js-overview/#loading-modules
  const mailUtils = require(`${__hooks}/mail.utils.js`);

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
}, "agents");
