document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // CURSOR PERSONALIZADO
  // =========================================================
  const cursor = document.querySelector(".cursor");
  const cursorRing = document.querySelector(".cursor-ring");

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (cursor && cursorRing && finePointer) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let dotX = mouseX;
    let dotY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;

    const interactiveSelector =
      "a, button, input, textarea, select, [role='button'], .action-card, .site-nav a, .catalog-card, .info-card";

    const setHoverState = (active) => {
      cursor.classList.toggle("is-hover", active);
      cursorRing.classList.toggle("is-hover", active);
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      { passive: true }
    );

    document.querySelectorAll(interactiveSelector).forEach((element) => {
      element.addEventListener("mouseenter", () => setHoverState(true));
      element.addEventListener("mouseleave", () => setHoverState(false));
    });

    const animateCursor = () => {
      // Punto principal: sigue al mouse más rápido.
      dotX += (mouseX - dotX) * 0.70;
      dotY += (mouseY - dotY) * 0.70;

      // Anillo: sigue con un poco más de retraso para dar efecto suave.
      ringX += (mouseX - ringX) * 0.32;
      ringY += (mouseY - ringY) * 0.32;

      cursor.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();
  } else if (cursor && cursorRing) {
    // En pantallas táctiles no tiene sentido mostrar el cursor personalizado.
    cursor.style.display = "none";
    cursorRing.style.display = "none";
  }

  // =========================================================
  // REVEAL AL HACER SCROLL
  // =========================================================
  const revealElements = document.querySelectorAll(".reveal, .fade-up");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    // Fallback: si el navegador no soporta IntersectionObserver,
    // simplemente mostramos todo.
    revealElements.forEach((element) => element.classList.add("visible"));
  }
});