/// <reference path="../pb_data/types.d.ts" />

/**
 * Send email to customer and agents when ticket is submitted
 */
onRecordAfterCreateSuccess((e) => {
  const { onCreateTicketSuccess } = require(`${__hooks}/mailing/onCreateTicketSuccess.js`);
  onCreateTicketSuccess(e);
}, "tickets");

/**
 * Send email when ticket is updated (assignment or closure)
 */
onRecordAfterUpdateSuccess((e) => {
  const { onAssignAgentTicketSuccess } = require(`${__hooks}/mailing/onAssignAgentTicketSuccess.js`);
  const { onCloseTicketSuccess } = require(`${__hooks}/mailing/onCloseTicketSuccess.js`);

  // Handle ticket assignment
  onAssignAgentTicketSuccess(e);

  // Handle ticket closure
  onCloseTicketSuccess(e);
}, "tickets");

/**
 * Send invitation email to new agent
 */
onRecordAfterCreateSuccess((e) => {
  const { onCreateAgentSuccess } = require(`${__hooks}/mailing/onCreateAgentSuccess.js`);
  onCreateAgentSuccess(e);
}, "agents");
