// 하위 디렉토리에 global-menu.js 심볼릭 링크 생성하는 스크립트
const fs = require('fs');
const path = require('path');

// 심볼릭 링크를 생성할 디렉토리 리스트
const directories = [
  'chapter1',
  'chapter2',
  'chapter3',
  'chapter4',
  'chapter5',
  'chapter6'
];

// 각 디렉토리에 심볼릭 링크 생성
directories.forEach(dir => {
  // 디렉토리가 존재하는지 확인
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    const targetPath = path.join('..', 'global-menu.js');
    const linkPath = path.join(dir, 'global-menu.js');
    
    // 이미 존재하는 링크 삭제
    if (fs.existsSync(linkPath)) {
      fs.unlinkSync(linkPath);
    }
    
    // 심볼릭 링크 생성
    try {
      fs.symlinkSync(targetPath, linkPath, 'file');
      console.log(`심볼릭 링크 생성 완료: ${linkPath} -> ${targetPath}`);
    } catch (error) {
      console.error(`심볼릭 링크 생성 실패 (${dir}):`, error.message);
    }
  } else {
    console.log(`디렉토리를 찾을 수 없음: ${dir}`);
  }
});

console.log('모든 디렉토리에 심볼릭 링크 생성 프로세스 완료'); 