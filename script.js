// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCigvbqOxCq5lhWIaFDtV2xfKWIFw1V414",
  authDomain: "ofera-cf01e.firebaseapp.com",
  databaseURL: "https://ofera-cf01e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ofera-cf01e",
  storageBucket: "ofera-cf01e.appspot.com",
  messagingSenderId: "50275954655",
  appId: "1:50275954655:web:556d76938889fce5e0de6a"
};

// Initialize Firebase
console.log("🚀 Initializing Firebase...");
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
console.log("✅ Firebase initialized!");

// Global Variables
let currentUser = null;
let currentLang = 'ar';
let cart = [];
let currentOffer = null;

// Complete Language translations
const translations = {
  ar: {
    // Auth Required Page
    welcome: "مرحبًا بك في",
    ofera: "أوفيرا",
    subtitle: "العروض الذكية بين إيديك",
    login: "تسجيل الدخول",
    register: "إنشاء حساب جديد",
    
    // Login Page
    loginTitle: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    noAccount: "ليس لديك حساب؟ سجل الآن",
    
    // Register Page
    registerTitle: "إنشاء حساب جديد",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    confirmPassword: "تأكيد كلمة المرور",
    haveAccount: "لديك حساب بالفعل؟ سجل دخول",
    
    // Home Page
    offers: "العروض",
    businessLogin: "الدخول كبائع",
    logout: "تسجيل الخروج",
    
    // Business Options
    businessOptions: "خيارات البائع",
    businessLoginBtn: "دخول البائع",
    businessRegisterBtn: "تسجيل بائع جديد",
    
    // Business Login
    businessLoginTitle: "دخول البائع",
    
    // Business Register
    businessRegisterTitle: "تسجيل بائع جديد",
    businessName: "اسم المتجر/الشركة",
    ownerName: "اسم صاحب العمل",
    
    // Offers Page
    currentOffers: "العروض الحالية",
    searchPlaceholder: "ابحث في العروض...",
    search: "بحث",
    allCategories: "جميع التصنيفات",
    restaurants: "مطاعم",
    cafes: "كافيهات",
    markets: "سوبرماركت",
    clothes: "ملابس",
    electronics: "إلكترونيات",
    beauty: "تجميل وعناية",
    services: "خدمات",
    other: "أخرى",
    noOffers: "لا توجد عروض حالياً",
    noMatchingOffers: "لا توجد عروض تطابق بحثك",
    loadingOffers: "جاري تحميل العروض...",
    
    // Offer Details
    storeName: "اسم المتجر",
    category: "التصنيف",
    originalPrice: "السعر الأصلي",
    discountedPrice: "السعر بعد الخصم",
    discountPercentage: "نسبة الخصم",
    offerDuration: "مدة العرض",
    days: "أيام",
    weeks: "أسابيع", 
    months: "شهور",
    status: "الحالة",
    pending: "قيد الانتظار",
    
    // Order Form
    orderTitle: "طلب العرض",
    yourName: "اسمك الكامل",
    yourPhone: "رقم هاتفك",
    yourEmail: "بريدك الإلكتروني",
    yourAddress: "عنوانك",
    additionalNotes: "ملاحظات إضافية",
    addToCart: "إضافة إلى السلة",
    orderNow: "طلب مباشر",
    contactBusiness: "الاتصال بالبائع",
    
    // Add Offer Page
    addOfferTitle: "إضافة عرض جديد",
    offerName: "اسم العرض",
    offerDescription: "وصف العرض",
    offerPrice: "السعر الأصلي",
    discountPrice: "السعر بعد الخصم",
    discountPercentage: "نسبة الخصم",
    offerCategory: "تصنيف العرض",
    selectCategory: "اختر التصنيف",
    offerDays: "مدة العرض",
    durationType: "نوع المدة",
    offerImage: "صورة العرض الرئيسية",
    submitOffer: "إرسال العرض للموافقة",
    imageNote: "سيتم عرض هذه الصورة بجوار العرض",
    
    // Cart Page
    cartTitle: "سلة التسوق",
    emptyCart: "سلة التسوق فارغة",
    browseOffers: "تصفح العروض",
    itemsCount: "عدد العناصر",
    total: "المجموع",
    completeOrder: "إتمام الطلب",
    remove: "حذف",
    egp: "جنيه",
    
    // Buttons & Navigation
    back: "عودة",
    home: "الرئيسية",
    customer: "زبون",
    business: "بائع",
    
    // Messages
    fillAllFields: "يرجى ملء جميع الحقول",
    passwordsNotMatch: "كلمات المرور غير متطابقة",
    passwordTooShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    notBusinessAccount: "هذا الحساب ليس حساب بائع",
    offerAdded: "تم إضافة العرض إلى السلة!",
    orderSubmitted: "تم تقديم طلبك بنجاح! سنتواصل معك قريباً.",
    offerSubmitted: "تم إرسال العرض بنجاح! سيتم مراجعته من قبل الإدارة.",
    businessRegistered: "تم تسجيل حساب البائع بنجاح! سيتم مراجعة طلبك قريباً.",
    pleaseLogin: "يرجى تسجيل الدخول أولاً",
    emptyCartMsg: "السلة فارغة",
    contactBusinessMsg: "سيتم توجيهك للاتصال بالبائع",
    
    // Error Messages
    errorLoadingData: "حدث خطأ في تحميل البيانات",
    errorAddingOffer: "حدث خطأ أثناء إضافة العرض",
    errorSubmittingOrder: "حدث خطأ أثناء تقديم الطلب",
    errorLoadingDetails: "حدث خطأ في تحميل تفاصيل العرض",
    unexpectedError: "حدث خطأ غير متوقع"
  },
  en: {
    // Auth Required Page
    welcome: "Welcome to",
    ofera: "Ofera",
    subtitle: "Smart offers at your fingertips",
    login: "Login",
    register: "Create Account",
    
    // Login Page
    loginTitle: "Login",
    email: "Email",
    password: "Password",
    noAccount: "Don't have an account? Register now",
    
    // Register Page
    registerTitle: "Create Account",
    fullName: "Full Name",
    phone: "Phone Number",
    confirmPassword: "Confirm Password",
    haveAccount: "Already have an account? Login",
    
    // Home Page
    offers: "Offers",
    businessLogin: "Business Login",
    logout: "Logout",
    
    // Business Options
    businessOptions: "Business Options",
    businessLoginBtn: "Business Login",
    businessRegisterBtn: "Register Business",
    
    // Business Login
    businessLoginTitle: "Business Login",
    
    // Business Register
    businessRegisterTitle: "Register Business",
    businessName: "Business/Company Name",
    ownerName: "Owner Name",
    
    // Offers Page
    currentOffers: "Current Offers",
    searchPlaceholder: "Search offers...",
    search: "Search",
    allCategories: "All Categories",
    restaurants: "Restaurants",
    cafes: "Cafes",
    markets: "Supermarkets",
    clothes: "Clothes",
    electronics: "Electronics",
    beauty: "Beauty & Care",
    services: "Services",
    other: "Other",
    noOffers: "No offers available",
    noMatchingOffers: "No offers match your search",
    loadingOffers: "Loading offers...",
    
    // Offer Details
    storeName: "Store Name",
    category: "Category",
    originalPrice: "Original Price",
    discountedPrice: "Discounted Price",
    discountPercentage: "Discount Percentage",
    offerDuration: "Offer Duration",
    days: "days",
    weeks: "weeks",
    months: "months",
    status: "Status",
    pending: "Pending",
    
    // Order Form
    orderTitle: "Place Order",
    yourName: "Your Full Name",
    yourPhone: "Your Phone Number",
    yourEmail: "Your Email",
    yourAddress: "Your Address",
    additionalNotes: "Additional Notes",
    addToCart: "Add to Cart",
    orderNow: "Order Now",
    contactBusiness: "Contact Business",
    
    // Add Offer Page
    addOfferTitle: "Add New Offer",
    offerName: "Offer Name",
    offerDescription: "Offer Description",
    offerPrice: "Original Price",
    discountPrice: "Discounted Price",
    discountPercentage: "Discount Percentage",
    offerCategory: "Offer Category",
    selectCategory: "Select Category",
    offerDays: "Offer Duration",
    durationType: "Duration Type",
    offerImage: "Main Offer Image",
    submitOffer: "Submit Offer for Approval",
    imageNote: "This image will be displayed next to the offer",
    
    // Cart Page
    cartTitle: "Shopping Cart",
    emptyCart: "Cart is empty",
    browseOffers: "Browse Offers",
    itemsCount: "Items Count",
    total: "Total",
    completeOrder: "Complete Order",
    remove: "Remove",
    egp: "EGP",
    
    // Buttons & Navigation
    back: "Back",
    home: "Home",
    customer: "Customer",
    business: "Business",
    
    // Messages
    fillAllFields: "Please fill all fields",
    passwordsNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    notBusinessAccount: "This account is not a business account",
    offerAdded: "Offer added to cart!",
    orderSubmitted: "Order submitted successfully! We will contact you soon.",
    offerSubmitted: "Offer submitted successfully! It will be reviewed by admin.",
    businessRegistered: "Business account registered successfully! Your request will be reviewed soon.",
    pleaseLogin: "Please login first",
    emptyCartMsg: "Cart is empty",
    contactBusinessMsg: "You will be redirected to contact the business",
    
    // Error Messages
    errorLoadingData: "Error loading data",
    errorAddingOffer: "Error adding offer",
    errorSubmittingOrder: "Error submitting order",
    errorLoadingDetails: "Error loading offer details",
    unexpectedError: "An unexpected error occurred"
  }
};

// Authentication State Listener
auth.onAuthStateChanged((user) => {
  currentUser = user;
  console.log("Auth state changed:", user ? "Logged in" : "Logged out");
  
  if (user) {
    showHomePage();
  } else {
    showAuthRequired();
  }
});

// Navigation functions
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    
    if (pageId === 'offers') {
      setTimeout(loadOffers, 100);
    } else if (pageId === 'cart') {
      loadCart();
    }
  }
}

function goBack() {
  const currentPage = document.querySelector('.page.active').id;
  const backMap = {
    'login': 'auth-required',
    'register': 'auth-required',
    'business-login': 'business-options', 
    'business-register': 'business-options',
    'business-options': 'home',
    'offers': 'home',
    'offer-details': 'offers',
    'add-offer': 'business-options',
    'cart': 'offers'
  };
  
  if (backMap[currentPage]) {
    navigateTo(backMap[currentPage]);
  } else {
    navigateTo('home');
  }
}

// Auth pages navigation
function showAuthRequired() {
  navigateTo('auth-required');
}

function showLogin() {
  navigateTo('login');
  document.getElementById('loginError').textContent = '';
}

function showRegister() {
  navigateTo('register');
  document.getElementById('registerError').textContent = '';
}

function showHomePage() {
  navigateTo('home');
  updateCartUI();
}

