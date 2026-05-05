document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animacja wejściowa Hero (Vanilla JS)
    const heroHeading = document.getElementById("hero-heading");
    if(heroHeading) {
        setTimeout(() => {
            heroHeading.style.transition = "opacity 1.5s ease, transform 1.5s ease";
            heroHeading.style.opacity = "1";
            heroHeading.style.transform = "translateY(0)";
        }, 300);
    }

    // 2. Mobilne Menu
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mainNav = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburgerBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    // Zamykanie menu po kliknięciu w link na mobile
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                mainNav.classList.remove("active");
            }
        });
    });

    // 3. Płynne Scrollowanie & Active Link Highlight
    const sections = document.querySelectorAll("section.container, #hero-section");
    
    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#") && targetId !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 4. Przycisk Powrotu na górę & ScrollSpy
    const scrollTopBtn = document.getElementById("powrot-na-gore");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active-link");
            }
        });
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 5. Filtrowanie projektów
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            cards.forEach(card => {
                if (filterValue === "wszystkie" || card.classList.contains(filterValue)) {
                    card.style.display = "block";
                    setTimeout(() => { card.style.opacity = "1"; }, 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => { card.style.display = "none"; }, 400); // 400ms to czas transition w CSS
                }
            });
        });
    });

    // 6. Pojawianie się sekcji na scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in-section").forEach(section => {
        sectionObserver.observe(section);
    });

});