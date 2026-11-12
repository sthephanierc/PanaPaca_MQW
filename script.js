document.addEventListener('DOMContentLoaded', () => {

  const botonMenu = document.querySelector('#boton-menu');
  const menu = document.querySelector('#menu');
  const enlacesMenu = document.querySelectorAll('#menu a');
  
    if (typeof AOS !== 'undefined') {
        AOS.init({
        duration: 100,
        easing: 'ease-out',
        once: true,
        offset: 10
        });
    }

  if (botonMenu && menu) {
    botonMenu.addEventListener('click', () => {
      const estaOculto = menu.classList.toggle('hidden');
      botonMenu.setAttribute('aria-expanded', !estaOculto);
      botonMenu.textContent = estaOculto ? 'Menú' : 'Cerrar';
    });

    enlacesMenu.forEach(enlace => {
      enlace.addEventListener('click', () => {
        menu.classList.add('hidden');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.textContent = 'Menú';
      });
    });
  }

  // 2. Control Modo Claro / Oscuro con LocalStorage
  const botonTema = document.querySelector('#boton-tema');
  const html = document.documentElement;

  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado === 'dark') {
    html.classList.add('dark');
    if (botonTema) {
      botonTema.setAttribute('aria-pressed', 'true');
      botonTema.textContent = '☀︎ Modo claro';
    }
  }

  if (botonTema) {
    botonTema.addEventListener('click', () => {
      const esOscuro = html.classList.toggle('dark');

      botonTema.setAttribute('aria-pressed', esOscuro);
      botonTema.textContent = esOscuro ? '☀︎ Modo claro' : '⏾ Modo oscuro';

      localStorage.setItem('tema', esOscuro ? 'dark' : 'light');
    });
  }

  // 3. Inicialización de Librería JS Adicional (AOS - Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

});


// Reviews -> 

const REVIEWS = [
    {
        id: 6,
        name: 'María G.',
        role: '★★★★★',
        avatar: 'https://api.dicebear.com/10.x/initial-face/svg?seed=98w4p0o1',
        review: `El pan está buenísimo, se nota que está hecho con cariño. Las tostadas son de mis favoritas y siempre que puedo me paso a desayunar.`,
    },
    {
        id: 0,
        name: 'Antonio B.',
        role: '★★★★★',
        avatar: 'https://api.dicebear.com/10.x/initial-face/svg?seed=awwwmbcz',
        review: `Encargué una tarta para un cumpleaños y fue todo un éxito. Estaba preciosa y todavía mejor de sabor. ¡Repetiremos!`,
    },
    {
        id: 2,
        name: 'Carlota M.',
        role: '★★★★★',
        avatar: 'https://api.dicebear.com/10.x/initial-face/svg?seed=c',
        review: `Todo está delicioso, especialmente la bollería. Los croissants están increíbles y la atención es siempre estupenda.`,
    },
    {
        id: 3,
        name: 'Diana R.',
        role: '★★★★★',
        avatar: 'https://api.dicebear.com/10.x/initial-face/svg?seed=bxh1es21',
        review: `Pedimos varias bandejas para una celebración familiar y nos encantó todo. La presentación, el sabor y la variedad fueron perfectos`,
    },
];

let currentCard;

function renderReviews() {
    const tplCard = document.querySelector("#tpl-card");
    const listCards = document.querySelector("#list-cards");

    REVIEWS.forEach((r, idx) => {
        const clone = tplCard.content.cloneNode(true);
        clone.querySelector("blockquote").innerText = `"${r.review}"`;
        clone.querySelector("[review-name]").innerText = r.name;
        clone.querySelector("[review-role]").innerText = r.role;
        clone.querySelector("[review-img]").src = r.avatar;
        if (idx === 0) {
            clone.querySelector("div").classList.remove("opacity-0")
            clone.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full")
            clone.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]")
            currentCard = clone.querySelector("div");
        }
        listCards.append(clone)
    })
}

// SLIDER
function sliderInit() {
    renderReviews()

    let currentİndex = 0;
    const slider = document.querySelector("#slider");
    const slides = slider.querySelectorAll(".card");
    const totalSlides = REVIEWS.length;
    const sliderButtons = document.querySelectorAll("[data-slide]");

    sliderButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {

            sliderButtons[0].classList.add("translate-x-20")
            sliderButtons[1].classList.add("-translate-x-20")
           
            currentCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full")
            currentCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]")

            if (btn.getAttribute("data-slide") === "prev") {
                currentİndex = (totalSlides + currentİndex - 1) % totalSlides;
            } else {
                currentİndex = (totalSlides + currentİndex + 1) % totalSlides;
            }
      
            setTimeout(() => {
                currentCard = slides[currentİndex];
                currentCard.classList.remove("opacity-0")
                currentCard.querySelector("blockquote").classList.remove("scale-0","before:-translate-y-full")
                currentCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");

                sliderButtons[0].classList.remove("translate-x-20")
                sliderButtons[1].classList.remove("-translate-x-20")
            }, 500)
        })
    })
}

sliderInit();

// AOS ANIMATIONS -> 
 AOS.init({
      duration: 2000
   });



