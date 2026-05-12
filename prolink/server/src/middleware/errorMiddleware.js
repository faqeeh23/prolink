
const errorMiddleware = (err, req, res, next) => {
    console.error("Error Path:", req.path);
    console.error("Error Message:", err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message : err.message || "حدث خطأ داخلي في السيرفر",
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
    
};

module.exports = errorMiddleware;