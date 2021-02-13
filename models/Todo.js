module.exports = function(sequelize, DataTypes) {
    const Todo = sequelize.define('Todo', {
        test: DataTypes.STRING,
        complete: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    })
    return Todo
}