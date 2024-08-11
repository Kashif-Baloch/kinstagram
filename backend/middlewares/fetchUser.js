const jwt = require('jsonwebtoken');
const secret = "secretisnotingjustablopperahahaha!@##$$%%%%1234";

const fetchUser = (req, res, next) => {
    //Getting token from user req's header
    let token = req.headers['auth-token'];

    //Return 401 res if token is not present in header
    if (!token) {
        return res.status(401).send({ error: "401 Not Found" });
    }

    //Handle error
    try {
        //Verify String Using autha the secret key
        let data = jwt.verify(token, secret);

        //Adding user object of data in req.user
        req.user = data.email

        //Running next function
        next();

    } catch {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser