// let bannerp = document.getElementsByClassName("cont_banner");
try {
  function bannersResize() {
    let banner = document.getElementsByClassName("cont_banner");
    var anchoBody = document.getElementsByTagName("html")[0].offsetWidth;
    var wrap = document.getElementsByClassName("wrap");
    
    // console.log(anchoBody);
    
    var margLeft = parseInt(window.getComputedStyle(wrap[0], null).getPropertyValue("margin-left"), 10);
    var paddLeft = parseInt(window.getComputedStyle(wrap[0], null).getPropertyValue("padding-left"), 10);
    
    var margRight = parseInt(window.getComputedStyle(wrap[0], null).getPropertyValue("margin-right"), 10);
    var paddRight = parseInt(window.getComputedStyle(wrap[0], null).getPropertyValue("padding-right"), 10);
    
    var marginIzq = margLeft + paddLeft;
    var margderec = margRight + paddRight;
    
      banner[0].style.width = anchoBody - 0.99 + "px";
      banner[0].style.marginRight = "-" + margderec + "px";
      banner[0].style.marginLeft = "-" + marginIzq + "px";
    }
    bannersResize();
    // window.addEventListener("load", bannersResize);
    window.addEventListener("resize", bannersResize);
  }catch (error) {
  }
  
  // CARRUSL REVISTAS
  try {
  var ancho = document.getElementById('ancho_d').offsetWidth;
  var claso =  document.getElementsByClassName('testimonial-item');
  var contSlide = claso.length;
  var numeSlide = 2;
  var valSlide = contSlide * 100;
  var movSlide = valSlide - 100;
  
  if(contSlide == 1){
    numeSlide = 1;
  }
  
  for (var i = 0; i < claso.length; i++) {
    claso[i].setAttribute('style', 'width:' + ancho / numeSlide + 'px;');
  };
  
  function myFunction(x) {
    if (x.matches) { // If media query matches
      claso[0].setAttribute('style', 'width:' + ancho / 1 + 'px;');
    } else {
      claso[0].setAttribute('style', 'width:' + ancho / numeSlide + 'px;');
    }
    }
  
  var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
  
  
  (function () {
    'use strict';
    var slides = document.querySelectorAll('.testimonial-item'),
       button = document.getElementById('button'),
       arrows = document.querySelectorAll('.lnr'),
       carouselCount = 0,
       scrollInterval,
       interval = 5000;
  
    arrows[0].addEventListener('click', function (e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount -= 100;
      slider();
      if (e.type !== 'autoClick') {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, interval);
      }
    });
    arrows[1].addEventListener('click', sliderEvent);
    arrows[1].addEventListener('autoClick', sliderEvent);
    
    function sliderEvent(e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount += 100;
      slider();
      if (e.type !== "autoClick") {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, interval);
      }
    }
    
    function slider() {
      var ancho = document.getElementById('ancho_d').offsetWidth;
  
      for (var i = 0; i < slides.length; i += 1) {
        function myFunction(x) {
          switch (carouselCount) {
            case -100:
              carouselCount = 0;
              break;
            case valSlide:
              carouselCount = 0;
              break;
            default:
              break;
          }
          if (x.matches) { // If media query matches
            slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%); width:' + ancho / 1 + 'px;');
          } else {
            switch (carouselCount) {
              case -100:
                carouselCount = 0;
                break;
              case movSlide:
                carouselCount = 0;
                break;
              default:
                break;
            }
            slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%); width:' + ancho / numeSlide + 'px;');
          }
          }
          var x = window.matchMedia("(max-width: 700px)")
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction); // Attach listener function on state changes
      }
    }
    
    // create new Event to dispatch click for auto scroll
    var autoClick = new Event('autoClick');
    function autoScroll() {
      arrows[1].dispatchEvent(autoClick);
    }
    
    // set timing of dispatch click events
    scrollInterval = setInterval(autoScroll, interval);
    
  })();
  }catch (error) {
  }
  // FIN CARRUSL REVISTAS
  
  // CARRUSEL JUEGOS
  try {
  var slider = document.getElementById('slider'),
      sliderItems = document.getElementById('slides'),
      prev = document.getElementById('prev'),
      next = document.getElementById('next'),
      slideSolo = document.getElementsByClassName('slide'),
      numeroSlide = 3; //numero de slides en pantalla
    //   anchoSliders = document.getElementById('slider').offsetWidth;
  
    // for (var i = 0; i < slideSolo.length; i++) {
    //   slideSolo[i].style.width = anchoSliders / numeroSlide + 'px';
    // }
  
  
  function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        secondSlide = slides[1],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneSecond = secondSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;
  
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.appendChild(cloneSecond);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');
  
    // Mouse events
    items.onmousedown = dragStart;
  
    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
  
    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });
  
    // Transition events
    items.addEventListener('transitionend', checkIndex);
  
    function dragStart (e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
  
      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }
  
    function dragAction (e) {
      e = e || window.event;
  
      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = (items.offsetLeft - posX2) + "px";
    }
  
    function dragEnd (e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        items.style.left = (posInitial) + "px";
      }
      document.onmouseup = null;
      document.onmousemove = null;
    }
  
    function shiftSlide(dir, action) {
      items.classList.add('shifting');
  
      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }
  
        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          (index++);
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) +  "px";
          index--;
        }
      };
  
      allowShift = false;
    }
  
    var valorAdelante = -(items.offsetLeft); // == 150
    var valorAtras = slideSize - valorAdelante; // == 397
    // var prueba = - 697 - (slideSize * (slidesLength - 1));
    var valorPrincipal = -(1 * slideSize) - valorAdelante; //== -697
  
    function checkIndex (){
      items.classList.remove('shifting');
  
      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + valorAtras + "px";//  valor cambiar flecha left
        index = slidesLength - 1;
      }
  
      
      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) - valorAdelante + "px"; // -150 valor cambiar flecha Rigth
        
        var valorLeft = parseInt(window.getComputedStyle(sliderItems, null).getPropertyValue("left"), 10);
        // console.log(valorLeft);
  
        if (valorLeft == valorPrincipal) {
          items.style.left = - valorAdelante + "px";
          // console.log("test");
          // console.log(valorAdelante);
        };
  
        index = 0;
      }
      allowShift = true;
    }
  }
  
  slide(slider, sliderItems, prev, next);
  }catch (error) {
  }
  // FIN CARRUSEL JUEGOS
  
  // MENU
  function openNav() {
    var nav = document.getElementsByClassName("nav_cont_nav")[0];
    nav.classList.toggle("closeopen");
  }
  // FIN MENU
  
  // TABS BENEFICIOS
  function tabsBeneficios(btnTabs, tabs) {
    // console.log('test');
    const d = document;
    let $tabs = d.querySelectorAll(tabs),
        $btnTabs = d.querySelectorAll(btnTabs);
  
    for (let i = 0; i < $tabs.length; i++) {
        let a = d.createAttribute('data-link');
        $tabs[i].id = `tab${i}`;
        a.value = `tab${i}`;
        $btnTabs[i].setAttributeNode(a);
    }
  
    d.addEventListener('click', (e) =>{
  
        if (e.target.matches(btnTabs)){
            for (let i = 0; i < $tabs.length; i++) {
                $btnTabs[i].classList.remove("active");
                e.target.classList.add("active");  
                $tabs[i].classList.remove("ver");
                d.getElementById(e.target.getAttribute("data-link")).classList.add("ver");
            }
        }
  
    });
  }
  tabsBeneficios(".tablinks", ".tabcontent");
  // FIN TABS BENEFICIOS

