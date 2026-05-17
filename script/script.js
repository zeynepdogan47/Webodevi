/* =============================================
   Zeynep Dogan | script/script.js
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

    /* ---------- 3. Lightbox — Buyuk resme tiklaninca tam ekran ---------- */
    if (buyukResim) {

        /* Overlay elementini olustur */
        var overlay = document.createElement('div');
        overlay.id  = 'lightbox_overlay';
        overlay.innerHTML =
            '<button id="lightbox_kapat" aria-label="Kapat">&#x2715;</button>' +
            '<img id="lightbox_resim" src="" alt="">';
        document.body.appendChild(overlay);

        var lbResim = document.getElementById('lightbox_resim');
        var lbKapat = document.getElementById('lightbox_kapat');

        function lightboxAc() {
            lbResim.src = buyukResim.src;
            lbResim.alt = buyukResim.alt;
            overlay.classList.add('acik');
            document.body.style.overflow = 'hidden';
        }

        function lightboxKapat() {
            overlay.classList.remove('acik');
            document.body.style.overflow = '';
        }

        buyukResim.style.cursor = 'zoom-in';
        buyukResim.addEventListener('click', lightboxAc);
        lbKapat.addEventListener('click', lightboxKapat);

        /* Dis alana tiklaninca kapat */
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { lightboxKapat(); }
        });

        /* Escape ile kapat */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { lightboxKapat(); }
        });
    }

});