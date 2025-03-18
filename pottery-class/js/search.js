/**
 * 도예 교육과정 웹사이트 검색 기능
 * 이 스크립트는 웹사이트 내 콘텐츠를 검색하는 기능을 제공합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // 검색 데이터 - 실제로는 서버에서 가져오거나 더 많은 콘텐츠를 포함해야 합니다
    const searchData = [
        {
            title: '성형 단계',
            url: 'chapter1.html',
            content: '흙의 특성 이해부터 시작하여 손성형과 물레성형의 기본을 학습합니다. 다양한 흙의 종류와 특성, 기본 도구 사용법, 손성형 기법, 물레 작동법 등을 배웁니다.'
        },
        {
            title: '정형 단계',
            url: 'chapter2.html',
            content: '성형된 기물의 형태를 정교하게 다듬고 완성하는 기술을 배웁니다. 정형 도구의 사용법, 굽 깎기와 다듬기 기법, 세부 장식 기법과 문양 표현, 부속품 제작 및 부착 방법을 학습합니다.'
        },
        {
            title: '장식 단계',
            url: 'chapter3.html',
            content: '작품의 미적 가치를 높이는 다양한 장식 기법을 배웁니다. 장식 도구와 재료, 조각과 양각 기법, 색화장토와 안료 사용법, 전사지와 문양 표현 기법을 익힙니다.'
        },
        {
            title: '초벌 단계',
            url: 'chapter4.html',
            content: '작품의 안전한 건조 방법과 첫 번째 소성 과정인 초벌구이에 대해 배웁니다. 도자기 건조 과정과 방법, 건조 과정에서 발생하는 문제점과 해결책, 가마의 종류와 초벌구이 원리, 온도 설정과 가마 적재 방법을 학습합니다.'
        },
        {
            title: '유약과 시유',
            url: 'chapter5.html',
            content: '도자기의 완성도를 높이는 유약에 대해 배우고, 다양한 시유 기법을 실습합니다. 유약의 이해와 기본 원리, 시유 도구와 기본 기법, 응용 시유 기법, 유약 실험과 창의적 표현 방법을 익힙니다.'
        },
        {
            title: '작품 완성과 평가',
            url: 'chapter6.html',
            content: '소성이 완료된 작품의 최종 마무리와 포트폴리오 구성, 작품 평가 방법을 학습합니다. 작품 최종 마무리, 작품 촬영과 포트폴리오, 전시 기획과 진행, 작품 평가와 발전 방향에 대해 배웁니다.'
        },
        {
            title: '도예 용어집',
            url: 'pottery-terms.html',
            content: '도예에 관련된 전문 용어들을 모아 놓은 용어집입니다. 흙, 성형, 유약, 소성 등에 관련된 다양한 용어들을 알기 쉽게 설명합니다.'
        }
    ];
    
    // 검색 함수
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            searchResults.innerHTML = '<p>검색어를 입력해주세요.</p>';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        );
        
        displayResults(results, query);
    }
    
    // 검색 결과 표시 함수
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
            return;
        }
        
        let html = '<h3>검색 결과</h3><ul class="search-results-list">';
        
        results.forEach(item => {
            // 검색어를 강조 표시
            const highlightedContent = highlightText(item.content, query);
            
            html += `
                <li class="search-result-item">
                    <a href="${item.url}" class="result-title">${item.title}</a>
                    <p class="result-content">${highlightedContent}</p>
                </li>
            `;
        });
        
        html += '</ul>';
        searchResults.innerHTML = html;
    }
    
    // 검색어 강조 표시 함수
    function highlightText(text, query) {
        const regex = new RegExp(query, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    
    // 이벤트 리스너 추가
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 