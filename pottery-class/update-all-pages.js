// 모든 HTML 파일에 global-menu.js 스크립트를 추가하는 스크립트
const fs = require('fs');
const path = require('path');

// 디렉토리 내의 모든 파일을 재귀적으로 탐색하는 함수
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath, stat);
    }
  });
}

// HTML 파일인지 확인
function isHtmlFile(filePath) {
  return path.extname(filePath).toLowerCase() === '.html';
}

// 파일에서 메뉴 및 스크립트 제거하고 global-menu.js 추가
function updateHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 기존 메뉴 제거 (top-nav 클래스를 가진 nav 요소)
    content = content.replace(/<nav\s+class="top-nav"[\s\S]*?<\/nav>/i, '<!-- 기존 메뉴 제거됨 -->');
    
    // 기존 스크립트 제거 (모바일 메뉴와 다크 모드 관련 스크립트)
    const scriptRegex = /<script>\s*\/\/\s*모바일\s*메뉴[\s\S]*?<\/script>/i;
    content = content.replace(scriptRegex, '');
    
    // global-menu.js 스크립트 추가 (이미 있으면 추가하지 않음)
    if (!content.includes('global-menu.js')) {
      // 상대 경로 계산 (루트 기준 깊이에 따라)
      const depth = filePath.split(path.sep).length - 1;
      const relativePath = depth > 1 ? '../'.repeat(depth - 1) : '';
      
      const scriptTag = `\n    <!-- 전역 메뉴 스크립트 -->\n    <script src="${relativePath}global-menu.js"></script>\n`;
      
      // body 태그 닫기 전에 스크립트 추가
      content = content.replace('</body>', `${scriptTag}</body>`);
    }
    
    // 파일 저장
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`업데이트 완료: ${filePath}`);
    
    return true;
  } catch (error) {
    console.error(`파일 업데이트 실패 (${filePath}):`, error.message);
    return false;
  }
}

// 메인 함수
function main() {
  const rootDir = '.'; // 현재 디렉토리
  let updatedCount = 0;
  let failedCount = 0;
  
  walkDir(rootDir, (filePath) => {
    if (isHtmlFile(filePath)) {
      const success = updateHtmlFile(filePath);
      if (success) {
        updatedCount++;
      } else {
        failedCount++;
      }
    }
  });
  
  console.log(`\n작업 완료!`);
  console.log(`성공적으로 업데이트된 파일: ${updatedCount}`);
  console.log(`업데이트 실패한 파일: ${failedCount}`);
}

// 스크립트 실행
main(); 