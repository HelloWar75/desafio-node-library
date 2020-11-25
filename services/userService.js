const user = require('../models/user');

const userService = {

    create: async ( userJson ) => {
        const userTmp = user.create(userJson);
        return userTmp;
    },

    findById: async ( id ) => {
        const userTmp = await user.findOne({ _id: id });
        return userTmp;
    },

    findByEmail: async ( email ) => {
        const userTmp = await user.findOne({ email: email });
        return userTmp;
    },

    update: async ( id, userJson ) => {
        const updateduser = await user.updateOne({ _id: id }, userJson);
        return updateduser;
    },

    delete: async ( id ) => {
        const deleteduser = await user.deleteOne({ _id: id });
        
        if( deleteduser.deletedCount < 1 )
            return {
                error: 'user not found!'
            };

        return deleteduser;
    },

    findOne: async ( queryJson ) => {
        const findOneuser = await user.findOne(queryJson);
        return findOneuser;
    },

    findByEsbn13: async ( isbn ) => {
        const userTmp = await user.findOne({ isbn13: isbn });
        return userTmp;
    }

};

module.exports = userService;