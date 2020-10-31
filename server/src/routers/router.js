const router = require("express").Router();

const userController = require('../controller/user.controller');
const videoController = require('../controller/video.controller')
const auth = require('../middleware/auth');
const isLecture = require("../middleware/checkIsLecture");

router.post('/user', userController.createUser);
router.post('/login', userController.login);
router.get('/token', auth, userController.checkToken)

// test check is lecture
router.get('/test', auth, isLecture, videoController.createFile)


router.get('/add-student', auth, isLecture, userController.addStudentToCourse);
router.get('/delete-student', auth, isLecture, userController.deleteStudentInCourse);
module.exports = router;