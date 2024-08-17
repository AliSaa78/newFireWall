import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true  }
});


=======
  username: { type: String, required: true},
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin' , 'doctor', 'Pharmacist'], default: 'user' }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
      this.password =await bcrypt.hash(this.password, 10);
      return next();

    } catch (error) {
      return next(error);
    }
});
>>>>>>> ali_waleed

const User = mongoose.model('User', userSchema);

export default User;
<<<<<<< HEAD
=======
  
>>>>>>> ali_waleed
