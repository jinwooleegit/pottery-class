# 도예 교육과정 웹사이트 - 네비게이션 업데이트

이 디렉토리는 도예 교육과정 웹사이트의 네비게이션을 전역적으로 업데이트하기 위한 파일들을 포함하고 있습니다.

## 주요 파일

- `global-menu.js`: 모든 페이지에 동적으로 메뉴를 추가하는 스크립트
- `create-symlinks.js`: 하위 디렉토리에 global-menu.js의 심볼릭 링크를 생성하는 스크립트
- `update-all-pages.js`: 모든 HTML 파일에서 기존 메뉴를 제거하고 global-menu.js를 추가하는 스크립트

## 사용 방법

### 1. 개별 페이지에 메뉴 추가하기

각 HTML 파일의 body 태그 닫기 전에 global-menu.js 스크립트를 추가합니다:

루트 페이지 (index.html, chapter1.html 등):
```html
<script src="global-menu.js"></script>
```

하위 페이지 (chapter4/week1.html 등):
```html
<script src="../global-menu.js"></script>
```

### 2. 심볼릭 링크 생성하기 (선택 사항)

Node.js가 설치되어 있어야 합니다.

```bash
node create-symlinks.js
```

이 스크립트는 chapter1~chapter6 디렉토리에 global-menu.js에 대한 심볼릭 링크를 생성합니다.

### 3. 모든 페이지 자동 업데이트하기

모든 HTML 파일에서 기존 메뉴를 제거하고 global-menu.js를 추가하려면:

```bash
node update-all-pages.js
```

## 메뉴 구성 변경하기

메뉴 구성을 변경하려면 `global-menu.js` 파일의 `menuHTML` 변수를 수정하세요.

## 이점

- 중앙 집중식 관리: 모든 페이지의 메뉴를 한 곳에서 관리
- 일관성: 모든 페이지가 동일한 메뉴 구조와 스타일 사용
- 유지보수 용이성: 메뉴 변경 시 global-menu.js 파일만 수정하면 모든 페이지에 반영
- 자동 경로 조정: 페이지 위치에 따라 자동으로 링크 경로 조정 