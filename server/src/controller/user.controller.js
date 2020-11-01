const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const Course = require('../model/Course');

const createUser = async(req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if(user) {
      return res.status(409).json({
        status: false,
        message: "Sinh viên này đã tồn tại trên hệ thống" 
      })
    } 
    
    user = new User()
    const salt = await bcrypt.genSalt(8);
    
    user.email = email;
    user.password = await bcrypt.hash(password, salt);
    
    if(role) {
      user.role = role;
    }

    user.save();

    return res.status(201).json({
      status: true,
      message: "User created"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email
    })
    
    if(!user) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      })
    }

    const payload = {
      id: user._id,
      email,
      role: user.role
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: "5 days"
      },
      (err, token) => {
        if(err) throw err;
        res.status(200).json({
          status: true,
          message: "Đăng nhập thành công",
          data: {
            token,
            user: payload
          }
        })
      }
    )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

const checkToken = () => {
  
}
const addCourse = async(req, res) => {
  const {course_name, description,lecturer_id} = req.body;
  var newCourse = {
    name: course_name,
    description: description,
    videos : [],
    students: [],
    lecturer:lecturer_id,
    schemester: ' ',

  }
  const course = new Course(newCourse);
  course.save()
    .then(() => res.status(200).json({status:true, message: ' thêm khóa học thành công!'}))
    .catch(() => res.status(500).json({status:false , message: ' thêm thất bại!'}))
}
const delCourse = async(req, res) => {
  const {course_id,} = req.query;
  const course = await Course.findOne({_id:course_id})
  if(course) {
    Course.deleteOne({_id:course_id})
      .then(() => res.status(200).json({message: 'ok'}))
      .catch(() => res.status(500).json({message:'fail'}))
  } else {
    return res.status(409).json({status:false,message:'khoa hoc khong ton tai'})
  }
  

}
const updateCourse = async(req, res) =>{
  const {course_id, course_name, description} = req.body;
  const course = await Course.findOne({_id:course_id})
  if(course){
    var newCourse = {
      name:course_name,
      description: description,
      students: course.students,
      videos: course.videos,
      lecturer: course.lecturer,
      schemester: course.schemester,
     }
    Course.updateOne({_id:course._id}, newCourse)
     .then(() => res.status(200).json({message:'ok'}))
     .catch(() => res.status(500).json({message:'fail'}))
  } else {
return res.status(409).json({message:'khoa hoc khong ton tai'})
  }
}
module.exports = {
  createUser,
  login,
  checkToken,
  addCourse,
  delCourse,
  updateCourse
}