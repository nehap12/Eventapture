/**
 * Created by anasrazafirdousi on 2/10/17.
 */
//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

//////////////////////////
// Schema
//////////////////////////

var storyCategorySchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    is_active:{
        type:Boolean,
        required:true
    }
});

//////////////////////////
// Export Schema
//////////////////////////

var StoryCategory = mongoose.model('StoryCategory',storyCategorySchema,'storyCategories');
module.exports.StoryCategory = StoryCategory;

