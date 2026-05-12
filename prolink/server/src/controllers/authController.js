const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const Register = async (req , res ) => {
    try {
        const { name , email , password } = req.body;

        if (!email || !password || !name ) {
            return res.status(400).json({ message: "كلمة السر والايميل والاسم مطلوبين "})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "صيغة الايميل غير صحيحة "})
        }
        const existingUser = await prisma.user.findUnique({ where : {email} });
        if ( existingUser ) {
            return res.status(400).json({ message: "المستخدم موجود بالفعل "})
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                password : hashedPassword
            }
        })
        const token = jwt.sign({ id : newUser.id } , process.env.JWT_SECRET , { expiresIn : '10d'})
        res.status(201).json({ message : "تم التسجيل ب نجاح " , user : { id : newUser.id , name : newUser.name , email : newUser.email } , token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : "حدث خطأ في السيرفر "})
    }
}

const Login = async (req , res ) => {
    try {
        const { email , password } = req.body;
        if (!email || !password) {
            return res.status(400).json( { message : "كلمة السر والايميل مطلوبين "})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "صيغة الايميل غير صحيحة "})
        }
        const user = await prisma.user.findUnique({ where : {email} });
        if (!user ) {
            return res.status(400).json({ message : "المستخدم غير موجود "})
        }
        const isPasswordValid = await bcrypt.compare(password , user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message : "كلمة السر غير صحيحة "})
        }
        const token = jwt.sign({ id : user.id } , process.env.JWT_SECRET , { expiresIn : '10d'})
        res.status(200).json( { message : " تم تسجيل الدخول بنجاح " , user : { id : user.id , name : user.name , email : user.email } , token })

    }
        catch (error) {
        console.error(error);
        res.status(500).json({ message : "حدث خطأ في السيرفر "})
    }
}

module.exports = {
    Register,
    Login
}
