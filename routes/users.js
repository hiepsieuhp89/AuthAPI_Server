var express = require('express');
const jwt = require("jsonwebtoken")
const verify = require("../middleware/checkToken")

var axios = require('axios');
const { checkout } = require('.');
var router = express.Router();

//login
router.post('/login', function(req, res, next) {
  var loginUser = req.body;
  console.log(loginUser);
   // Ký và tạo token
  const token = jwt.sign({_id: loginUser._id}, process.env.SECRET_TOKEN)
  res.header("auth-token", token);
   // Kiểm tra email
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
        res.status(200).send({accessToken: token, ...response.data.hits.hits[0]._source});
      }
      else{
        res.status(400).send("Không tìm thấy tài khoản");
      }
    });
});
//Signup
router.post('/signup', function(req, res, next) {
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
  const user = req.body;
  console.log(user);
  axios.post(`http://localhost:9200/csdl/users/`,user)
  .then(response => res.json({status: response.data.created}));
});

//edit an account
router.put('/:id',verify, function(req, res, next) {
  const user = req.body;
  console.log(user);
  axios.put(`http://localhost:9200/csdl/users/${req.params.id}`,user)
  .then(response => res.json({status: response.data.updated}));
});

module.exports = router;
