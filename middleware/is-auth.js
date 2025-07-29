const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.tokenn;

    try {
        const verifiedToken = jwt.verify(token, "somesecuresecretkeysecretkey");

        if (!verifiedToken) {
            const error = new Error("Validation Failed!");
            error.statusCode = 401;
            throw error;
        }

        if (
            verifiedToken.ua !== req.headers["user-agent"] ||
            verifiedToken.ip !== req.ip
        ) {
            const error = new Error("Validation Failed!");
            error.statusCode = 401;
            error.data = "Please Login First!";
            throw error;
        }

        req.userId = verifiedToken.userId; 
    } catch (err) {
        console.log(err);
        const error = new Error("An error occurred!");
        if (!err.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
    next();
};