// User Authentication
function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorElement = document.getElementById('loginError');
  
  if (!email || !password) {
    errorElement.textContent = t('fillAllFields');
    return;
  }
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("✅ User logged in");
      errorElement.textContent = '';
    })
    .catch((error) => {
      errorElement.textContent = getAuthErrorMessage(error);
    });
}

function registerUser() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorElement = document.getElementById('registerError');
  
  if (!name || !email || !phone || !password || !confirmPassword) {
    errorElement.textContent = t('fillAllFields');
    return;
  }
  
  if (password !== confirmPassword) {
    errorElement.textContent = t('passwordsNotMatch');
    return;
  }
  
  if (password.length < 6) {
    errorElement.textContent = t('passwordTooShort');
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return db.ref('users/' + user.uid).set({
        name: name,
        email: email,
        phone: phone,
        type: 'customer',
        createdAt: new Date().toISOString()
      });
    })
    .then(() => {
      errorElement.textContent = '';
    })
    .catch((error) => {
      errorElement.textContent = getAuthErrorMessage(error);
    });
}

function logout() {
  auth.signOut().then(() => {
    cart = [];
    updateCartUI();
  });
}

// Business Authentication
function businessLogin() {
  const email = document.getElementById('businessEmail').value;
  const password = document.getElementById('businessPassword').value;
  const errorElement = document.getElementById('businessLoginError');
  
  if (!email || !password) {
    errorElement.textContent = t('fillAllFields');
    return;
  }
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return db.ref('users/' + userCredential.user.uid).once('value');
    })
    .then((snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.type === 'business') {
        errorElement.textContent = '';
        navigateTo('add-offer');
      } else {
        errorElement.textContent = t('notBusinessAccount');
        auth.signOut();
      }
    })
    .catch((error) => {
      errorElement.textContent = getAuthErrorMessage(error);
    });
}

function businessRegister() {
  const bizName = document.getElementById('bizName').value;
  const ownerName = document.getElementById('bizOwnerName').value;
  const email = document.getElementById('bizEmail').value;
  const phone = document.getElementById('bizPhone').value;
  const password = document.getElementById('bizPassword').value;
  const confirmPassword = document.getElementById('bizConfirmPassword').value;
  const errorElement = document.getElementById('businessRegisterError');
  
  if (!bizName || !ownerName || !email || !phone || !password || !confirmPassword) {
    errorElement.textContent = t('fillAllFields');
    return;
  }
  
  if (password !== confirmPassword) {
    errorElement.textContent = t('passwordsNotMatch');
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return db.ref('users/' + user.uid).set({
        businessName: bizName,
        ownerName: ownerName,
        email: email,
        phone: phone,
        type: 'business',
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    })
    .then(() => {
      errorElement.textContent = '';
      alert(t('businessRegistered'));
      navigateTo('business-options');
    })
    .catch((error) => {
      errorElement.textContent = getAuthErrorMessage(error);
    });
}

// Language System
function t(key) {
  return translations[currentLang][key] || key;
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // Update HTML attributes
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Update language switch text
  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = lang === 'ar' ? 'EN' : 'AR';
  }
  
  // Update ALL UI elements
  updateEntireUI();
}

