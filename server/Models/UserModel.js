//UserModel.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: {
    required: false,
    type: String  
  },
  twitterId: {
    required: false,
    type: String ,
  },
  name: {
    required: true,
    type: String
  },
  email:{
    type: String,
    sparse: true, 
  }
},
{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;