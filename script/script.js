// JavaScript Document/* =============================================
   Zeynep Dogan | js/script.js
   Tum sayfalarda kullanilan ortak fonksiyonlar
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1. Hamburger Menu ---------- */
    var btn  = document.getElementById('hamburger_btn');
    var menu = document.getElementById('nav_menu');

    if (btn && menu) {
        btn.addEventListener('click', function () {
            btn.classList.toggle('acik');
            menu.classList.toggle('acik');
        });

        /* Dis alana tiklaninca kapat */
        document.addEventListener('click', function (e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                btn.classList.remove('acik');
                menu.classList.remove('acik');
            }
        });
    }

    /* ---------- 2. Resim Galerisi (resimlerim.html) ---------- */
    var kucukResimler = document.querySelectorAll('.galeri_kutu img');
    var buyukResim    = document.getElementById('ana_buyuk_resim');

    if (kucukResimler.length > 0 && buyukResim) {

        kucukResimler.forEach(function (img) {
            img.addEventListener('click', function () {

                /* Opacity gecis animasyonu */
                buyukResim.style.opacity = '0';
                setTimeout(function () {
                    buyukResim.src = img.src;
                    buyukResim.alt = img.alt;
                    buyukResim.style.opacity = '1';
                }, 180);

                /* Secili resmi altin cerceve ile vurgula */
                kucukResimler.forEach(function (k) {
                    k.classList.remove('secili');
                });
                img.classList.add('secili');
            });
        });

        /* Sayfa acilisinda ilk resmi secili goster */
        kucukResimler[0].classList.add('secili');
    }

});