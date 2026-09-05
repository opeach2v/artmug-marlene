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

  /* 현재 GitHub 페이지에서 목표 영역의 절대 위치 */ 
  const targetTop = target.getBoundingClientRect().top + window.scrollY; 

  /* 아트머그 부모 페이지로 목표 위치 전달 */ 
  window.parent.postMessage( 
    { 
      type: "marlene-scroll-position", 
      id: event.data.id, 
      top: targetTop, 
    }, 
    "*", 
  ); 
}); 



/* =========================================================
   헤어 링크 + 색상 추가
   ========================================================= */

function addHair() {
  const container = document.getElementById("hair-container");

  if (!container) {
    return;
  }

  const count = container.querySelectorAll(".dynamic-item").length;

  /* 최대 3개 */
  if (count >= 3) {
    alert("헤어는 최대 3개까지 추가할 수 있습니다.");
    return;
  }

  const newCount = count + 1;

  const item = document.createElement("div");
  item.className = "dynamic-item";

  item.innerHTML = `
    <div class="dynamic-item-title">
      헤어 ${newCount}
    </div>

    <input 
      type="text" 
      name="hair-link[]" 
      placeholder="헤어 Booth 링크 첨부" 
    />

    <input 
      type="text" 
      name="hair-color[]" 
      placeholder="헤어 색상 (ex. 금발 / 투톤 / 브릿지 / 색상코드)" 
    />

    <div class="dynamic-buttons">
      <button 
        type="button" 
        class="remove-btn" 
        onclick="removeHair(this)"
      >−</button>

      <button 
        type="button" 
        class="add-btn" 
        onclick="addHair()"
      >+</button>
    </div>
  `;

  container.appendChild(item);

  updateHairNumbers();
}


/* 헤어 삭제 */
function removeHair(button) {
  const container = document.getElementById("hair-container");
  const items = container.querySelectorAll(".dynamic-item");

  // 마지막 1개는 삭제하지 않음
  if (items.length <= 1) {
    alert("헤어 항목은 최소 1개가 필요합니다.");
    return;
  }

  const item = button.closest(".dynamic-item");

  if (!item) {
    return;
  }

  item.remove();

  updateHairNumbers();
}


/* 헤어 번호 다시 정리 */
function updateHairNumbers() {
  const items = document.querySelectorAll(
    "#hair-container .dynamic-item"
  );

  items.forEach((item, index) => {
    const title = item.querySelector(".dynamic-item-title");

    if (title) {
      title.textContent = `헤어 ${index + 1}`;
    }
  });
}



/* =========================================================
   의상 링크 + 색상 추가
   ========================================================= */

function addClothes() {
  const container = document.getElementById("clothes-container");

  if (!container) {
    return;
  }

  const count = container.querySelectorAll(".dynamic-item").length;

  /* 최대 3개 */
  if (count >= 3) {
    alert("의상은 최대 3개까지 추가할 수 있습니다.");
    return;
  }

  const newCount = count + 1;

  const item = document.createElement("div");
  item.className = "dynamic-item";

  item.innerHTML = `
    <div class="dynamic-item-title">
      의상 ${newCount}
    </div>

    <input 
      type="text" 
      name="clothes-link[]" 
      placeholder="의상 Booth 링크 첨부" 
    />

    <textarea 
      name="clothes-color[]" 
      placeholder="파츠별 원하는 색상 입력 (ex. 리본=빨강 / 와이셔츠=흰색 / 치마=남색 / 신발=갈색)" 
      style="height: 60px; resize: vertical;"
    ></textarea>

    <div class="dynamic-buttons">
      <button 
        type="button" 
        class="remove-btn" 
        onclick="removeClothes(this)"
      >−</button>

      <button 
        type="button" 
        class="add-btn" 
        onclick="addClothes()"
      >+</button>
    </div>
  `;

  container.appendChild(item);

  updateClothesNumbers();
}


/* 의상 삭제 */
function removeClothes(button) {
  const container = document.getElementById("clothes-container");
  const items = container.querySelectorAll(".dynamic-item");

  // 마지막 1개는 삭제하지 않음
  if (items.length <= 1) {
    alert("의상 항목은 최소 1개가 필요합니다.");
    return;
  }

  const item = button.closest(".dynamic-item");

  if (!item) {
    return;
  }

  item.remove();

  updateClothesNumbers();
}


/* 의상 번호 다시 정리 */
function updateClothesNumbers() {
  const items = document.querySelectorAll(
    "#clothes-container .dynamic-item"
  );

  items.forEach((item, index) => {
    const title = item.querySelector(".dynamic-item-title");

    if (title) {
      title.textContent = `의상 ${index + 1}`;
    }
  });
}



/* =========================================================
   신청서 내용 복사
   ========================================================= */

