const { ActivityLog } = require('../models/mongo');

const activityLogger = (action, resource) => async (req, res, next) => {
  try {
    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        action,
        resource,
        details: req.body,
        ip: req.ip,
      });
    }
  } catch (_) {}
  next();
};

module.exports = activityLogger;