function updateEntireUI() {
  updateAuthPages();
  updateHomePage();
  updateBusinessPages();
  updateOffersPage();
  updateCartPage();
  updateAddOfferPage();
  updateOfferDetails();
  updateCartItems();
}

function updateAuthPages() {
  const welcomeElement = document.querySelector('#auth-required .welcome');
  const brandElement = document.querySelector('#auth-required .brand');
  const subtitleElement = document.querySelector('#auth-required .subtitle-text');
  const loginBtn = document.querySelector('#auth-required .main-btn');
  const registerBtn = document.querySelector('#auth-required .main-btn.secondary');
  
  if (welcomeElement) welcomeElement.textContent = t('welcome');
  if (brandElement) brandElement.textContent = t('ofera');
  if (subtitleElement) subtitleElement.textContent = t('subtitle');
  if (loginBtn) loginBtn.textContent = t('login');
  if (registerBtn) registerBtn.textContent = t('register');

  const loginTitle = document.querySelector('#login .page-title');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginButton = document.querySelector('#login .main-btn');
  const noAccountText = document.querySelector('#login .toggle-text');
  
  if (loginTitle) loginTitle.textContent = t('loginTitle');
  if (loginEmail) loginEmail.placeholder = t('email');
  if (loginPassword) loginPassword.placeholder = t('password');
  if (loginButton) loginButton.textContent = t('login');
  if (noAccountText) noAccountText.textContent = t('noAccount');

  const registerTitle = document.querySelector('#register .page-title');
  const regName = document.getElementById('regName');
  const regEmail = document.getElementById('regEmail');
  const regPhone = document.getElementById('regPhone');
  const regPassword = document.getElementById('regPassword');
  const regConfirmPassword = document.getElementById('regConfirmPassword');
  const registerButton = document.querySelector('#register .main-btn');
  const haveAccountText = document.querySelector('#register .toggle-text');
  
  if (registerTitle) registerTitle.textContent = t('registerTitle');
  if (regName) regName.placeholder = t('fullName');
  if (regEmail) regEmail.placeholder = t('email');
  if (regPhone) regPhone.placeholder = t('phone');
  if (regPassword) regPassword.placeholder = t('password');
  if (regConfirmPassword) regConfirmPassword.placeholder = t('confirmPassword');
  if (registerButton) registerButton.textContent = t('register');
  if (haveAccountText) haveAccountText.textContent = t('haveAccount');
}

function updateHomePage() {
  const welcomeElement = document.querySelector('#home .welcome');
  const brandElement = document.querySelector('#home .brand');
  const subtitleElement = document.querySelector('#home .subtitle-text');
  const offersBtn = document.querySelector('#home .main-btn');
  const businessBtn = document.querySelector('#home .main-btn.secondary');
  const logoutBtn = document.querySelector('#home .main-btn.outline');
  
  if (welcomeElement) welcomeElement.textContent = t('welcome');
  if (brandElement) brandElement.textContent = t('ofera');
  if (subtitleElement) subtitleElement.textContent = t('subtitle');
  if (offersBtn) offersBtn.textContent = t('offers');
  if (businessBtn) businessBtn.textContent = t('businessLogin');
  if (logoutBtn) logoutBtn.textContent = t('logout');
}

function updateBusinessPages() {
  const businessOptionsTitle = document.querySelector('#business-options .page-title');
  const businessLoginBtn = document.querySelector('#business-options .main-btn');
  const businessRegisterBtn = document.querySelector('#business-options .main-btn.secondary');
  
  if (businessOptionsTitle) businessOptionsTitle.textContent = t('businessOptions');
  if (businessLoginBtn) businessLoginBtn.textContent = t('businessLoginBtn');
  if (businessRegisterBtn) businessRegisterBtn.textContent = t('businessRegisterBtn');

  const businessLoginTitle = document.querySelector('#business-login .page-title');
  const businessEmail = document.getElementById('businessEmail');
  const businessPassword = document.getElementById('businessPassword');
  const businessLoginButton = document.querySelector('#business-login .main-btn');
  
  if (businessLoginTitle) businessLoginTitle.textContent = t('businessLoginTitle');
  if (businessEmail) businessEmail.placeholder = t('email');
  if (businessPassword) businessPassword.placeholder = t('password');
  if (businessLoginButton) businessLoginButton.textContent = t('login');

  const businessRegisterTitle = document.querySelector('#business-register .page-title');
  const bizName = document.getElementById('bizName');
  const bizOwnerName = document.getElementById('bizOwnerName');
  const bizEmail = document.getElementById('bizEmail');
  const bizPhone = document.getElementById('bizPhone');
  const bizPassword = document.getElementById('bizPassword');
  const bizConfirmPassword = document.getElementById('bizConfirmPassword');
  const businessRegisterButton = document.querySelector('#business-register .main-btn');
  
  if (businessRegisterTitle) businessRegisterTitle.textContent = t('businessRegisterTitle');
  if (bizName) bizName.placeholder = t('businessName');
  if (bizOwnerName) bizOwnerName.placeholder = t('ownerName');
  if (bizEmail) bizEmail.placeholder = t('email');
  if (bizPhone) bizPhone.placeholder = t('phone');
  if (bizPassword) bizPassword.placeholder = t('password');
  if (bizConfirmPassword) bizConfirmPassword.placeholder = t('confirmPassword');
  if (businessRegisterButton) businessRegisterButton.textContent = t('register');
}