// RECETAS HOME
function sliderRecetas(item, bullets) {

  const d = document;
  const $items = d.querySelectorAll(item),
  $contBullet = d.querySelector(bullets);

  $items.forEach((el, idx) => { $contBullet.insertAdjacentHTML("beforeend", `<li class="punto_bull" data-slide="${idx}"></li>`) });

  let $puntoBullet = d.querySelectorAll(".punto_bull"),
      slidendex = 0;

  function mostrardiv(n) {
    if (n >= $items.length) {slidendex = 0;}    
    if (n < 0) {slidendex = $items.length}

    $items.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });

    $items[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  function funNext() {
    $items.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });
    slidendex++;
    if (slidendex >= $items.length) {slidendex = 0;}    
    $items[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  function funPrev() {
    $items.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });
    slidendex--;
    if (slidendex < 0) {slidendex = $items.length - 1;}    
    $items[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  mostrardiv(slidendex);

  const ELDiv = (n) => { mostrardiv(slidendex = n);}

  d.addEventListener("click", function(e) {
    if (e.target.matches(".punto_bull")) { ELDiv(e.target.dataset.slide); }
    if (e.target.matches(".fPrev")) { funPrev(); }
    if (e.target.matches(".fNext")) { funNext(); }
  });

  setInterval(funNext, 5000);
    
}

