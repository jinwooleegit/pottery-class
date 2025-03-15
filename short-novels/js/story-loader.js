document.addEventListener('DOMContentLoaded', function() {
    // URL에서 소설 ID와 언어 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('story') || 'the-last-leaf';
    const language = urlParams.get('lang') || 'ko';
    const mode = urlParams.get('mode') || 'normal';
    
    // 소설 데이터 로드
    fetch(`data/stories/${storyId}-${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('소설 데이터를 찾을 수 없습니다.');
            }
            return response.json();
        })
        .then(story => {
            // 페이지 제목 업데이트
            document.title = `${story.title} - ${story.author}`;
            document.documentElement.lang = story.language;
            
            // 소설 내용 삽입
            document.getElementById('story-title').textContent = story.title;
            document.getElementById('story-author').textContent = story.author;
            
            // 메타 정보 삽입
            const metaElement = document.getElementById('story-meta');
            metaElement.innerHTML = '';
            story.meta.forEach(meta => {
                const p = document.createElement('p');
                p.innerHTML = meta;
                metaElement.appendChild(p);
            });
            
            // 소설 내용 삽입
            const contentElement = document.getElementById('story-content');
            contentElement.innerHTML = '';
            story.content.forEach(paragraph => {
                contentElement.innerHTML += paragraph;
            });
            
            // 푸터 정보 삽입
            const footerElement = document.getElementById('story-footer');
            footerElement.innerHTML = '';
            story.footer.forEach(info => {
                const p = document.createElement('p');
                p.innerHTML = info;
                footerElement.appendChild(p);
            });
            
            // 언어 전환 링크 추가
            const otherLang = story.language === 'ko' ? 'en' : 'ko';
            const langLabel = story.language === 'ko' ? 'English' : '한국어';
            
            const langSwitch = document.createElement('div');
            langSwitch.className = 'language-switch';
            langSwitch.innerHTML = `<a href="story.html?story=${storyId}&lang=${otherLang}">${langLabel}로 읽기</a>`;
            
            // 인터랙티브 모드 전환 링크 (일반 모드일 경우만)
            if (mode === 'normal') {
                const interactiveLink = document.createElement('div');
                interactiveLink.className = 'interactive-link';
                interactiveLink.innerHTML = `<a href="story.html?story=${storyId}&lang=${language}&mode=interactive">인터랙티브로 읽기</a>`;
                document.querySelector('.navigation').appendChild(interactiveLink);
            }
            
            document.querySelector('.navigation').appendChild(langSwitch);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('story-content').innerHTML = 
                `<p class="error">소설을 불러오는 데 문제가 발생했습니다: ${error.message}</p>`;
        });
}); 