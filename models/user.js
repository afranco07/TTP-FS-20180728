module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        balance: DataTypes.DECIMAL(10, 2)
    });

    User.associate = (models) => {
        models.User.hasMany(models.Transaction);
    }

    return User;
}