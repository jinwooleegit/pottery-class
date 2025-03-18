// 메뉴 구조 생성 함수
function createMenu() {
    // 현재 페이지가 하위 디렉토리(chapter 폴더)에 있는지 확인
    const isSubpage = window.location.pathname.includes('/chapter');
    const pathPrefix = isSubpage ? '../' : '';
    
    // 메뉴 HTML 생성
    const menuHTML = `
    <nav class="top-nav">
        <div class="nav-container">
            <a href="${pathPrefix}index.html" class="logo">
                도예 교육과정
            </a>
            
            <button class="mobile-menu-btn" aria-label="메뉴 열기" aria-expanded="false">
                <span>☰</span>
            </button>
            
            <ul class="nav-links">
                <li><a href="${pathPrefix}index.html" class="nav-item" id="menu-home">홈</a></li>
                <li><a href="${pathPrefix}chapter1.html" class="nav-item" id="menu-chapter1">성형 단계</a></li>
                <li><a href="${pathPrefix}chapter2.html" class="nav-item" id="menu-chapter2">정형 단계</a></li>
                <li><a href="${pathPrefix}chapter3.html" class="nav-item" id="menu-chapter3">장식 단계</a></li>
                <li><a href="${pathPrefix}chapter4.html" class="nav-item" id="menu-chapter4">초벌 단계</a></li>
                <li><a href="${pathPrefix}chapter5.html" class="nav-item" id="menu-chapter5">유약과 시유</a></li>
                <li><a href="${pathPrefix}chapter6.html" class="nav-item" id="menu-chapter6">작품 완성과 평가</a></li>
            </ul>
            
            <button class="dark-mode-toggle" aria-label="다크 모드 전환">
                <span>🌓</span>
            </button>
        </div>
    </nav>`;
    
    // 페이지에 메뉴 추가
    const bodyEl = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = menuHTML;
    bodyEl.insertBefore(tempDiv.firstElementChild, bodyEl.firstChild);
    
    // 현재 활성화된 페이지 강조
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation.endsWith(href) || 
            (href.endsWith('index.html') && currentLocation.endsWith('/'))) {
            item.classList.add('active');
        }
    });
    
    // 모바일 메뉴 기능
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
            menuBtn.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // 다크 모드 기능
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if(darkModeToggle) {
        // 로컬 스토리지에서 다크 모드 설정 확인
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // 초기 상태 적용
        if(isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            // 설정 저장
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
}

// DOM이 로드되면 메뉴 초기화
document.addEventListener('DOMContentLoaded', createMenu); 