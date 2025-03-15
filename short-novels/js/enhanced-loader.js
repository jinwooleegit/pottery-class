document.addEventListener('DOMContentLoaded', function() {
    // URL에서 소설 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('story') || 'the-last-leaf';
    
    // 소설 데이터 로드
    fetch(`data/stories/${storyId}-enhanced.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('소설 데이터를 찾을 수 없습니다.');
            }
            return response.json();
        })
        .then(story => {
            // 페이지 제목 및 메타데이터 업데이트
            document.title = `${story.title} - ${story.author} | 영어 학습 소설`;
            document.documentElement.lang = story.language;
            
            // 소설 기본 정보 표시
            document.getElementById('story-title').textContent = story.title;
            document.getElementById('story-author').textContent = story.author;
            
            // 난이도 표시
            const levelBadge = document.getElementById('story-level');
            levelBadge.textContent = story.level.toUpperCase();
            levelBadge.classList.add(story.level.toLowerCase());
            
            // 소개 표시
            document.querySelector('.introduction-en').textContent = story.introduction.en;
            document.querySelector('.introduction-ko').textContent = story.introduction.ko;
            
            // 소설 내용 표시
            const contentElement = document.getElementById('story-content');
            contentElement.innerHTML = ''; // 기존 내용 초기화
            
            // 각 단락 처리
            story.paragraphs.forEach(paragraph => {
                const paragraphContainer = document.createElement('div');
                paragraphContainer.className = 'paragraph-container';
                paragraphContainer.id = paragraph.id;
                
                // 오디오 컨트롤 및 영어 원문
                const englishParagraph = document.createElement('div');
                englishParagraph.className = 'paragraph-english';
                
                // 오디오 기능이 있는 경우 오디오 컨트롤 추가
                if (story.audio_available && paragraph.audio_url) {
                    const audioControl = document.createElement('span');
                    audioControl.className = 'audio-control';
                    audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                    audioControl.addEventListener('click', function() {
                        playAudio(paragraph.audio_url);
                    });
                    englishParagraph.appendChild(audioControl);
                }
                
                // 영어 원문에 단어/숙어 하이라이트 처리
                let enhancedText = paragraph.en;
                
                // 단어 하이라이트
                if (paragraph.vocabulary) {
                    paragraph.vocabulary.forEach(vocab => {
                        const regex = new RegExp(`\\b${vocab.word}\\b`, 'gi');
                        enhancedText = enhancedText.replace(regex, `<span class="highlighted-word" data-word="${vocab.word}">${vocab.word}</span>`);
                    });
                }
                
                // 숙어 하이라이트
                if (paragraph.phrases) {
                    paragraph.phrases.forEach(phrase => {
                        const escapedPhrase = phrase.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(escapedPhrase, 'gi');
                        enhancedText = enhancedText.replace(regex, `<span class="highlighted-phrase" data-phrase="${phrase.phrase}">${phrase.phrase}</span>`);
                    });
                }
                
                // 영어 원문 추가
                const textSpan = document.createElement('span');
                textSpan.className = 'text';
                textSpan.innerHTML = enhancedText;
                englishParagraph.appendChild(textSpan);
                paragraphContainer.appendChild(englishParagraph);
                
                // 한국어 번역
                const koreanParagraph = document.createElement('div');
                koreanParagraph.className = 'paragraph-korean';
                koreanParagraph.textContent = paragraph.ko;
                paragraphContainer.appendChild(koreanParagraph);
                
                // 단어 및 숙어 섹션
                if (paragraph.vocabulary || paragraph.phrases) {
                    const vocabularySection = document.createElement('div');
                    vocabularySection.className = 'vocabulary-section';
                    
                    // 단어 목록
                    if (paragraph.vocabulary && paragraph.vocabulary.length > 0) {
                        const vocabTitle = document.createElement('div');
                        vocabTitle.className = 'section-title';
                        vocabTitle.innerHTML = '<i class="fas fa-book"></i> 단어';
                        vocabularySection.appendChild(vocabTitle);
                        
                        const vocabList = document.createElement('div');
                        vocabList.className = 'vocabulary-list';
                        
                        paragraph.vocabulary.forEach(vocab => {
                            const vocabItem = document.createElement('div');
                            vocabItem.className = 'vocabulary-item';
                            vocabItem.textContent = vocab.word;
                            
                            // 툴팁 추가
                            const tooltip = document.createElement('div');
                            tooltip.className = 'tooltip';
                            tooltip.innerHTML = `
                                <div class="tooltip-title">${vocab.word}</div>
                                <div class="tooltip-meaning">${vocab.meaning}</div>
                                <div class="tooltip-example">"${vocab.example}"</div>
                                <div class="tooltip-ko">${vocab.ko_meaning}</div>
                            `;
                            vocabItem.appendChild(tooltip);
                            
                            vocabList.appendChild(vocabItem);
                        });
                        
                        vocabularySection.appendChild(vocabList);
                    }
                    
                    // 숙어 목록
                    if (paragraph.phrases && paragraph.phrases.length > 0) {
                        const phraseTitle = document.createElement('div');
                        phraseTitle.className = 'section-title';
                        phraseTitle.innerHTML = '<i class="fas fa-quote-right"></i> 숙어 및 표현';
                        vocabularySection.appendChild(phraseTitle);
                        
                        const phraseList = document.createElement('div');
                        phraseList.className = 'phrase-list';
                        
                        paragraph.phrases.forEach(phrase => {
                            const phraseItem = document.createElement('div');
                            phraseItem.className = 'phrase-item';
                            phraseItem.textContent = phrase.phrase;
                            
                            // 툴팁 추가
                            const tooltip = document.createElement('div');
                            tooltip.className = 'tooltip';
                            tooltip.innerHTML = `
                                <div class="tooltip-title">${phrase.phrase}</div>
                                <div class="tooltip-meaning">${phrase.meaning}</div>
                                <div class="tooltip-example">"${phrase.example}"</div>
                                <div class="tooltip-ko">${phrase.ko_meaning}</div>
                            `;
                            phraseItem.appendChild(tooltip);
                            
                            phraseList.appendChild(phraseItem);
                        });
                        
                        vocabularySection.appendChild(phraseList);
                    }
                    
                    paragraphContainer.appendChild(vocabularySection);
                }
                
                // 문체 분석 노트
                if (paragraph.style_note) {
                    const styleSection = document.createElement('div');
                    styleSection.className = 'style-section';
                    
                    const styleTitle = document.createElement('div');
                    styleTitle.className = 'section-title';
                    styleTitle.innerHTML = '<i class="fas fa-feather-alt"></i> 문체 분석';
                    styleSection.appendChild(styleTitle);
                    
                    const styleNote = document.createElement('div');
                    styleNote.className = 'style-note';
                    
                    const styleNoteEn = document.createElement('div');
                    styleNoteEn.className = 'style-note-en';
                    styleNoteEn.textContent = paragraph.style_note.en;
                    styleNote.appendChild(styleNoteEn);
                    
                    const styleNoteKo = document.createElement('div');
                    styleNoteKo.className = 'style-note-ko';
                    styleNoteKo.textContent = paragraph.style_note.ko;
                    styleNote.appendChild(styleNoteKo);
                    
                    styleSection.appendChild(styleNote);
                    paragraphContainer.appendChild(styleSection);
                }
                
                contentElement.appendChild(paragraphContainer);
            });
            
            // 토글 버튼 기능 설정
            setupToggleButtons();
            
            // 글자 크기 조절 기능 설정
            setupFontSizeControls();
            
            // 단어/숙어 하이라이트 클릭 이벤트 설정
            setupHighlightedItemsEvents();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('story-content').innerHTML = 
                `<p class="error">소설을 불러오는 데 문제가 발생했습니다: ${error.message}</p>`;
        });
});

// 오디오 재생 함수
function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
        console.error('오디오 재생 오류:', error);
        alert('오디오 파일을 재생할 수 없습니다.');
    });
}

// 토글 버튼 기능 설정
function setupToggleButtons() {
    // 단어/숙어 토글
    document.getElementById('toggle-vocabulary').addEventListener('click', function() {
        this.classList.toggle('active');
        const vocabularySections = document.querySelectorAll('.vocabulary-section');
        vocabularySections.forEach(section => {
            section.style.display = this.classList.contains('active') ? 'block' : 'none';
        });
    });
    
    // 문체 분석 토글
    document.getElementById('toggle-style-notes').addEventListener('click', function() {
        this.classList.toggle('active');
        const styleSections = document.querySelectorAll('.style-section');
        styleSections.forEach(section => {
            section.style.display = this.classList.contains('active') ? 'block' : 'none';
        });
    });
    
    // 한국어 번역 토글
    document.getElementById('toggle-translation').addEventListener('click', function() {
        this.classList.toggle('active');
        const koreanParagraphs = document.querySelectorAll('.paragraph-korean');
        koreanParagraphs.forEach(paragraph => {
            paragraph.style.display = this.classList.contains('active') ? 'block' : 'none';
        });
    });
}

// 글자 크기 조절 기능 설정
function setupFontSizeControls() {
    const englishParagraphs = document.querySelectorAll('.paragraph-english');
    const koreanParagraphs = document.querySelectorAll('.paragraph-korean');
    
    let currentSize = 100; // 기본 크기 (%)
    
    document.getElementById('increase-font').addEventListener('click', function() {
        if (currentSize < 150) { // 최대 150%
            currentSize += 10;
            updateFontSize();
        }
    });
    
    document.getElementById('decrease-font').addEventListener('click', function() {
        if (currentSize > 70) { // 최소 70%
            currentSize -= 10;
            updateFontSize();
        }
    });
    
    function updateFontSize() {
        englishParagraphs.forEach(paragraph => {
            paragraph.style.fontSize = `${currentSize}%`;
        });
        
        koreanParagraphs.forEach(paragraph => {
            paragraph.style.fontSize = `${currentSize}%`;
        });
    }
}

// 하이라이트된 단어/숙어 클릭 이벤트 설정
function setupHighlightedItemsEvents() {
    // 단어 클릭 이벤트
    document.querySelectorAll('.highlighted-word').forEach(word => {
        word.addEventListener('click', function() {
            const wordText = this.getAttribute('data-word');
            const paragraphId = this.closest('.paragraph-container').id;
            
            // 해당 단락의 단어 항목 찾기
            const vocabularyItem = document.querySelector(`#${paragraphId} .vocabulary-item[data-word="${wordText}"]`);
            if (vocabularyItem) {
                // 단어 항목으로 스크롤
                vocabularyItem.scrollIntoView({ behavior: 'smooth' });
                // 강조 효과
                vocabularyItem.classList.add('highlight-animation');
                setTimeout(() => {
                    vocabularyItem.classList.remove('highlight-animation');
                }, 2000);
            }
        });
    });
    
    // 숙어 클릭 이벤트
    document.querySelectorAll('.highlighted-phrase').forEach(phrase => {
        phrase.addEventListener('click', function() {
            const phraseText = this.getAttribute('data-phrase');
            const paragraphId = this.closest('.paragraph-container').id;
            
            // 해당 단락의 숙어 항목 찾기
            const phraseItem = document.querySelector(`#${paragraphId} .phrase-item[data-phrase="${phraseText}"]`);
            if (phraseItem) {
                // 숙어 항목으로 스크롤
                phraseItem.scrollIntoView({ behavior: 'smooth' });
                // 강조 효과
                phraseItem.classList.add('highlight-animation');
                setTimeout(() => {
                    phraseItem.classList.remove('highlight-animation');
                }, 2000);
            }
        });
    });
} 