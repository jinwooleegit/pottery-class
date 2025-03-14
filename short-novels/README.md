# 단편 소설 모음 (Short Novels Collection)

이 프로젝트는 시간을 초월한 감동과 깊이 있는 통찰을 선사하는 세계 문학 단편선을 인터랙티브한 웹 형식으로 제공합니다.

## 프로젝트 구조

```
short-novels/
├── README.md                # 프로젝트 소개
├── index.html              # 메인 페이지 (소설 목록)
├── styles/                 # 공통 스타일
│   ├── main.css           # 메인 스타일
│   └── story.css          # 소설 페이지용 스타일
├── scripts/               # 공통 자바스크립트
│   ├── main.js           # 메인 페이지 스크립트
│   └── story.js          # 소설 페이지용 스크립트
└── stories/              # 각 소설별 디렉토리
    ├── the-last-leaf/    # 마지막 잎새
    │   ├── index.html    # 소설 내용
    │   └── images/       # 소설별 이미지
    └── [other-stories]/  # 다른 소설들
```

## 새로운 소설 추가하기

1. `stories` 디렉토리 아래에 새로운 소설을 위한 디렉토리를 생성합니다.
   ```bash
   mkdir stories/new-story
   mkdir stories/new-story/images
   ```

2. 소설의 `index.html` 파일을 생성하고 다음 구조를 따릅니다:
   ```html
   <!DOCTYPE html>
   <html lang="ko">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>소설 제목 - 단편 소설 모음</title>
       <link rel="stylesheet" href="../../styles/story.css">
   </head>
   <body>
       <!-- 기본 구조는 마지막 잎새 예제 참고 -->
       <script src="../../scripts/story.js"></script>
   </body>
   </html>
   ```

3. 메인 페이지의 소설 목록에 새 소설을 추가합니다:
   ```html
   <article class="story-card">
       <img src="path/to/cover-image" alt="소설 제목">
       <div class="story-info">
           <h2 class="story-title">소설 제목</h2>
           <p class="story-author">작가 이름</p>
           <p class="story-excerpt">소설 요약...</p>
           <a href="stories/new-story/" class="read-more">읽기</a>
       </div>
   </article>
   ```

## 특징

- 반응형 디자인
- 인터랙티브한 읽기 경험
- 다국어 지원 (한국어/영어)
- 시각적 효과 (비, 낙엽 등)
- 진행 상태 표시
- 분위기 전환 효과

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- 외부 라이브러리 없이 순수 웹 기술만 사용

## 라이선스

이 프로젝트의 코드는 MIT 라이선스 하에 제공됩니다.
각 소설의 저작권은 해당 작품의 저작권 규정을 따릅니다. 