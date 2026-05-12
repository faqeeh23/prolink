# ProLink: Technical Requirements Document (PRD) v1.1
## وثيقة المتطلبات التقنية - مشروع ProLink

### 1. نظرة عامة (Project Overview)
**ProLink** هو منصة تطوير متكاملة (Integrated Development Platform) تعمل بالذكاء الاصطناعي (AI-Powered). تهدف إلى تسريع عملية بناء البرمجيات (Software Development) عبر تحويل المتطلبات إلى هيكلية ملفات (File Structure) وأكواد أساسية (Boilerplate Code)، بالإضافة إلى إدارة المهام (Task Management) وعرض الخدمات للعملاء.[cite: 1]

---

### 2. هيكلية البيانات (Data Schema)
يجب أن تدعم قاعدة البيانات (Database) العلاقات التالية:

* **المستخدمون (Users):**
    * المعرف (ID)، الاسم (Name)، البريد الإلكتروني (Email)، كلمة المرور المشفرة (Hashed Password).[cite: 1]
    * الدور (Role): تحديد إذا كان المستخدم `Admin` (صاحب الموقع) أو `Client` (عميل).[cite: 1]
    * إعدادات الذكاء الاصطناعي (AI Settings): تخزين مفاتيح الـ API الخاصة بك بشكل مشفر.[cite: 1]
* **المشاريع (Projects):**
    * الاسم (Name)، الوصف (Description)، حالة المشروع (Status) مثل: `Draft`, `In-Progress`, `Completed`.[cite: 1]
    * معرف المالك (Owner_ID) للربط بالمستخدم.[cite: 1]
    * هيكل الملفات (File_Structure): حقل بصيغة `JSON` لتخزين شجرة الملفات المولدة بواسطة AI.[cite: 1]
    * نسبة الإنجاز (Progress Percentage): حقل يتم تحديثه تلقائياً.[cite: 1]
* **المهام (Tasks):**
    * العنوان (Title)، الحالة (Status) مثل: `Pending`, `Doing`, `Done`.[cite: 1]
    * الترتيب (Order): رقم تسلسلي (Sequence) يحدده الذكاء الاصطناعي لضمان بناء المشروع خطوة بخطوة.[cite: 1]
    * معرف المشروع (Project_ID) للربط بالمشروع التابع له.[cite: 1]
* **طلبات الخدمات (Service Requests):**
    * بيانات العميل (Client Info)، المتطلبات التقنية (Requirements)، الميزانية (Budget).[cite: 1]

---

### 3. وظائف الذكاء الاصطناعي (AI Core Functions)
* **تحليل المتطلبات (Requirements Analysis):** تحويل وصف المستخدم إلى قائمة مهام (Task List) مرتبة منطقياً.[cite: 1]
* **توليد الهيكل الأساسي (Code Scaffolding):**
    * بناء شجرة المجلدات (Folder Structure).[cite: 1]
    * توليد الأكواد الأولية لملفات البناء مثل: `package.json`, `index.html`, `App.js`.[cite: 1]
* **تقدير الموارد (Estimation):** توقع الوقت والتكلفة بناءً على حجم المتطلبات.[cite: 1]

---

### 4. واجهات البرمجة (Backend API Endpoints)
* **إدارة المشاريع:**
    * `POST /api/projects/generate`: إرسال المتطلبات واستلام هيكل المشروع والأكواد من OpenAI.[cite: 1]
    * `GET /api/projects`: عرض قائمة المشاريع ونسبة التقدم في كل منها.[cite: 1]
* **إدارة المهام:**
    * `PATCH /api/tasks/:id`: تحديث حالة المهمة (Task Status) لتحديث نسبة إنجاز المشروع ككل.[cite: 1]
* **بوابة العملاء (Customer Portal):**
    * `POST /api/services/request`: إرسال نموذج طلب خدمة (Service Request).[cite: 1]
    * `GET /api/bookings/slots`: جلب المواعيد المتاحة عبر التكامل مع Calendly.[cite: 1]

---

### 5. واجهة المستخدم (UI Components)
* **لوحة تحكم المطور (Developer Dashboard):**
    * `AI-Prompt-Section`: حقل إدخال المتطلبات (Input Field).[cite: 1]
    * `File-Explorer-View`: عرض شجرة الملفات المولدة مع خيار التحميل كملف `Zip`.[cite: 1]
    * `Code-Editor-Preview`: نافذة لعرض الأكواد المولدة مع ميزة تمييز الكود (Syntax Highlighting).[cite: 1]
* **لوحة متابعة العميل (Client Portal):**
    * `Progress-Tracker`: شريط تقدم (Progress Bar) يوضح للعميل أين وصل مشروعه.[cite: 1]
    * `Booking-Widget`: أداة حجز المواعيد للمقابلات (Meetings).[cite: 1]
* **معرض الأعمال (Portfolio):** عرض المشاريع السابقة لجذب العملاء.[cite: 1]

---

### 6. التكنولوجيات المقترحة (Tech Stack)
* **Frontend:** React.js أو Next.js مع TailwindCSS للتصميم.[cite: 1]
* **Backend:** Node.js (Express) أو Python (FastAPI).[cite: 1]
* **Database:** PostgreSQL لضمان استقرار البيانات والعلاقات.[cite: 1]
* **AI Integration:** OpenAI API باستخدام موديل `GPT-4o`.[cite: 1]
* **File Handling:** مكتبة `JSZip` لضغط الملفات المولدة وتنزيلها.[cite: 1]

---

### 7. معايير النجاح (Success Metrics)
* سرعة توليد الهيكل البرمجي (Scaffolding) في أقل من دقيقة.[cite: 1]
* دقة تقسيم المهام (Tasks) وترتيبها بشكل منطقي للتنفيذ.[cite: 1]
* سهولة حجز العملاء للمواعيد (User Experience) وزيادة نسبة التحويل (Conversion).[cite: 1]