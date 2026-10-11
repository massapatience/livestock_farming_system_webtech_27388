const mongoose = require('mongoose');

// ─── Health Record ────────────────────────────────────────────────────────────
const healthRecordSchema = new mongoose.Schema(
  {
    animalId:    { type: String, required: true },
    animalTag:   { type: String, required: true },
    recordType:  { type: String, enum: ['vaccination', 'treatment', 'checkup'], required: true },
    description: { type: String, required: true },
    medication:  { type: String },
    dosage:      { type: String },
    nextDueDate: { type: Date },
    vetId:       { type: String },
    vetName:     { type: String },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

// ─── Activity Log ─────────────────────────────────────────────────────────────
const activityLogSchema = new mongoose.Schema(
  {
    userId:   { type: String, required: true },
    action:   { type: String, required: true },
    resource: { type: String, required: true },
    details:  { type: mongoose.Schema.Types.Mixed },
    ip:       { type: String },
  },
  { timestamps: true }
);

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
const ActivityLog  = mongoose.model('ActivityLog', activityLogSchema);

module.exports = { HealthRecord, ActivityLog };
