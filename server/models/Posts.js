module.exports = (sequelize, DataTypes) => {
    const Posts =  sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // creates a link to comments table
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",

        });

        // creates a link to the likes table
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",

        });
    };

    return Posts;
};
