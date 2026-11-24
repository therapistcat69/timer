import mongoose,{Schema} from 'mongoose';
const Session = new Schema({startTime:{type:Date,required:true},endTime:{type:Date,required:true},durationMs:{type:Number,required:true},tag:{type:String,default:'Deep Work'},note:{type:String,default:''}},{_id:true});
const DailyLogSchema=new Schema({logicalDate:{type:String,required:true,unique:true,index:true},totalDurationMs:{type:Number,default:0},dailyGoalMs:{type:Number,default:21600000},sessions:{type:[Session],default:[]}},{timestamps:true});
export default mongoose.models.DailyLog || mongoose.model('DailyLog',DailyLogSchema);
