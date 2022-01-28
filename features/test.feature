Feature: test

  Scenario: sign up passed
    Given I make a request to signup to "http://localhost:3000/auths/signup" with <data>
    When I receive a response signup passed 
    Then response signup passed should have a status code 200

    Examples:
      | data                                                                                       |
      | {"username": "admin","password": "admin" ,"email": "admin@gmail.com"} |

  Scenario: sign up missing
    Given I make a request signup to "http://localhost:3000/auths/signup" with <data>
    When I receive a response signup missing 1
    Then response signup missing 1 should have a status code 400

    Examples:
      | data                                                                |
      | {"password": "admin" ,"email": "admin1@gmail.com"} |
  
  Scenario: sign up missing
    Given I make a request signup to "http://localhost:3000/auths/signup" with <data>
    When I receive a response signup missing 2
    Then response signup missing 2 should have a status code 409

    Examples:
      | data                                                                                       |
      | {"username": "username","password": "admin" ,"email": "admin1@gmail.com"} |

  
  Scenario: login passed
    Given I make a request login passed to "http://localhost:3000/auths/login" with <data>
    When I receive a response login passed
    Then response login passed should have a status code 200

    Examples:
      | data                                             |
      | {"username": "username","password": "admin"} |

  Scenario: login missing
    Given I make a request login missing to "http://localhost:3000/auths/login" with <data>
    When I receive a response login missing
    Then response login missing should have a status code 400

    Examples:
      | data                                        |
      | {"username": "username","password": "pass"} |

  Scenario: add user passed
    Given I make a request add passed to "http://localhost:3000/auths/add" with <data>
    When I receive a response add passed
    Then response add passed should have a status code 201

    Examples:
      | data                                                                                         |
      | {"username": "admin1","password": "admin" ,"email": "admin1@gmail.com"} |

  Scenario: add missing
    Given I make a request add missing 1 to "http://localhost:3000/auths/add" with <data>
    When I receive a response add missing 1
    Then response add missing 1 should have a status code 400

    Examples:
      | data                                                               |
      | {"password": "admin" ,"email": "admin1@gmail.com"} |

  Scenario: add missing
    Given I make a request add missing 2 to "http://localhost:3000/auths/add" with <data>
    When I receive a response add missing 2
    Then response add missing 2 should have a status code 409

    Examples:
      | data                                                                                        |
      | {"username": "username", "password": "admin" ,"email": "admin1@gmail.com"} |

  Scenario: get all user passed
    Given I make a request get all user passed to "http://localhost:3000/auths"
    When I receive a response get all user passed
    Then response get all user passed should have a status code 200

  Scenario: get all user missing
    Given No data exist
    And I make a request get all user missing to "http://localhost:3000/auths" 
    When I receive a response get all user missing
    Then response get all user missing should have a status code 404

  Scenario: get one user passed
    Given user id exist
    And I make a request get one user passed to "http://localhost:3000/auths"
    When I receive a response get one user passed
    Then response get one user passed should have a status code 200

  Scenario: get one user missing
    Given user id not exist I make a request get one user missing to "http://localhost:3000/auths"
    When I receive a response get one user missing
    Then response get one user missing should have a status code 404

  Scenario: update one user passed
    Given user id update exist
    And I make a request update one user passed to "http://localhost:3000/auths" with <data>
    When I receive a response update one user passed
    Then response update one user passed should have a status code 200

  Examples:
      | data                                                                                        |
      | {"username": "admin1", "password": "admin" ,"email": "admin1@gmail.com"} |

  Scenario: update one user missing
    Given user id update not exist I make a request update one user missing to "http://localhost:3000/auths" with <data>
    When I receive a response update one user missing
    Then response update one user missing should have a status code 404

  Examples:
      | data                                                                                        |
      | {"username": "admin2", "password": "admin" ,"email": "admin1@gmail.com"} |
  

