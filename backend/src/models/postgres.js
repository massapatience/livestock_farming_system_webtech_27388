const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');

// ─── User ────────────────────────────────────────────────────────────────────
const User = sequelize.define('User', {
  id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:     { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING },
  role:     { type: DataTypes.ENUM('admin', 'farmer', 'vet'), defaultValue: 'farmer' },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// ─── Animal ──────────────────────────────────────────────────────────────────
const Animal = sequelize.define('Animal', {
  id:         { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  tagNumber:  { type: DataTypes.STRING, allowNull: false, unique: true },
  name:       { type: DataTypes.STRING },
  species:    { type: DataTypes.STRING, allowNull: false },
  breed:      { type: DataTypes.STRING },
  gender:     { type: DataTypes.ENUM('male', 'female'), allowNull: false },
  dob:        { type: DataTypes.DATEONLY },
  status:     { type: DataTypes.ENUM('healthy', 'sick', 'pregnant', 'sold', 'deceased'), defaultValue: 'healthy' },
  farmerId:   { type: DataTypes.UUID, allowNull: false },
});

// ─── Breeding ─────────────────────────────────────────────────────────────────
const Breeding = sequelize.define('Breeding', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  maleId:      { type: DataTypes.UUID, allowNull: false },
  femaleId:    { type: DataTypes.UUID, allowNull: false },
  matingDate:  { type: DataTypes.DATEONLY, allowNull: false },
  expectedDob: { type: DataTypes.DATEONLY },
  actualDob:   { type: DataTypes.DATEONLY },
  offspringCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  notes:       { type: DataTypes.TEXT },
});

// ─── Feed Inventory ───────────────────────────────────────────────────────────
const FeedInventory = sequelize.define('FeedInventory', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  feedType:    { type: DataTypes.STRING, allowNull: false },
  quantity:    { type: DataTypes.FLOAT, allowNull: false },
  unit:        { type: DataTypes.STRING, defaultValue: 'kg' },
  minThreshold:{ type: DataTypes.FLOAT, defaultValue: 50 },
  farmerId:    { type: DataTypes.UUID, allowNull: false },
});

// ─── Sale ─────────────────────────────────────────────────────────────────────
const Sale = sequelize.define('Sale', {
  id:         { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  animalId:   { type: DataTypes.UUID, allowNull: false },
  buyerName:  { type: DataTypes.STRING, allowNull: false },
  saleDate:   { type: DataTypes.DATEONLY, allowNull: false },
  amount:     { type: DataTypes.FLOAT, allowNull: false },
  farmerId:   { type: DataTypes.UUID, allowNull: false },
});

// ─── Associations ─────────────────────────────────────────────────────────────
User.hasMany(Animal, { foreignKey: 'farmerId', as: 'animals' });
Animal.belongsTo(User, { foreignKey: 'farmerId', as: 'farmer' });

User.hasMany(FeedInventory, { foreignKey: 'farmerId', as: 'feedInventories' });
FeedInventory.belongsTo(User, { foreignKey: 'farmerId', as: 'farmer' });

User.hasMany(Sale, { foreignKey: 'farmerId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'farmerId', as: 'farmer' });

Animal.hasMany(Sale, { foreignKey: 'animalId', as: 'sales' });
Sale.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

module.exports = { User, Animal, Breeding, FeedInventory, Sale };
