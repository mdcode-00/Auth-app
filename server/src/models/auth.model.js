import mongoose from "mongoose";

const authShema = new mongoose.Schema({

  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  },

}, {
  timestamps: true
})

const Auth = mongoose.model('Auth', authShema)

export default Auth;