// can be variable object or function
module.exports = (sequelize, DataTypes) => {
    const Users =  sequelize.define("Users", {
        firstname: {
            type: DataTypes.STRING,

        },
        lastname: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        username: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    });

    // Users.associate = (models) => {
    //     Users.hasMany(models.Posts, {
    //         onDelete: "cascade",
    //     });
    // };

    // code for profile pictures
    // Users.associate = (models) => {
    //     Users.hasMany(models.ProfilePictures, {
    //         onDelete: "cascade",
    //     });
    // };

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",

        });
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });

        
    };

    return Users;
};