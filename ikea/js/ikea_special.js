const slider = document.querySelector(".lp_slider");
const innerSlider = document.querySelector(".slider-inner");
const scrollbar = document.querySelector('.custom-scrollbar');
const thumb = document.querySelector('.scroll-thumb');
let pressed = false;  //클릭 상태 체크
let startx;  //마우스 드래그 시작점 x좌표 체크
let x;  //마우스 드래그시 x좌표 체크

slider.addEventListener("mousedown", e => { //드래그 시작 좌표 기억
  pressed = true;
  startx = e.offsetX - innerSlider.offsetLeft;
  slider.style.cursor = "grabbing";
})

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab";
})

slider.addEventListener("mouseup", () => { //마우스를 뗐을 때 드래그 종료
  slider.style.cursor = "grab";
})

window.addEventListener("mouseup", () => {  //window 밖 클릭 햐제 시 드래그 종료
  pressed = false;
})

slider.addEventListener("mousemove", e => { //innerSlider의 left 값을 실시간 업데이트
  if (!pressed) return;
  e.preventDefault();
  x = e.offsetX;

  innerSlider.style.left = `${x - startx}px`;
  checkboundary();
  updateScrollbar(); // 스크롤바 위치 갱신
})

function checkboundary() { //경계 제한 - 콘텐츠가 왼쪽 끝(0px)보다 더 가거나 오른쪽 끝보다 더 가는 경우 위치를 조정
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();
  let changed = false;

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px";
    changed = true;
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
    changed = true;
  }
  if (changed) updateScrollbar();
}

function updateScrollbar() { //커스텀 스크롤바 동기화
  const outerWidth = slider.offsetWidth;
  const innerWidth = innerSlider.scrollWidth;

  // 비율에 따라 thumb 너비 설정
  const thumbWidth = (outerWidth / innerWidth) * outerWidth;
  thumb.style.width = `${thumbWidth}px`;

  // 현재 left 값 기준으로 thumb 위치 계산
  const left = parseFloat(innerSlider.style.left) || 0;
  const scrollPercent = -left / (innerWidth - outerWidth);
  const thumbLeft = scrollPercent * (outerWidth - thumbWidth);

  thumb.style.left = `${thumbLeft}px`;
}

window.addEventListener("load", () => {
  innerSlider.style.left = "0px";
  updateScrollbar();
});

window.addEventListener("resize", updateScrollbar);

// 스크롤바 기능
let thumbDragging = false;
let startThumbX;
let startLeftPercent;

thumb.addEventListener("mousedown", (e) => {
  e.preventDefault();
  thumbDragging = true;
  startThumbX = e.clientX;

  const thumbLeft = parseFloat(thumb.style.left) || 0;
  const outerWidth = slider.offsetWidth;
  const thumbWidth = thumb.offsetWidth;

  startLeftPercent = thumbLeft / (outerWidth - thumbWidth);

  document.body.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!thumbDragging) return;

  const dx = e.clientX - startThumbX;
  const outerWidth = slider.offsetWidth;
  const thumbWidth = thumb.offsetWidth;
  const newLeft = (startLeftPercent * (outerWidth - thumbWidth)) + dx;

  const maxLeft = outerWidth - thumbWidth;
  const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));

  thumb.style.left = `${clampedLeft}px`;

  // 콘텐츠 위치 동기화
  const scrollPercent = clampedLeft / (outerWidth - thumbWidth);
  const innerWidth = innerSlider.scrollWidth;
  const newSliderLeft = -scrollPercent * (innerWidth - outerWidth);
  innerSlider.style.left = `${newSliderLeft}px`;
});

window.addEventListener("mouseup", () => {
  if (thumbDragging) {
    thumbDragging = false;
    document.body.style.cursor = "default";
  }
});