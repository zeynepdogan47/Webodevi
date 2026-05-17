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

    /* ---------- 4. İletişim Formu ---------- */
    var iletisimFormu = document.getElementById('iletisim_formu');
    if (iletisimFormu) {
        iletisimFormu.addEventListener('submit', function (e) {
            e.preventDefault(); /* Varsayılan form gönderimini engelle */
            
            var ad = document.getElementById('ad').value;
            var soyad = document.getElementById('soyad').value;
            var email = document.getElementById('email').value;
            var mesaj = document.getElementById('mesaj').value;
            
            /* Mail konusu ve içeriğini hazırla */
            var subject = encodeURIComponent("İletişim Formu Mesajı: " + ad + " " + soyad);
            var body = encodeURIComponent("Gönderen: " + ad + " " + soyad + "\nE-Posta: " + email + "\n\nMesaj:\n" + mesaj);
            
            /* Mailto linkine yönlendir (Gizli bir bağlantı oluşturarak tıklatma yöntemi daha güvenilirdir) */
            var mailto_link = "mailto:zseher66@gmail.com?subject=" + subject + "&body=" + body;
            
            var a = document.createElement('a');
            a.href = mailto_link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

});

/* ==========================================================================
   DREAMWEAVER DAVRANIŞLARI (GRADIN & COMPATIBILITY)
   ========================================================================== */

function MM_preloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
        var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
        if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
    if ((x=MM_findObj(a[i]))!=null){
        document.MM_sr[j++]=x;
        if(!x.oSrc) x.oSrc=x.src;
        
        // Modern geçiş efekti entegrasyonu (opacity animasyonu ile)
        x.style.opacity = '0';
        (function(element, newSrc) {
            setTimeout(function() {
                element.src = newSrc;
                element.style.opacity = '1';
            }, 180);
        })(x, a[i+2]);
        
        // Küçük resimlerde seçili class'ını güncelle
        var thumbs = document.querySelectorAll('.galeri_kutu img');
        thumbs.forEach(function(img) {
            if (img.src.indexOf(a[i+2]) !== -1 || a[i+2].indexOf(img.getAttribute('src')) !== -1) {
                img.classList.add('secili');
            } else {
                img.classList.remove('secili');
            }
        });
    }
}