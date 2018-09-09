module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    log: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Entry.associate = function(models) {
    // We're saying that a Entry should belong to an Pet
    // An Entry can't be created without a Pet due to the foreign key constraint
    Entry.belongsTo(models.Pet, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Entry;
};