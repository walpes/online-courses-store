// بيانات الدورات التدريبية
const coursesData = [
    {
        id: 1,
        title: "الدورة الشاملة في تطوير الويب الكامل (Full Stack)",
        category: "programming",
        price: 99.99,
        rating: 4.9,
        students: 1250,
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&auto=format&fit=crop&q=60",
        instructor: "د. أسامة علي",
        instructorRole: "خبير تطوير برمجيات",
        description: "تعلم تطوير المواقع الإلكترونية المتكاملة من الصفر حتى الاحتراف باستخدام HTML, CSS, JavaScript, Node.js و React.",
        curriculum: [
            { title: "مقدمة في أساسيات الويب و HTML5", duration: "45 دقيقة" },
            { title: "تنسيق المواقع والتصميم التفاعلي بـ CSS3", duration: "1.5 ساعة" },
            { title: "تطوير الواجهات التفاعلية بـ JavaScript", duration: "3 ساعات" },
            { title: "بناء الخوادم وقواعد البيانات بـ Node.js", duration: "4 ساعات" }
        ]
    },
    {
        id: 2,
        title: "احتراف تصميم واجهات المستخدم (UI/UX)",
        category: "design",
        price: 79.99,
        rating: 4.8,
        students: 890,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=60",
        instructor: "م. سارة أحمد",
        instructorRole: "مصممة تجربة مستخدم رئيسية",
        description: "تعلم أصول البحث وتصميم الواجهات وتجارب المستخدم الاحترافية وتطبيق النماذج باستخدام برنامج Figma.",
        curriculum: [
            { title: "مبادئ أبحاث تجربة المستخدم (UX)", duration: "1 ساعة" },
            { title: "أساسيات التصميم البصري (UI)", duration: "2 ساعة" },
            { title: "احتراف العمل على برنامج Figma", duration: "3.5 ساعة" }
        ]
    },
    {
        id: 3,
        title: "استراتيجيات التسويق الرقمي وإدارة الحملات",
        category: "marketing",
        price: 59.99,
        rating: 4.7,
        students: 2100,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        instructor: "أحمد الماجد",
        instructorRole: "مستشار تسويق رقمي",
        description: "احترف الإعلانات الممولة على السوشيال ميديا، تحسين محركات البحث SEO، واستراتيجيات تنمية المبيعات.",
        curriculum: [
            { title: "أساسيات التسويق عبر الشبكات الاجتماعية", duration: "1 ساعة" },
            { title: "إتقان الحملات الإعلانية في Meta & Google", duration: "3 ساعات" }
        ]
    },
    {
        id: 4,
        title: "إدارة المشاريع الاحترافية PMP",
        category: "business",
        price: 120.00,
        rating: 4.9,
        students: 650,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
        instructor: "م. خالد المنصور",
        instructorRole: "مدير مشاريع معتمد",
        description: "دورة تحضيرية شاملة لاجتياز اختبار إدارة المشاريع الاحترافية وفق أحدث إصدارات PMI.",
        curriculum: [
            { title: "إطار عمل إدارة المشاريع", duration: "2 ساعة" },
            { title: "إدارة نطاق العمل والجدول الزمني", duration: "3 ساعات" }
        ]
    }
];

// حالة التطبيق
let cart = [];
let myPurchasedCourses = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    updateCartUI();
});

