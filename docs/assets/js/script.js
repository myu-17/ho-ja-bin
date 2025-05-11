// フォント埋め込み

(function (d) {
  var config = {
      kitId: "exn3lto",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

// アーチ文字

function generateArchText(
  selector,
  targetStr,
  radius,
  totalAngle,
  isInverse = false
) {
  const parentElement = document.querySelector(selector);
  if (parentElement === null) {
    return;
  }
  const ratio = document.body.clientWidth / 1280;
  const angleStep = totalAngle / (targetStr.length - 1); // 各文字の間隔角度

  for (let i = 0; i < targetStr.length; i++) {
    const childElement = document.createElement("span");
    childElement.textContent = targetStr[i];
    const angle = i * angleStep - totalAngle / 2;
    const rad = angle * (Math.PI / 180);
    const x = radius * ratio * Math.sin(rad);
    const y = radius * ratio * (1 - Math.cos(rad));
    parentElement.appendChild(childElement);
    childElement.style.textAlign = "center";
    childElement.style.position = "absolute";
    childElement.style.width = "1em";
    childElement.style.left = `calc(50% + ${x}px)`;
    if (isInverse) {
      childElement.style.bottom = `${y}px`;
    } else {
      childElement.style.top = `${y}px`;
    }
    childElement.style.transform = isInverse
      ? `rotate(${-angle}deg)`
      : `rotate(${angle}deg)`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateArchText(".mv_arch_text01", "台湾風刨冰", 300, 50);
  generateArchText(".mv_arch_text02", "好食冰", 200, 30, true);
  generateArchText(".mv_arch_text03", "ひんやり涼やか", 250, 50);
  generateArchText(".mv_arch_text04", "ごあいさつ", 300, 50);
  generateArchText(".mv_arch_text05", "かき氷へのこだわり", 400, 50);
  generateArchText(".mv_arch_text06", "ひんやり涼やか", 350, 50);
  generateArchText(".arch_text", "台湾風刨冰", 110, 50);
  generateArchText(".arch_text02", "台湾風刨冰", 170, 60);
  generateArchText(".mv_arch_text07", "かき氷へのこだわり", 500, 60);
});

// TOPへ戻るボタン

$(function () {
  var pagetop = $("#page_top");
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// 　プラグイン「slick」の起動とカスタマイズ

$(document).ready(function () {
  try {
    $(".slider").slick({
      autoplay: true, //自動再生on
      fade: true, //横スクロールではなくフェードアニメにする
      dots: true,
      arrows: false, //ボタン非表示
      pauseOnHover: false, //ホバー時の再生停止をoff
      pauseOnFocus: false, //フォーカス時の再生停止をoff
      autoplaySpeed: 1800, //自動再生の速度（アニメーションの間隔）を0.5秒に
      speed: 3000, //アニメーションの動き自体の速度を2秒に
    });
  } catch (e) {}
});

// ローディング画面

$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      /*
              2回目以降アクセス時の処理
            */
      $(".loading").addClass("is-active");
    } else {
      /*
              初回アクセス時の処理
            */
      sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
      $(".loading-animation").addClass("is-active"); // loadingアニメーションを表示
      setTimeout(function () {
        // ローディングを数秒後に非表示にする
        $(".loading").addClass("is-active");
        $(".loading-animation").removeClass("is-active");
      }, 3000); // ローディングを表示する時間
    }
  };
  webStorage();
});

//かき氷fadeup

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime() {
  $(".fadeUpTrigger").each(function () {
    //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top + 100; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp"); // 画面内に入ったらfadeUpというクラス名を追記
    }
  });

  $(".fadeInTrigger").each(function () {
    var elemPos = $(this).offset().top + 100;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeIn");
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述

//newsのコンテンツを１つずつフェードインさせる

$(function () {
  $(window).scroll(function () {
    $(".fade_in").each(function () {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight + 200) {
        $(function () {
          $(".fade_in").each(function (i) {
            $(this)
              .delay(i * 180)
              .queue(function () {
                $(this).addClass("active");
              });
          });
        });
      }
    });
  });
});

$(function () {
  $(".blur_img").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("img-blur");
    } else {
      //表示領域から出た時
      // $(this).removeClass('img-blur');
    }
  });
});

// hmg_btn

$(function () {
  var $nav = $("#navArea");
  var $btn = $(".toggle_btn");
  var $mask = $("#mask");
  var open = "open"; // class
  // menu open close
  $btn.on("click", function () {
    if (!$nav.hasClass(open)) {
      $nav.addClass(open);
    } else {
      $nav.removeClass(open);
    }
  });
  // mask close
  $mask.on("click", function () {
    $nav.removeClass(open);
  });
});
