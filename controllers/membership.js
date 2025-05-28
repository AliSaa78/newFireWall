import Patient from "../models/patient";

exports.memberShip = async (req, res, next) => {
  const registerDayInMs = (req.patient.registerDay).getTime();
  const currentDateInMs = Date.now();

  // Calculate one month in milliseconds (approximately 30 days)
  const Yearly = 365.25 * 24 * 60 * 60 * 1000; // Includes leap year
  const expiryDateInMs = registerDayInMs + Yearly;

  // If the current date is less than the expiry date, the membership is still valid
  if (currentDateInMs < expiryDateInMs) {
    req.patient.memberShip = true; // Membership is still valid
  } else {
    req.patient.memberShip = false; // Membership has expired
  }

  next();
};
