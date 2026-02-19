const Joi = require('joi');

module.exports.listingsSchema=Joi.object({
    listings:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow("",null)
    }).required(),
})
module.exports.reviewsSchema=Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().min(1).max(5).required(),
        
    }).required(),
})