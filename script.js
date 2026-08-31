function filterPortfolio(category, btn) {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((b) => {
    b.style.background = "#fff";
    b.style.color = "#b89768";
  });
  btn.style.background = "#b89768";
  btn.style.color = "#fff";
  const items = document.querySelectorAll(".portfolio-item");
  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
  const slider = document.getElementById("portfolioSlider"); 
  if (slider) { 
    slider.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: "auto", 
    }); 
  } 
}
/* 아트머그 메뉴에서 이동 요청을 받음 */
window.addEventListener("message", function (event) {
  if (!event.data || event.data.type !== "marlene-scroll") {
    return;
  }
  const target = document.getElementById(event.data.id);
  if (!target) {
    return;
  }
  /* 현재 GitHub 페이지에서 목표 영역의 절대 위치*/
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  /*아트머그 부모 페이지로 목표 위치 전달*/
  window.parent.postMessage(
    {
      type: "marlene-scroll-position",
      id: event.data.id,
      top: targetTop,
    },
    "*",
  );
});

function copyText() {
  // 1번 필수 확인
  if (!document.getElementById("agree").checked) {
    alert("1번 문항을 확인해주세요.");
    return;
  }

  // 2~5번, 7번 필수 입력 확인
  const requiredFields = [
    { id: "nickname", name: "2번 문항" },
    { id: "order-note", name: "3번 문항" },
    { id: "eye-color", name: "4-1번 문항" },
    { id: "reference", name: "4-2번 문항" },
    { id: "character", name: "4-3번 문항" },
    { id: "avata-reference", name: "5-1번 문항" },
    { id: "hair-link", name: "5-2번 문항" },
    { id: "hair-color", name: "5-3번 문항" },
    { id: "clothes-link", name: "5-4번 문항" },
    { id: "clothes-color", name: "5-5번 문항" },
    { id: "final-file", name: "7번 문항" },
  ];

  for (const field of requiredFields) {
    const element = document.getElementById(field.id);

    if (!element.value.trim()) {
      alert(`${field.name}을(를) 입력해주세요.`);
      element.focus();
      return;
    }
  }

  // 6번 필수 확인
  const publicness = document.querySelector('input[name="publicness"]:checked');

  if (!publicness) {
    alert("6번 문항을 선택해주세요.");
    return;
  }

  // 입력값 가져오기
  const agree = document.getElementById("agree").checked
    ? "확인했습니다"
    : "확인하지 않았습니다";

  const nickname = document.getElementById("nickname").value;
  const orderNote = document.getElementById("order-note").value;

  const eyeColor = document.getElementById("eye-color").value;
  const reference = document.getElementById("reference").value;
  const character = document.getElementById("character").value;

  const avatarReference = document.getElementById("avata-reference").value;
  const hairLink = document.getElementById("hair-link").value;
  const hairColor = document.getElementById("hair-color").value;
  const clothesLink = document.getElementById("clothes-link").value;
  const clothesColor = document.getElementById("clothes-color").value;

  const finalFile = document.getElementById("final-file").value;

  // 6번 답변
  let publicnessText = "";

  if (publicness.value === "1") {
    publicnessText = "예";
  } else if (publicness.value === "2") {
    publicnessText = "아니오";
  }

  // 복사할 내용
  const text = `
(1) 주의사항 및 환불규정을 확인하셨나요?
${agree}

(2) 방송 닉네임 및 주 플랫폼 방송 링크를 첨부해주세요.
${nickname}

(3) 주문 사항
${orderNote}

(4) 아바타 설정 및 참고자료

(4-1) 동공 색상
${eyeColor}

(4-2) 참고 자료
${reference}

(4-3) 캐릭터 설정
${character}

(5) 뚜따 Booth 에셋

(5-1) 바디 합성 시 사용할 아바타
${avatarReference}

(5-2) 헤어 링크
${hairLink}

(5-3) 헤어 색상
${hairColor}

(5-4) 의상 링크
${clothesLink}

(5-5) 의상 색상
${clothesColor}

(6) 포트폴리오 공개 여부
${publicnessText}

(7) 최종 전달 파일 선택
${finalFile}
`.trim();

  // 클립보드 복사
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const message = document.getElementById("copy-message");

      message.classList.add("show");

      setTimeout(() => {
        message.classList.remove("show");
      }, 2000);
    })
    .catch((error) => {
      console.error("복사 실패:", error);
      alert("복사에 실패했습니다.");
    });
}