function updateOffersPage() {
  const offersTitle = document.querySelector('#offers .page-title');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (offersTitle) offersTitle.textContent = t('currentOffers');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');
  if (searchBtn) searchBtn.textContent = t('search');
  if (categoryFilter) {
    const options = categoryFilter.options;
    if (options[0]) options[0].textContent = t('allCategories');
    if (options[1]) options[1].textContent = t('restaurants');
    if (options[2]) options[2].textContent = t('cafes');
    if (options[3]) options[3].textContent = t('markets');
    if (options[4]) options[4].textContent = t('clothes');
    if (options[5]) options[5].textContent = t('electronics');
    if (options[6]) options[6].textContent = t('beauty');
    if (options[7]) options[7].textContent = t('services');
    if (options[8]) options[8].textContent = t('other');
  }
}

function updateCartPage() {
  const cartTitle = document.querySelector('#cart .page-title');
  const emptyCartText = document.querySelector('#cartEmpty p');
  const browseOffersBtn = document.querySelector('#cartEmpty .main-btn');
  const itemsCountText = document.querySelector('#cartSummary .summary-row:nth-child(1) span:first-child');
  const totalText = document.querySelector('#cartSummary .summary-row:nth-child(2) span:first-child');
  const checkoutBtn = document.querySelector('#cartSummary .main-btn');
  
  if (cartTitle) cartTitle.textContent = t('cartTitle');
  if (emptyCartText) emptyCartText.textContent = t('emptyCart');
  if (browseOffersBtn) browseOffersBtn.textContent = t('browseOffers');
  if (itemsCountText) itemsCountText.textContent = t('itemsCount');
  if (totalText) totalText.textContent = t('total');
  if (checkoutBtn) checkoutBtn.textContent = t('completeOrder');
}

function updateAddOfferPage() {
  const addOfferTitle = document.querySelector('#add-offer .page-title');
  const offerTitleInput = document.getElementById('offerTitle');
  const offerDescInput = document.getElementById('offerDesc');
  const originalPriceInput = document.getElementById('originalPrice');
  const discountedPriceInput = document.getElementById('discountedPrice');
  const discountPercentageInput = document.getElementById('discountPercentage');
  const offerCategorySelect = document.getElementById('offerCategory');
  const offerDurationInput = document.getElementById('offerDuration');
  const durationTypeSelect = document.getElementById('durationType');
  const submitButton = document.querySelector('#add-offer .main-btn');
  const imageNote = document.querySelector('.image-note');
  
  const labels = document.querySelectorAll('#add-offer .add-offer-form label');
  
  if (addOfferTitle) addOfferTitle.textContent = t('addOfferTitle');
  if (offerTitleInput) offerTitleInput.placeholder = t('offerName');
  if (offerDescInput) offerDescInput.placeholder = t('offerDescription');
  if (originalPriceInput) originalPriceInput.placeholder = t('offerPrice');
  if (discountedPriceInput) discountedPriceInput.placeholder = t('discountPrice');
  if (discountPercentageInput) discountPercentageInput.placeholder = t('discountPercentage');
  if (offerDurationInput) offerDurationInput.placeholder = t('offerDays');
  if (submitButton) submitButton.textContent = t('submitOffer');
  if (imageNote) imageNote.textContent = t('imageNote');
  
  if (offerCategorySelect) {
    const options = offerCategorySelect.options;
    if (options[0]) options[0].textContent = t('selectCategory');
    if (options[1]) options[1].textContent = t('restaurants');
    if (options[2]) options[2].textContent = t('cafes');
    if (options[3]) options[3].textContent = t('markets');
    if (options[4]) options[4].textContent = t('clothes');
    if (options[5]) options[5].textContent = t('electronics');
    if (options[6]) options[6].textContent = t('beauty');
    if (options[7]) options[7].textContent = t('services');
    if (options[8]) options[8].textContent = t('other');
  }
  
  if (durationTypeSelect) {
    const options = durationTypeSelect.options;
    if (options[0]) options[0].textContent = t('days');
    if (options[1]) options[1].textContent = t('weeks');
    if (options[2]) options[2].textContent = t('months');
  }
  
  // Update labels
  labels.forEach((label, index) => {
    const text = label.textContent.trim();
    if (text === 'اسم العرض' || text === 'Offer Name') label.textContent = t('offerName');
    else if (text === 'وصف العرض' || text === 'Offer Description') label.textContent = t('offerDescription');
    else if (text === 'السعر الأصلي' || text === 'Original Price') label.textContent = t('offerPrice');
    else if (text === 'السعر بعد الخصم' || text === 'Discounted Price') label.textContent = t('discountPrice');
    else if (text === 'نسبة الخصم (اختياري)' || text === 'Discount Percentage (optional)') label.textContent = t('discountPercentage');
    else if (text === 'تصنيف العرض' || text === 'Offer Category') label.textContent = t('offerCategory');
    else if (text === 'مدة العرض' || text === 'Offer Duration') label.textContent = t('offerDays');
    else if (text === 'نوع المدة' || text === 'Duration Type') label.textContent = t('durationType');
    else if (text === 'صورة العرض الرئيسية (اختياري)' || text === 'Main Offer Image (optional)') label.textContent = t('offerImage');
  });
}

