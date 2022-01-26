module.exports = function checkUserExisting(user){
    axios.post(`http://localhost:9200/csdl/users/_search`,
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "username" : user.username,
              }
            }
          ]
        }
      }
    }).then(response => {
      if(response.data.hits.total.value >= 1){
        return false;
      }
      else{
        return true;
      }
    });
}