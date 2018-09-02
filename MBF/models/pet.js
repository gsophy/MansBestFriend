module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Pet.associate = function(models) {
    // We're saying that a Pet should belong to an Owner
    // A Pet can't be created without an Owner due to the foreign key constraint
    Pet.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false,
      },
    });
    // Associating a Pet with an Entry
    // We're saying that a Pet can have many Entries / logs.
    Pet.hasMany(models.Entry, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade"
      }
    });
  };

  return Pet;
};