function updateOfferDetails() {
  if (document.querySelector('#offer-details.page.active')) {
    const orderTitle = document.querySelector('#orderForm h3');
    const customerName = document.getElementById('customerName');
    const customerPhone = document.getElementById('customerPhone');
    const customerEmail = document.getElementById('customerEmail');
    const customerAddress = document.getElementById('customerAddress');
    const customerNotes = document.getElementById('customerNotes');
    const addToCartBtn = document.querySelector('#orderForm .main-btn.secondary');
    const orderNowBtn = document.querySelector('#orderForm .main-btn');
    const contactBusinessBtn = document.querySelector('#orderForm .main-btn.outline');
    
    if (orderTitle) orderTitle.textContent = t('orderTitle');
    if (customerName) customerName.placeholder = t('yourName');
    if (customerPhone) customerPhone.placeholder = t('yourPhone');
    if (customerEmail) customerEmail.placeholder = t('yourEmail');
    if (customerAddress) customerAddress.placeholder = t('yourAddress');
    if (customerNotes) customerNotes.placeholder = t('additionalNotes');
    if (addToCartBtn) addToCartBtn.textContent = t('addToCart');
    if (orderNowBtn) orderNowBtn.textContent = t('orderNow');
    if (contactBusinessBtn) contactBusinessBtn.textContent = t('contactBusiness');
  }
}

function updateCartItems() {
  if (document.querySelector('#cart.page.active')) {
    const removeButtons = document.querySelectorAll('.cart-item-actions .main-btn.outline');
    removeButtons.forEach(btn => {
      btn.textContent = t('remove');
    });
  }
}

// Search Function
function searchOffers() {
  loadOffers();
}

// Contact Business Function
function contactBusiness() {
  if (!currentOffer) return;
  
  alert(t('contactBusinessMsg'));
  // Here you can implement actual contact logic
  // For example: window.open(`tel:${currentOffer.businessPhone}`) or other contact methods
}

