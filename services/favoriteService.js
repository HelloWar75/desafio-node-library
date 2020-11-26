const favorite = require('../models/favorite');

const favoriteService = {

    create: async (favoriteJson) => {
        const favoriteTmp = favorite.create(favoriteJson);
        return favoriteTmp;
    },

    findAll: async (skip, limit) => {
        const allFavorites = await favorite.find().populate('bookId').populate('userId').skip(skip).limit(limit);
        return allFavorites;
    },

    findAllByUserId: async (skip, limit, uid) => {
        const allFavorites = await favorite.find({ userId: uid }).populate('bookId').populate('userId').skip(skip).limit(limit);
        return allFavorites;
    },

    findById: async ( id ) => {
        const favoriteTmp = await favorite.findOne({ _id: id });
        return favoriteTmp;
    },

    findByUid: async ( uid ) => {
        const favoriteTmp = await favorite.findOne({ userId: uid });
        return favoriteTmp;
    },

    findByBid: async ( bid ) => {
        const favoriteTmp = await favorite.findOne({ bookId: bid });
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


};

module.exports = favoriteService;