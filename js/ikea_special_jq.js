$(document).ready(function() {

  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    asNavFor: '.slider-for',
    autoplay : true,
    speed : 1000,
    autoplaySpeed : 8000,
    dots: true,
    arrows : true,
    focusOnSelect: true,
    infinite : true,
    pauseOnHover : true,
    
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',

    responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  });

  // header 서브메뉴 슬라이드
  $("nav").mouseenter(function() {
    $(".lnb").stop().slideDown(200);
    $("nav").addClass("on");
  });
  $("nav").mouseleave(function() {
    $(".lnb").stop().slideUp(100);
    $("nav").removeClass("on");
  });

  // header sns 아이콘 클릭 이벤트
  $(".sns .mypage").click(function() {
    alert("로그인을 해주세요.");
  });
  $(".sns .wishList").click(function() {
    alert("로그인을 해주세요.");
  });
  $(".sns .cart").click(function() {
    alert("로그인을 해주세요.");
  });

  // 카테고리 클릭 이벤트
  $(".category > li").click(function() {
    let current = $(this).index(); //변수 선언 - list에는 현재 누른 li의 인덱스 번호가 담아짐

    $(".category > li").removeClass('on');
    $(".category > li").eq(current).addClass('on');
    
    $(".ifproducts_wrap > div").removeClass('on');
    $(".ifproducts_wrap > div").eq(current).addClass('on');

  });

  // ikeaFamily 더보기 클릭 이벤트
  $("#ikeaFamily .more").click(function() {
    window.open("https://www.ikea.com/kr/ko/offers/family-offers/");
  });
});