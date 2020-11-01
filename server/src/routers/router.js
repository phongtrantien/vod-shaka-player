const router = require("express").Router();

const userController = require('../controller/user.controller');
const videoController = require('../controller/video.controller')
const auth = require('../middleware/auth');
const isLecture = require("../middleware/checkIsLecture");

router.post('/user', userController.createUser);
router.post('/login', userController.login);
// router.get('/token', auth, userController.checkToken)

// test check is lecture
router.get('/test', auth, isLecture, videoController.createFile)


router.post('/add-course',auth,isLecture, userController.addCourse);
router.get('/delete-course',auth, isLecture, userController.delCourse);
router.post('/update-course',auth, isLecture, userController.updateCourse)

module.exports = router;