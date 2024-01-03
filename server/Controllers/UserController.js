import asyncWrapper from '../Middleware/AsyncWrapper.js'
import HttpStatusText from '../Utilis/HttpStatusText.js'
import User from '../Models/UserModel.js'

export const getusers = asyncWrapper( async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    state: HttpStatusText.SUCCESS,
    data:{users}
  })
});
