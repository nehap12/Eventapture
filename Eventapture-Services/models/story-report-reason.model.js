/**
 * Created by anasrazafirdousi on 3/4/17.
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

var storyReportReasonsSchema = Schema({
    reason: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean
    }
});

//////////////////////////
// Export Schema
//////////////////////////

var StoryReportReasons = mongoose.model('StoryReportReasons',storyReportReasonsSchema,'storyReportReasons');
module.exports.StoryReportReasons = StoryReportReasons;



