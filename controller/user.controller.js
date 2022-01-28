//library import
const jwt = require("jsonwebtoken")
const Ajv = require("ajv")
const axios = require('axios')

//schema import
const userLoginSchema = require("../schema/userLogin.schema")

//initiate
const ajv = new Ajv()

//export methods
module.exports ={
  login : async (req, res, next) => {
    //get data
    var loginUser = req.body;
    console.log(loginUser);
  
    //validate data
    const validate = ajv.compile(userLoginSchema,{unknownFormats: 'ignore'})
    const valid = validate(loginUser)
  
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
  }
}