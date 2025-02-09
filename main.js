
const text1 = ` I have experience in designing and 
                developing interactive user interfaces using HTML, CSS, JavaScript,
                along with advanced frameworks like Vue.js and React.js. 
`;
const text2 = ` As a passionate and creative Front End Developer, 
                my goal is to leverage my skills in developing user interfaces
                and user experiences to enhance interaction and visual quality of
                applications and websites. I am eager to join a dynamic team where
                I can apply my in-depth knowledge of HTML, CSS, and JavaScript,
                as well as modern frameworks like React and vue, 
                to achieve project goals and improve performance. 
                I aspire to contribute to building advanced technological 
                solutions that provide a seamless and effective user experience,
                supporting innovation and growth within the company.
`;

const typingSpeed = 40;
const triggerPoint = 1800; // المسافة المطلوبة من أعلى الصفحة لتشغيل التأثير الثاني
function typeWriter(elementId, text, speed) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      document.getElementById(elementId).innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}
window.onload = function () {
  typeWriter("first-text", text1, typingSpeed);
};
let hasStartedTyping = false;
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY + window.innerHeight; 
  if (scrollPosition >= triggerPoint && !hasStartedTyping) {
    hasStartedTyping = true;
    typeWriter("second-text", text2, typingSpeed);
  }
});

//* icon vector
const iconVector = document.querySelector(".icon_vector");
const containerSections = document.querySelector(".container_sections_options");
const sectionOptions = document.querySelectorAll(".section_option a"); // تحديد جميع الروابط داخل .section_option

if (iconVector && containerSections) {
  // عند الضغط على الأيقونة، يتم فتح أو إغلاق القائمة
  iconVector.addEventListener("click", function () {
    this.classList.toggle("active");
    containerSections.classList.toggle("active");
  });

  // عند الضغط على أي عنصر <a> داخل .section_option، يتم إغلاق القائمة
  sectionOptions.forEach(link => {
    link.addEventListener("click", function () {
      containerSections.classList.remove("active");
      iconVector.classList.remove("active"); // إغلاق الأيقونة أيضًا (إذا كانت تستخدم تغييرًا في المظهر)
    });
  });
} else {
  console.error("عنصر .icon_vector أو .container_sections_options غير موجود");
}


//* circle language 
function startProgress(circle) {
  let progress = 0;
  let target = parseInt(circle.getAttribute('data-target'));
  let text = circle.querySelector("span");

  let interval = setInterval(() => {
      if (progress >= target) {
          clearInterval(interval);
      } else {
          progress++;
          circle.style.background = `conic-gradient(#7127BA ${progress}%, #ddd 0)`;
          text.textContent = progress + "%";
      }
  }, 20);
}

// إنشاء مراقب Intersection Observer
let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          startProgress(entry.target);
          observer.unobserve(entry.target); // إيقاف المراقبة بعد التشغيل
      }
  });
}, { threshold: 0.6 });

// مراقبة جميع الدوائر
document.querySelectorAll('.progress-circle').forEach(circle => {
  observer.observe(circle);
});