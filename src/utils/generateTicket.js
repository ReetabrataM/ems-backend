const QRCode = require("qrcode");

const generateTicket = async (ticketNumber) => {
  return await QRCode.toDataURL(ticketNumber);
};

module.exports = generateTicket;