function copyText() { 

  /* 1번 필수 확인 */
  if (!document.getElementById("agree").checked) { 
    alert("1번 문항을 확인해주세요."); 
    return; 
  } 


  /* =====================================================
     2~5번, 7번 기본 필수 입력 확인
     ===================================================== */

  const requiredFields = [ 
    { id: "nickname", name: "2번 문항" }, 
    { id: "order-note", name: "3번 문항" }, 
    { id: "eye-color", name: "4-1번 문항" }, 
    { id: "reference", name: "4-2번 문항" }, 
    { id: "character", name: "4-3번 문항" }, 
    { id: "avata-reference", name: "5-1번 문항" }, 
    { id: "final-file", name: "7번 문항" }, 
  ]; 


  for (const field of requiredFields) { 
    const element = document.getElementById(field.id); 

    if (!element || !element.value.trim()) { 
      alert(`${field.name}을(를) 입력해주세요.`); 

      if (element) {
        element.focus(); 
      }

      return; 
    } 
  } 



  /* =====================================================
     헤어 필수 입력 확인
     ===================================================== */

  const hairItems = document.querySelectorAll(
    "#hair-container .dynamic-item"
  );


  for (let i = 0; i < hairItems.length; i++) {

    const link = hairItems[i].querySelector(
      'input[name="hair-link[]"]'
    );

    const color = hairItems[i].querySelector(
      'input[name="hair-color[]"]'
    );


    /* 헤어 링크 확인 */
    if (!link || !link.value.trim()) {
      alert(`헤어 ${i + 1}의 Booth 링크를 입력해주세요.`);

      if (link) {
        link.focus();
      }

      return;
    }


    /* 헤어 색상 확인 */
    if (!color || !color.value.trim()) {
      alert(`헤어 ${i + 1}의 색상을 입력해주세요.`);

      if (color) {
        color.focus();
      }

      return;
    }
  }



  /* =====================================================
     의상 필수 입력 확인
     ===================================================== */

  const clothesItems = document.querySelectorAll(
    "#clothes-container .dynamic-item"
  );


  for (let i = 0; i < clothesItems.length; i++) {

    const link = clothesItems[i].querySelector(
      'input[name="clothes-link[]"]'
    );

    const color = clothesItems[i].querySelector(
      'textarea[name="clothes-color[]"]'
    );


    /* 의상 링크 확인 */
    if (!link || !link.value.trim()) {
      alert(`의상 ${i + 1}의 Booth 링크를 입력해주세요.`);

      if (link) {
        link.focus();
      }

      return;
    }


    /* 의상 색상 확인 */
    if (!color || !color.value.trim()) {
      alert(`의상 ${i + 1}의 색상을 입력해주세요.`);

      if (color) {
        color.focus();
      }

      return;
    }
  }



  /* =====================================================
     6번 필수 확인
     ===================================================== */

  const publicness = document.querySelector(
    'input[name="publicness"]:checked'
  ); 

  if (!publicness) { 
    alert("6번 문항을 선택해주세요."); 
    return; 
  } 



  /* =====================================================
     입력값 가져오기
     ===================================================== */

  const agree = document.getElementById("agree").checked 
    ? "확인했습니다" 
    : "확인하지 않았습니다"; 


  const nickname = document.getElementById("nickname").value; 

  const orderNote = document.getElementById("order-note").value; 


  const eyeColor = document.getElementById("eye-color").value; 

  const reference = document.getElementById("reference").value; 

  const character = document.getElementById("character").value; 


  const avatarReference = document.getElementById(
    "avata-reference"
  ).value; 


  const finalFile = document.getElementById(
    "final-file"
  ).value; 



  /* =====================================================
     헤어 입력값 가져오기
     ===================================================== */

  let hairText = "";

  hairItems.forEach((item, index) => {

    const link = item.querySelector(
      'input[name="hair-link[]"]'
    ).value.trim();

    const color = item.querySelector(
      'input[name="hair-color[]"]'
    ).value.trim();


    hairText += `헤어 ${index + 1}\n`;
    hairText += `링크: ${link}\n`;
    hairText += `색상: ${color}`;


    if (index < hairItems.length - 1) {
      hairText += "\n\n";
    }
  });



  /* =====================================================
     의상 입력값 가져오기
     ===================================================== */

  let clothesText = "";

  clothesItems.forEach((item, index) => {

    const link = item.querySelector(
      'input[name="clothes-link[]"]'
    ).value.trim();

    const color = item.querySelector(
      'textarea[name="clothes-color[]"]'
    ).value.trim();


    clothesText += `의상 ${index + 1}\n`;
    clothesText += `링크: ${link}\n`;
    clothesText += `색상:\n${color}`;


    if (index < clothesItems.length - 1) {
      clothesText += "\n\n";
    }
  });



  /* =====================================================
     6번 답변
     ===================================================== */

  let publicnessText = ""; 

  if (publicness.value === "1") { 
    publicnessText = "예"; 
  } else if (publicness.value === "2") { 
    publicnessText = "아니오"; 
  } 



  /* =====================================================
     복사할 내용
     ===================================================== */

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
 
(5-2) 헤어
${hairText}
 
(5-4) 의상
${clothesText}
 
(6) 포트폴리오 공개 여부 
${publicnessText} 
 
(7) 최종 전달 파일 선택 
${finalFile} 
`.trim(); 



  /* =====================================================
     클립보드 복사
     ===================================================== */

  navigator.clipboard 
    .writeText(text) 
    .then(() => { 

      const message = document.getElementById(
        "copy-message"
      ); 

      if (message) {
        message.classList.add("show"); 

        setTimeout(() => { 
          message.classList.remove("show"); 
        }, 2000); 
      }

    }) 

    .catch((error) => { 
      console.error("복사 실패:", error); 
      alert("복사에 실패했습니다."); 
    }); 
}