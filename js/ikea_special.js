const slider = document.querySelector(".lp_slider");
const innerSlider = document.querySelector(".slider-inner");
const scrollbar = document.querySelector('.custom-scrollbar');
const thumb = document.querySelector('.scroll-thumb');

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
  e.preventDefault(); //e의 기본값 제거
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

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const scrollStep = 650; // 버튼 클릭당 이동 거리

function moveSliderBy(distance) {
  const outerWidth = slider.offsetWidth;
  const innerWidth = innerSlider.scrollWidth;
  let currentLeft = parseFloat(innerSlider.style.left) || 0;

  let newLeft = currentLeft + distance;

  // 경계 제한
  if (newLeft > 0) {
    newLeft = 0;
  }
  const maxLeft = -(innerWidth - outerWidth);
  if (newLeft < maxLeft) {
    newLeft = maxLeft;
  }

  innerSlider.style.left = `${newLeft}px`;
  updateScrollbar();
  updateArrowVisibility();
}

leftArrow.addEventListener('click', () => {
  moveSliderBy(scrollStep); // 왼쪽은 양수 (콘텐츠를 오른쪽으로)
});

rightArrow.addEventListener('click', () => {
  moveSliderBy(-scrollStep); // 오른쪽은 음수 (콘텐츠를 왼쪽으로)
});

function updateArrowVisibility() {
  const outerWidth = slider.offsetWidth;
  const innerWidth = innerSlider.scrollWidth;
  const currentLeft = parseFloat(innerSlider.style.left) || 0;

  if (currentLeft < 0) {
    leftArrow.style.display = 'block';
  } else {
    leftArrow.style.display = 'none';
  }

  if (Math.abs(currentLeft) < innerWidth - outerWidth) {
    rightArrow.style.display = 'block';
  } else {
    rightArrow.style.display = 'none';
  }
}

// 초기 상태 및 리사이즈 시 버튼 보이기 갱신
window.addEventListener("load", () => {
  innerSlider.style.left = "0px";
  updateScrollbar();
  updateArrowVisibility();
});

window.addEventListener("resize", () => {
  updateScrollbar();
  updateArrowVisibility();
});