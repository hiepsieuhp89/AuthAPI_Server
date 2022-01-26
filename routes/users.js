var express = require('express')
var router = express.Router();
const jwt = require("jsonwebtoken")
const Ajv = require("ajv")
var axios = require('axios');
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const verify = require("../middleware/checkToken")
const {userLoginSchema, userSignupSchema} = require("../schema/user.schema")
const checkUserExisting = require("../helper/helper")

//login
router.post('/login', function(req, res, next) {
  //get data
  var loginUser = req.body;
  console.log(loginUser);

  //validate data
  const validate = ajv.compile(userLoginSchema)
  const valid = validate(user)

  if (!valid) {
    console.log(validate.errors)
    res.status(400).send('Invalid username or password');
  }

   // Kiểm tra tài khoản tồn tại
  axios.post(`http://localhost:9200/csdl/users/_search`,
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "username" : loginUser.username,
              }
            },
            {
              "match": {
                "password" : loginUser.password,
              }
            }
          ]
        }
      }
    }).then(response => {
      if(response.data.hits.total.value == 1){
        
        // Ký và tạo token
        const token = jwt.sign({_id: loginUser._id}, process.env.SECRET_TOKEN)
        res.header("auth-token", token);
        res.status(200).send({accessToken: token});
      }
      else{
        res.status(400).send("Invalid username or password");
      }
    });
});
//Signup
router.post('/signup', function(req, res, next) {
  //get data from body request
  const user = req.body;
  console.log(user);

  //validate data
  const validate = ajv.compile(userSignupSchema)
  const valid = validate(user)

  if (!valid) {
    console.log(validate.errors)
    res.status(400).send('Invalid');
  }
  else if(checkUserExisting(user)){
    res.status(409).send('Existing');
  }
  else{
     // Ký và tạo token
    const token = jwt.sign({_id: loginUser._id}, process.env.SECRET_TOKEN)
    res.header("auth-token", token);
    axios.post(`http://localhost:9200/csdl/users/`,user).then(response => res.status(201).json({status: response.data.created}));
  }
});
//review token to auto login
router.post('/renew', function(req, res, next) {
  var loginUser = req.body;
  const token = jwt.sign({_id: loginUser._id}, process.env.SECRET_TOKEN)
  res.header("auth-token", token).send(token);
});

// CUR

//get all account
router.get('/',verify, function(req, res, next) {
  axios.get('http://localhost:9200/csdl/users/_search')
  .then(response => res.json(response.data))
  //res.render('login',{bodyClass: 'login-page'});
});
//get an account
router.get('/:id',verify, function(req, res, next) {
  axios.get(`http://localhost:9200/csdl/users/${req.params.id}`)
  .then(response => res.json(response.data))
});

//add a new account
router.post('/',verify, function(req, res, next) {

  //get data from body request
  const user = req.body;
  console.log(user);

  //validate data
  const validate = ajv.compile(schema)
  const valid = validate(user)


  if (!valid) {
    console.log(validate.errors)
    res.status(400).send('Invalid');
  }
  else if(checkUserExisting(user)){
    res.status(409).send('Existing');
  }
  else{
    axios.post(`http://localhost:9200/csdl/users/`,user).then(response => res.status(201).json({status: response.data.created}));
  }
});

//edit an account
router.put('/:id',verify, function(req, res, next) {
  const user = req.body;
  console.log(user);
  axios.put(`http://localhost:9200/csdl/users/${req.params.id}`,user)
  .then(response => res.json({status: response.data.updated}));
});

module.exports = router;
