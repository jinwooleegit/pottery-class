// 모든 주차 페이지에서 중복되는 "장 홈으로" 버튼을 제거하는 스크립트
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

// 주차 페이지인지 확인 (chapter*/week*.html 패턴)
function isWeekPage(filePath) {
  return path.extname(filePath).toLowerCase() === '.html' &&
         filePath.includes('/week') &&
         filePath.includes('/chapter');
}

// 중복 네비게이션 버튼 수정
function fixNavigation(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // "장 홈으로" 버튼 제거 패턴
    const homeButtonPattern = /<a href="\.\.\/chapter\d+\.html" class="nav-link home"[^>]*>장 홈으로<\/a>/;
    
    // 변경 전 검사
    if (content.match(homeButtonPattern)) {
      console.log(`수정 중: ${filePath}`);
      
      // "장 홈으로" 버튼 제거
      content = content.replace(homeButtonPattern, '');
      
      // 파일 저장
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`파일 수정 오류 (${filePath}):`, error.message);
    return false;
  }
}

// 메인 함수
function main() {
  const rootDir = '.'; // 현재 디렉토리
  let modifiedCount = 0;
  
  walkDir(rootDir, (filePath) => {
    if (isWeekPage(filePath)) {
      const modified = fixNavigation(filePath);
      if (modified) {
        modifiedCount++;
      }
    }
  });
  
  console.log(`\n중복 네비게이션 버튼 수정 완료!`);
  console.log(`수정된 파일 수: ${modifiedCount}`);
}

// 스크립트 실행
main(); 