// التنقل بين الصفحات
function showPage(pageName) {
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    
    if(pageName === 'catalog') {
        document.getElementById('catalogView').classList.add('active');
    } else if(pageName === 'dashboard') {
        renderMyCourses();
        document.getElementById('dashboardView').classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    if(pageName === 'catalog') navLinks[0].classList.add('active');
    if(pageName === 'dashboard') navLinks[1].classList.add('active');
}

// عرض الدورات
function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    const filtered = coursesData.filter(course => {
        const matchesCategory = currentCategory === 'all' || course.category === currentCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchValue) || 
                              course.instructor.toLowerCase().includes(searchValue);
        return matchesCategory && matchesSearch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
            <p>لا توجد دورات تطابق بحثك حالياً.</p>
        </div>`;
        return;
    }

    grid.innerHTML = filtered.map(course => `
        <div class="course-card" onclick="openCourseDetail(${course.id})">
            <img src="${course.image}" class="course-img" alt="${course.title}">
            <div class="course-body">
                <div class="course-meta">
                    <span><i class="fa-solid fa-users"></i> ${course.students} طالب</span>
                    <span><i class="fa-solid fa-star"></i> ${course.rating}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-instructor"><i class="fa-solid fa-chalkboard-user"></i> ${course.instructor}</div>
                <div class="course-footer">
                    <div class="course-price">$${course.price.toFixed(2)}</div>
                    <button class="add-cart-btn" onclick="addToCart(event, ${course.id})">
                        <i class="fa-solid fa-cart-plus"></i> إضافـة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderCourses();
}

function filterCourses() {
    renderCourses();
}

// تفاصيل الدورة
function openCourseDetail(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    const detailContainer = document.getElementById('courseDetailContainer');
    const isPurchased = myPurchasedCourses.some(item => item.id === course.id);

    detailContainer.innerHTML = `
        <div class="detail-main">
            <h1>${course.title}</h1>
            <div class="instructor-badge">
                <i class="fa-solid fa-circle-user fa-2x" style="color: var(--primary)"></i>
                <div>
                    <strong>${course.instructor}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">${course.instructorRole}</div>
                </div>
            </div>
            <p style="margin-bottom: 1.5rem; line-height: 1.8;">${course.description}</p>
            
            <div class="syllabi-section">
                <h3><i class="fa-solid fa-list-check"></i> محتوى المنهج الدراسي (${course.curriculum.length} دروس)</h3>
                <ul class="curriculum-list">
                    ${course.curriculum.map((lesson, idx) => `
                        <li class="curriculum-item">
                            <span><i class="fa-regular fa-circle-play" style="color: var(--primary); margin-left: 8px;"></i> الدرس ${idx + 1}: ${lesson.title}</span>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">${lesson.duration}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>

        <div class="detail-sidebar">
            <img src="${course.image}" alt="${course.title}">
            <div class="price-box">$${course.price.toFixed(2)}</div>
            
            ${isPurchased ? 
                `<button class="action-btn-full" style="background:#10b981;" onclick="showPage('dashboard')"><i class="fa-solid fa-circle-check"></i> الدورة في حسابك - شاهد الآن</button>` :
                `<button class="action-btn-full" onclick="addToCart(event, ${course.id})"><i class="fa-solid fa-cart-plus"></i> إضافة إلى السلة</button>`
            }
        </div>
    `;

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    document.getElementById('detailView').classList.add('active');
}

// السلة
function addToCart(event, courseId) {
    if(event) event.stopPropagation();

    const course = coursesData.find(c => c.id === courseId);
    if (cart.some(item => item.id === courseId)) {
        showToast('الدورة موجودة بالفعل في السلة!');
        return;
    }

    if (myPurchasedCourses.some(item => item.id === courseId)) {
        showToast('لقد قمت بشراء هذه الدورة سابقاً!');
        return;
    }

    cart.push(course);
    updateCartUI();
    showToast('تمت إضافة الدورة للسلة بنجاح!');
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartList = document.getElementById('cartItemsList');
    const totalElem = document.getElementById('cartTotalAmount');

    if (cart.length === 0) {
        cartList.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 1.5rem;">سلة الشراء فارغة حالياً</p>`;
        totalElem.innerText = '$0.00';
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    totalElem.innerText = `$${total.toFixed(2)}`;
}

function toggleCartModal() {
    document.getElementById('cartModal').classList.toggle('active');
}

// الدفع
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('السلة فارغة!');
        return;
    }

    toggleCartModal();
    const summary = document.getElementById('checkoutSummary');
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    summary.innerHTML = `
        <p style="margin-bottom: 0.5rem;"><strong>عدد الدورات:</strong> ${cart.length}</p>
        <p style="font-size: 1.2rem; color: var(--primary);"><strong>المبلغ الإجمالي:</strong> $${total.toFixed(2)}</p>
    `;

    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function togglePaymentFields(type) {
    document.querySelectorAll('.payment-fields').forEach(el => el.classList.remove('active-fields'));
    if(type === 'card') document.getElementById('cardFields').classList.add('active-fields');
    if(type === 'stc') document.getElementById('stcFields').classList.add('active-fields');
    if(type === 'apple') document.getElementById('appleFields').classList.add('active-fields');
}

function processPayment(e) {
    e.preventDefault();
    myPurchasedCourses.push(...cart);
    cart = [];
    updateCartUI();
    closeCheckoutModal();
    showToast('تمت عملية الدفع بنجاح! شكراً لك.');
    showPage('dashboard');
}

function renderMyCourses() {
    const container = document.getElementById('myCoursesGrid');

    if (myPurchasedCourses.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--card-bg); border-radius: 12px;">
                <i class="fa-solid fa-graduation-cap" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>لم تشترك في أي دورة بعد</h3>
                <button class="add-cart-btn" onclick="showPage('catalog')" style="margin-top: 1rem;">تصفح الدورات</button>
            </div>
        `;
        return;
    }

    container.innerHTML = myPurchasedCourses.map(course => `
        <div class="my-course-card">
            <img src="${course.image}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;">
            <h4 style="margin-top: 0.8rem;">${course.title}</h4>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 15%;"></div>
            </div>
            <button class="action-btn-full" style="margin-top: 0.8rem; font-size: 0.9rem;" onclick="alert('جاري فتح منصة مشاهدة الدروس...')">
                متابعة الدراسة <i class="fa-solid fa-play"></i>
            </button>
        </div>
    `).join('');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
