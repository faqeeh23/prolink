const { OpenAI } = require("openai");
const openai = new OpenAI({ 
    apiKey: process.env.GROQ_API_KEY ,
    baseURL: "https://api.groq.com/openai/v1"
 });

const prisma = require('../lib/prisma.js');
const generateProject =  async (req, res , next ) => {
    try {
        const { name , description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message : "الاسم والوصف مطلوبين "})
        }
        const aiResponse = await openai.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are a professional software architect. 
                        Mandatory: You must return a JSON object with EXACTLY two keys: "tasks" and "files".
                        - "tasks": Array of 8-10 project milestones.
                        - "files": Array of at least 12 essential files with their paths (e.g., {"name": "server.js", "path": "src/server.js"}).
                        Do not include any prose or explanation, only the JSON.`
                    },
                    {
                        role: "user",
                        content: `Project: ${name}. Description: ${description}.`
                    }
                ],
                response_format: { type: "json_object" }
            });
        
        const projectPlan = JSON.parse(aiResponse.choices[0].message.content);

        const rawFiles = projectPlan.files || projectPlan.fileStructures || [];

        const rawTasks = projectPlan.tasks || [];

        console.log("البيانات القادمة من التوكن:", req.user);
        const newProject = await prisma.project.create({
            data : {
                name,
                description,
                ownerId : req.user.id || req.user.userId || req.user.id || req.user.userId,
                tasks : {
                    create : rawTasks.map((task , index) => ({
                        title : task.title || `Milestone ${index + 1}`,
                        description : task.description || "",
                        order : index + 1
                    }))
                },
            fileStructures : {
                create : rawFiles.map((file) => ({
                    name : file.name,
                    path : file.path,
                    content : `// Code for ${file.name} in project ${name}`
                }))
            },
        },
            include : {
                tasks : true,
                fileStructures : true
            }
        });
        res.status(201).json({ message : "تم إنشاء المشروع بنجاح " , project : newProject })
    } catch (error) {
        next(error);
    }

}

const generateFileContent = async (req, res, next) => {
    try {
        const { fileId } = req.params;

        // 1. جلب بيانات الملف والمشروع المرتبط به
        const file = await prisma.fileStructure.findUnique({
            where: { id: fileId },
            include: { project: true } // لكي نعرف سياق المشروع (الوصف والاسم)
        });

        if (!file) return res.status(404).json({ message: "الملف غير موجود" });

        // 2. إرسال الطلب للذكاء الاصطناعي
        const aiResponse = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an expert Senior Full-stack Developer.
                    Your task is to write the ACTUAL code for a specific file based on the project context.
                    Respond ONLY with the code. No explanations, no markdown code blocks , just the raw code.
                    Ensure the code is compatible with the other files mentioned in the project structure and follows best practices.`
                },
                {
                    role: "user",
                    content: `Project Name: ${file.project.name}
                    Project Description: ${file.project.description}
                    File Name: ${file.name}
                    File Path: ${file.path}
                    Write the production-ready code for this file using the best practices.`
                }
            ]
        });

        const generatedCode = aiResponse.choices[0].message.content;

        // 3. تحديث محتوى الملف في قاعدة البيانات
        const updatedFile = await prisma.fileStructure.update({
            where: { id: fileId },
            data: { content: generatedCode }
        });

        res.status(200).json({
            success: true,
            message: "تم توليد الكود بنجاح",
            content: updatedFile.content
        });

    } catch (error) {
        next(error);
    }
};

const generateProjectSchema = async (req, res, next) => {
    
        try {
            const { projectId } = req.params;
            const { databaseType} = req.body;
            if (!databaseType) {
                return res.status(400).json({ message : "نوع قاعدة البيانات مطلوب "})
            }
            const project = await prisma.project.findUnique({
                where : { id : projectId },
                include : { fileStructures : true }
            })
            if (!project) {
                return res.status(404).json({ message : "المشروع غير موجود "})
            }

            const aiResponse = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a Senior Database Architect. 
                    Your goal is to provide a database schema/model based on the user's specific database choice.
                    - If the user chooses a SQL DB (MySQL/PostgreSQL), provide the DDL (CREATE TABLE statements).
                    - If the user chooses NoSQL (MongoDB), provide Mongoose models.
                    - If the user chooses Prisma, provide the schema.prisma content.
                    Return the result as a JSON object with a "schemaCode" key.`
                },
                {
                    role: "user",
                    content: `Project: ${project.name}
                    Description: ${project.description}
                    Target Database: ${databaseType}
                    Files involved: ${JSON.stringify(project.fileStructures.map(f => f.path))}`
                }
            ],  
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(aiResponse.choices[0].message.content);
        
        res.status(200).json({ 
            message: `تم توليد مخطط ${databaseType} بنجاح`, 
            schema: result.schemaCode 
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateProject,        
    generateFileContent,
    generateProjectSchema
}

