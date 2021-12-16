module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});
    Task.associate = (models) => {
        Task.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
        });
    }
    return Task;
};