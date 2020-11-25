const favorite = require('../models/favorite');

const favoriteService = {

    create: async (favoriteJson) => {
        const favoriteTmp = favorite.create(favoriteJson);
        return favoriteTmp;
    },

    findById: async ( id ) => {
        const favoriteTmp = await favorite.findOne({ _id: id });
        return favoriteTmp;
    },

    update: async ( id, favoriteJson ) => {
        const updatedfavorite = await favorite.updateOne({ _id: id }, favoriteJson);
        return updatedfavorite;
    },

    delete: async ( id ) => {
        const deletedfavorite = await favorite.deleteOne({ _id: id });
        
        if( deletedfavorite.deletedCount < 1 )
            return {
                error: 'favorite not found!'
            };

        return deletedfavorite;
    },

    findOne: async ( queryJson ) => {
        const findOnefavorite = await favorite.findOne(queryJson);
        return findOnefavorite;
    },

    findByEsbn13: async ( isbn ) => {
        const favoriteTmp = await favorite.findOne({ isbn13: isbn });
        return favoriteTmp;
    }

};

module.exports = favoriteService;