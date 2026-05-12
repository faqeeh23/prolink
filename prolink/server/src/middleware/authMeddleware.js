const jwt = require('jsonwebtoken');
const Auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message : "غير مصرح   ب الدخول  "})
    }
    try {
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message : "غير مصرح   ب الدخول  "})
    }
}
    
module.exports = Auth;