// Offers Management - Only show approved offers
function loadOffers() {
  const offersContainer = document.getElementById("offersContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  
  if (!offersContainer) return;
  
  offersContainer.innerHTML = `<p>${t('loadingOffers')}</p>`;
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
  
  // ONLY check approved_offers - pending offers won't show
  db.ref('approved_offers').once('value')
    .then((approvedSnapshot) => {
      const approvedData = approvedSnapshot.val();
      
      let allOffers = [];
      
      if (approvedData) {
        allOffers = Object.values(approvedData);
      }
      
      if (allOffers.length === 0) {
        offersContainer.innerHTML = `<p>${t('noOffers')}</p>`;
        return;
      }
      
      const filteredOffers = allOffers.filter(offer => {
        const matchesSearch = !searchTerm || 
          (offer.name && offer.name.toLowerCase().includes(searchTerm)) ||
          (offer.description && offer.description.toLowerCase().includes(searchTerm)) ||
          (offer.businessName && offer.businessName.toLowerCase().includes(searchTerm));
        
        const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
      
      if (filteredOffers.length === 0) {
        offersContainer.innerHTML = `<p>${t('noMatchingOffers')}</p>`;
        return;
      }
      
      offersContainer.innerHTML = filteredOffers.map(offer => `
        <div class="offer-card" onclick="showOfferDetails('${offer.id}', 'approved')">
          <div class="thumb-placeholder">🛍️</div>
          <div class="offer-meta">
            <h3>${offer.name || t('offerName')}</h3>
            <p>${offer.description || t('offerDescription')}</p>
            <p class="offer-category">
              <strong>${offer.businessName || t('storeName')}</strong>
              ${offer.originalPrice ? `<span class="price-original">${offer.originalPrice} ${t('egp')}</span>` : ''}
              ${offer.discountedPrice ? `<span class="price-discounted">${offer.discountedPrice} ${t('egp')}</span>` : ''}
              ${offer.discountPercentage ? `<span style="color: var(--primary-color); font-weight: 600;">${offer.discountPercentage}%</span>` : ''}
            </p>
            <p class="offer-category">${getCategoryName(offer.category)}</p>
            ${offer.duration ? `<p class="offer-category">${offer.duration} ${getDurationTypeName(offer.durationType)}</p>` : ''}
          </div>
        </div>
      `).join('');
    })
    .catch((error) => {
      offersContainer.innerHTML = `<p>❌ ${t('errorLoadingData')}</p>`;
    });
}

function showOfferDetails(offerId, status) {
  // Only show approved offers to customers
  if (status !== 'approved') {
    alert('هذا العرض غير متاح حالياً');
    return;
  }
  
  db.ref('approved_offers/' + offerId).once('value')
    .then((snapshot) => {
      const offer = snapshot.val();
      if (offer) {
        currentOffer = offer;
        
        const durationText = offer.duration ? `${offer.duration} ${getDurationTypeName(offer.durationType)}` : '';
        
        const detailsContent = `
          <h2>${offer.name}</h2>
          <p>${offer.description}</p>
          <div class="offer-details">
            <p><strong>${t('storeName')}:</strong> ${offer.businessName}</p>
            <p><strong>${t('category')}:</strong> ${getCategoryName(offer.category)}</p>
            ${offer.originalPrice ? `<p><strong>${t('originalPrice')}:</strong> <span class="price-original">${offer.originalPrice} ${t('egp')}</span></p>` : ''}
            ${offer.discountedPrice ? `<p><strong>${t('discountedPrice')}:</strong> <span class="price-discounted">${offer.discountedPrice} ${t('egp')}</span></p>` : ''}
            ${offer.discountPercentage ? `<p><strong>${t('discountPercentage')}:</strong> <span style="color: var(--primary-color); font-weight: 600;">${offer.discountPercentage}%</span></p>` : ''}
            ${durationText ? `<p><strong>${t('offerDuration')}:</strong> ${durationText}</p>` : ''}
          </div>
        `;
        
        document.getElementById('offerDetailsContent').innerHTML = detailsContent;
        updateOfferDetails();
        navigateTo('offer-details');
      }
    })
    .catch((error) => {
      alert(t('errorLoadingDetails'));
    });
}

// Cart System
function addToCart() {
  if (!currentOffer) return;
  
  const customerName = document.getElementById('customerName').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const customerEmail = document.getElementById('customerEmail').value;
  const customerAddress = document.getElementById('customerAddress').value;
  const customerNotes = document.getElementById('customerNotes').value;
  
  if (!customerName || !customerPhone || !customerEmail) {
    alert(t('fillAllFields'));
    return;
  }
  
  const cartItem = {
    offerId: currentOffer.id,
    offerName: currentOffer.name,
    businessName: currentOffer.businessName,
    price: currentOffer.discountedPrice || currentOffer.originalPrice,
    quantity: 1,
    customerInfo: {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      notes: customerNotes
    },
    addedAt: new Date().toISOString()
  };
  
  cart.push(cartItem);
  updateCartUI();
  alert(t('offerAdded'));
  navigateTo('offers');
}

function loadCart() {
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');
  
  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartSummary.style.display = 'none';
    cartItems.innerHTML = '';
    return;
  }
  
  cartEmpty.style.display = 'none';
  cartSummary.style.display = 'block';
  
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.offerName}</h4>
        <p>${item.businessName} - ${item.price} ${t('egp')}</p>
      </div>
      <div class="cart-item-actions">
        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        <button class="main-btn outline" onclick="removeFromCart(${index})" style="padding:5px 10px; font-size:12px;">${t('remove')}</button>
      </div>
    </div>
  `).join('');
  
  updateCartSummary();
}

function updateQuantity(index, change) {
  const newQuantity = cart[index].quantity + change;
  if (newQuantity < 1) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = newQuantity;
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartFloatBtn = document.getElementById('cartFloatBtn');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartCount) cartCount.textContent = totalItems;
  if (cartFloatBtn) cartFloatBtn.style.display = totalItems > 0 ? 'flex' : 'none';
  if (document.querySelector('#cart.page.active')) loadCart();
}

function updateCartSummary() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  document.getElementById('totalItems').textContent = totalItems;
  document.getElementById('totalPrice').textContent = totalPrice + ' ' + t('egp');
}

function checkout() {
  if (cart.length === 0) {
    alert(t('emptyCartMsg'));
    return;
  }
  
  const orderData = {
    customerId: currentUser.uid,
    items: cart,
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  db.ref('orders').push(orderData)
    .then(() => {
      alert(t('orderSubmitted'));
      cart = [];
      updateCartUI();
      navigateTo('offers');
    })
    .catch((error) => {
      alert(t('errorSubmittingOrder'));
    });
}

function orderNow() {
  addToCart();
  navigateTo('cart');
}

// Add Offer System
document.getElementById('addOfferForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!currentUser) {
    alert(t('pleaseLogin'));
    return;
  }
  
  const offerTitle = document.getElementById('offerTitle').value;
  const offerDesc = document.getElementById('offerDesc').value;
  const originalPrice = document.getElementById('originalPrice').value;
  const discountedPrice = document.getElementById('discountedPrice').value;
  const discountPercentage = document.getElementById('discountPercentage').value;
  const offerCategory = document.getElementById('offerCategory').value;
  const offerDuration = document.getElementById('offerDuration').value;
  const durationType = document.getElementById('durationType').value;
  
  if (!offerTitle || !offerDesc || !offerCategory) {
    alert(t('fillAllFields'));
    return;
  }
  
  db.ref('users/' + currentUser.uid).once('value')
    .then((snapshot) => {
      const businessData = snapshot.val();
      const businessName = businessData ? (businessData.businessName || businessData.name || 'متجر غير معروف') : 'متجر جديد';
      
      const newOfferRef = db.ref('pending_offers').push();
      return newOfferRef.set({
        id: newOfferRef.key,
        name: offerTitle,
        description: offerDesc,
        originalPrice: originalPrice || null,
        discountedPrice: discountedPrice || null,
        discountPercentage: discountPercentage || null,
        category: offerCategory,
        duration: offerDuration || null,
        durationType: durationType || 'days',
        businessId: currentUser.uid,
        businessName: businessName,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    })
    .then(() => {
      alert(t('offerSubmitted'));
      document.getElementById('addOfferForm').reset();
      navigateTo('business-options');
    })
    .catch((error) => {
      alert(t('errorAddingOffer'));
    });
});

// Utility Functions
function getCategoryName(category) {
  const categories = {
    'restaurants': t('restaurants'),
    'cafes': t('cafes'),
    'markets': t('markets'),
    'clothes': t('clothes'),
    'electronics': t('electronics'),
    'beauty': t('beauty'),
    'services': t('services'),
    'other': t('other')
  };
  return categories[category] || category;
}

function getDurationTypeName(durationType) {
  const durationTypes = {
    'days': t('days'),
    'weeks': t('weeks'),
    'months': t('months')
  };
  return durationTypes[durationType] || t('days');
}

function getAuthErrorMessage(error) {
  const errorMessages = {
    'auth/invalid-email': t('unexpectedError'),
    'auth/user-disabled': t('unexpectedError'),
    'auth/user-not-found': t('unexpectedError'),
    'auth/wrong-password': t('unexpectedError'),
    'auth/email-already-in-use': t('unexpectedError'),
    'auth/weak-password': t('passwordTooShort')
  };
  return errorMessages[error.code] || t('unexpectedError');
}

// Handle Android/iOS back button
function handleBackButton() {
  // Prevent default back behavior in PWA
  if (window.history.length > 1) {
    goBack();
    return false;
  }
  return true;
}

// Add event listener for back button
window.addEventListener('popstate', function(event) {
  event.preventDefault();
  handleBackButton();
});

// Override back button behavior
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
  history.pushState(null, null, document.URL);
  handleBackButton();
});

// Also handle hardware back button on mobile
document.addEventListener('backbutton', handleBackButton, false);

// Add enter key support for search
document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchOffers();
  }
});

// Initialize language
const savedLang = localStorage.getItem('lang') || 'ar';
setLanguage(savedLang);

// Make functions globally available
window.navigateTo = navigateTo;
window.goBack = goBack;
window.toggleLanguage = toggleLanguage;
window.showAuthRequired = showAuthRequired;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.loginUser = loginUser;
window.registerUser = registerUser;
window.logout = logout;
window.businessLogin = businessLogin;
window.businessRegister = businessRegister;
window.loadOffers = loadOffers;
window.showOfferDetails = showOfferDetails;
window.addToCart = addToCart;
window.orderNow = orderNow;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.contactBusiness = contactBusiness;
window.searchOffers = searchOffers;

console.log("🎯 Ofera App Initialized Successfully!");
