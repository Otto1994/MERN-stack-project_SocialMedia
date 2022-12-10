import  express  from "express";
import  {DeleteUser, followUser, getAllUsers, getUser, UnfollowUser, updateUser}  from "../Controllers/userController.js";

const router =express.Router()

router.get('/:id',getUser)
router.get('/',getAllUsers)
router.put('/:id',updateUser)
router.delete('/:id',DeleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',UnfollowUser)
export default router