try {
  sliderRecetas(".item_slide", ".cont_bulllets");
} catch (err) {}
// FIN RECETAS HOME

// PREMIOS HOME
function sliderPremios(item, bullets) {

  const d2 = document;
  const $items2 = d2.querySelectorAll(item),
  $contBullet2 = d2.querySelector(bullets);

  $items2.forEach((el, idx) => { $contBullet2.insertAdjacentHTML("beforeend", `<li class="punto_bull2" data-slide="${idx}"></li>`) });

  let $puntoBullet = d2.querySelectorAll(".punto_bull2"),
      slidendex = 0;

  function mostrardiv(n) {
    if (n >= $items2.length) {slidendex = 0;}    
    if (n < 0) {slidendex = $items2.length}

    $items2.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });

    $items2[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  function funNext() {
    $items2.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });
    slidendex++;
    if (slidendex >= $items2.length) {slidendex = 0;}    
    $items2[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  function funPrev() {
    $items2.forEach(el => { el.classList.remove("active");});
    $puntoBullet.forEach(el => { el.className = el.className.replace(" activado", "") });
    slidendex--;
    if (slidendex < 0) {slidendex = $items2.length - 1;}    
    $items2[slidendex].classList.add("active");
    $puntoBullet[slidendex].classList.add("activado");
  }

  mostrardiv(slidendex);

  const ELDiv = (n) => { mostrardiv(slidendex = n);}

  d2.addEventListener("click", function(e) {
    if (e.target.matches(".punto_bull2")) { ELDiv(e.target.dataset.slide); }
    if (e.target.matches(".pPrev")) { funPrev(); }
    if (e.target.matches(".pNext")) { funNext(); }
  });

  setInterval(funNext, 5000);
    
}

try {
  sliderPremios(".item_slide2", ".cont_bullets2");
} catch (err) {}
// FIN RECETAS HOME

// MODAL COMPRAR EN TIENDAS
function modalImgs(modal, modalon, modaloff) {

  const d = document;

  let $modal = d.querySelectorAll(modal),
      $btnModalOn = d.querySelectorAll(modalon),
      $btnModalOff = d.querySelectorAll(modaloff);

  for (let i = 0; i < $modal.length; i++) {

  let a = d.createAttribute('data-link'),
      b = d.createAttribute('data-link');
  $modal[i].id = `modal${i}`;
  a.value = `modal${i}`;
  b.value = `modal${i}`;
  $btnModalOn[i].setAttributeNode(a);
  $btnModalOff[i].setAttributeNode(b);

  
  d.addEventListener("click", function(e) {

      let $idModal = d.getElementById(e.target.getAttribute("data-link"));

      if (e.target.matches(modalon)) {
        e.preventDefault();
        $idModal.classList.add('isOn');
      }
      
      if (e.target.matches(modaloff)) { $idModal.classList.remove('isOn'); }

  });

  }

}
try {
  modalImgs(".modalGeneral", ".modalOn", ".modalOff");
} catch (err) {}
// FIN MODAL COMPRAR EN TIENDAS


jQuery( document ).ready(function() {

    jQuery("html").click(function() {
      jQuery('.descrip_bf').hide();
    });
    jQuery('.imgbenef').click(function(event){
     event.stopPropagation();
    });
    jQuery(".imgbenef").click(function () { 
      jQuery('.descrip_bf').hide();
      jQuery(this).children(".descrip_bf").show();   
    });
});
