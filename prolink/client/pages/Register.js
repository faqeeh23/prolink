import { useState } from "react"

export default function Register() {
    useState (() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/';
        }
    } , [])
    useState(() => {
        const [name , setName] = useState('');
        const [email , setEmail] = useState('');
        const [password , setPassword] = useState('');
        const [error , setError] = useState('');
        const [success , setSuccess] = useState('');
        const [loading , setLoading] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/auth/register' , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({ name , email , password })
                })
                const data = await response.json();
                if (response.ok) {
                    setSuccess(data.message);
                    setError('');
                    setName('');
                    setEmail('');
                    setPassword('');
                } else {
                    setError(data.message);
                    setSuccess('');
                }
            } catch (error) {
                setError('حدث خطأ في الاتصال بالسيرفر');
                setSuccess('');
            } finally {
                setLoading(false);
            }
        }
    } , [])
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">صفحة التسجيل</h1>
        </div>
    )
}