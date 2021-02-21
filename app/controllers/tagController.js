const Tag = require('../models/tag');
const PerfumeHasTag = require('../models/perfumeHasTag');

/**
 * A controller in charge of all tag middleware functions
 */
const tagController = {

    /**
     * Middleware function displays all the tags
     * @module allTags
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - tags found
    */
    allTags: async (_, res) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);   
        }
        catch(error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function diplays one tag (according to the given id in request param) and the associated perfumes
     * @module oneTag
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the tag found
     */
    oneTag: async (req, res) => {
        const { id } = req.params;

        try {
            const tag = await Tag.findOne(id);
            res.json(tag);
        } 
        catch(error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one tag (according to the informations given in body request)
     * @module newTag
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the tag saved
     */
    newTag: async (req, res) => {
        const newTag = new Tag(req.body);

        try {
            await newTag.save();
            res.json(newTag);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function adds one association between a perfume (according to id in request param) and a tag (according to the informations given in body request)
     * @module newAssociation
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the new association perfume <-> tag created
     */
    newAssociation: async (req, res) => {  
        const data = {
            perfumeId: Number(req.params.id),
            tagId: req.body.tagId
        };
            
        const newAssociation = new PerfumeHasTag(data);

        try {

            await newAssociation.save();
            res.json(newAssociation);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one tag (according to the informations given in body and params request)
     * @module updateOneTag
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the tag modified
     */
    updateOneTag: async (req, res) => {
        const { id } = req.params; // le tag à modifier
        const data = req.body; // les infos données

        try {
            const tagToUpdate = await Tag.findOne(id);

            for (const field in data) {
                if(typeof tagToUpdate[field] !== "undefined"){
                    tagToUpdate[field] = data[field];
                }
            };

            const updatedTag = new Tag(tagToUpdate);
            await updatedTag.update();
            res.json(updatedTag); 
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    },


};

module.exports = tagController;