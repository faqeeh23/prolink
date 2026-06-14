const { OpenAI } = require("openai");
const openai = new OpenAI({ 
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const prisma = require('../lib/prisma.js');

function buildFileTreeString(files) {
    if (!files || files.length === 0) return "📁 Root Project Structure\n└── src/";
    const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));
    let treeLines = ["📁 Root Project Structure"];
    sortedFiles.forEach((file, index) => {
        const isLast = index === sortedFiles.length - 1;
        const prefix = isLast ? "└── " : "├── ";
        treeLines.push(`${prefix}${file.path}`);
    });
    return treeLines.join("\n");
}

const generateProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "الاسم والوصف مطلوبين" });
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

        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "المستخدم غير مصرح له، التوكن مفقود" });
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                ownerId: userId, 
                tasks: {
                    create: rawTasks.map((task, index) => {
                        if (typeof task === 'string') {
                            return {
                                title: task,
                                description: "",
                                order: index + 1
                            };
                        }
                        return {
                            title: task.title || `Milestone ${index + 1}`,
                            description: task.description || "",
                            order: index + 1
                        };
                    })
                },
                fileStructures: {
                    create: rawFiles.map((file) => ({
                        name: file.name,
                        path: file.path,
                        content: `// Code for ${file.name} in project ${name}`
                    }))
                },
            },
            include: {
                tasks: true,
                fileStructures: true
            }
        });

        const visualTree = buildFileTreeString(newProject.fileStructures);

        res.status(201).json({ 
            message: "تم إنشاء المشروع بنجاح", 
            projectId: newProject.id,
            tasks: newProject.tasks.map(t => t.title), 
            fileTree: visualTree,                     
            schemaCode: ""
        });   
    } catch (error) {
        next(error);
    }
};

const generateFileContent = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        const file = await prisma.fileStructure.findUnique({
            where: { id: fileId },
            include: { project: true } 
        });

        if (!file) return res.status(404).json({ message: "الملف غير موجود" });

        const aiResponse = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an expert Senior Full-stack Developer. Write the ACTUAL code for a specific file based on the project context. Respond ONLY with raw code.`
                },
                {
                    role: "user",
                    content: `Project Name: ${file.project.name}\nProject Description: ${file.project.description}\nFile Name: ${file.name}\nFile Path: ${file.path}`
                }
            ]
        });

        const generatedCode = aiResponse.choices[0].message.content;
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
        const { databaseType } = req.body;
        if (!databaseType) {
            return res.status(400).json({ message: "نوع قاعدة البيانات مطلوب" });
        }
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { fileStructures: true }
        });
        if (!project) {
            return res.status(404).json({ message: "المشروع غير موجود" });
        }

        const aiResponse = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a Senior Database Architect. Provide a database schema/model based on choice. Return as JSON object with a "schemaCode" key.`
                },
                {
                    role: "user",
                    content: `Project: ${project.name}\nDescription: ${project.description}\nTarget Database: ${databaseType}\nFiles involved: ${JSON.stringify(project.fileStructures.map(f => f.path))}`
                }
            ],  
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(aiResponse.choices[0].message.content);
        res.status(200).json({ 
            message: `تم توليد مخطط ${databaseType} بنجاح`, 
            schema: result.schemaCode || "" 
        });
    } catch (error) {
        next(error);
    }
};


const returnAllProjects = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "المستخدم غير مصرح له، التوكن مفقود" });
        }
        const projects = await prisma.project.findMany({
            where: { ownerId: userId },
            select: { id: true, name: true, description: true }
        });
        res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
};

const retutnProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                tasks: true,
                fileStructures: true,
                schema: true
            }
        });
        if (!project) {
            return res.status(404).json({ message: "Project Not defined" });
        }
        res.status(200).json({ 
            projectId: project.id,
            name: project.name,
            description: project.description,
            tasks: project.tasks.map(t => ({ title: t.title, description: t.description })),
            files: project.fileStructures.map(f => ({ name: f.name, path: f.path, content: f.content })),
            schema: project.schema ? project.schema.content : ""
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateProject,        
    generateFileContent,
    generateProjectSchema,
    retutnProject
};