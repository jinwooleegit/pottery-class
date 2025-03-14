class StoryManager {
    constructor() {
        this.sections = document.querySelectorAll('.story-section');
        this.currentSection = 0;
        this.totalSections = this.sections.length;
        this.progressFill = document.querySelector('.progress-fill');
        this.rainOverlay = document.querySelector('.rain-overlay');
        this.moodIndicator = document.querySelector('.mood-indicator');
        this.prevButton = document.getElementById('prevButton');
        this.nextButton = document.getElementById('nextButton');

        this.init();
    }

    init() {
        // 첫 번째 섹션 보이기
        this.sections[0].classList.add('visible');
        this.updateProgress();
        this.updateButtons();

        // 이벤트 리스너 설정
        this.setupEventListeners();
    }

    updateProgress() {
        const progress = ((this.currentSection + 1) / this.totalSections) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    updateMood(section) {
        const moods = {
            0: "평온",
            1: "불안",
            2: "걱정",
            3: "절망",
            4: "긴장",
            5: "결단",
            6: "기대",
            7: "희망",
            8: "슬픔",
            9: "감동"
        };
        this.moodIndicator.textContent = `현재 분위기: ${moods[section] || "평온"}`;
    }

    showRain(show) {
        this.rainOverlay.style.display = show ? 'block' : 'none';
    }

    createFallingLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(leaf);

        let posY = -20;
        let posX = parseFloat(leaf.style.left);
        const speed = 1 + Math.random();
        const rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 2;

        const animateLeaf = () => {
            posY += speed;
            posX += Math.sin(posY / 50) * 2;
            leaf.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation + posY * rotationSpeed}deg)`;

            if (posY < window.innerHeight + 20) {
                requestAnimationFrame(animateLeaf);
            } else {
                leaf.remove();
            }
        };

        animateLeaf();
    }

    updateButtons() {
        this.prevButton.style.display = this.currentSection === 0 ? 'none' : 'block';
        this.nextButton.style.display = this.currentSection === this.sections.length - 1 ? 'none' : 'block';
    }

    updateChoiceContainer(section) {
        const choiceContainer = this.sections[section].querySelector('.choice-container');
        if (choiceContainer) {
            choiceContainer.style.display = 'block';
        }
    }

    showSection(index) {
        this.sections[this.currentSection].classList.remove('visible');
        this.currentSection = index;
        this.sections[this.currentSection].classList.add('visible');
        this.updateButtons();
        this.updateProgress();
        this.updateMood(this.currentSection);
        this.updateChoiceContainer(this.currentSection);

        // 특별 효과
        if (this.currentSection === 4 || this.currentSection === 5) { // 폭풍우 장면
            this.showRain(true);
        } else {
            this.showRain(false);
        }

        if (this.currentSection === 2 || this.currentSection === 3) { // 잎이 떨어지는 장면
            setInterval(() => this.createFallingLeaf(), 2000);
        }
    }

    setupEventListeners() {
        // 이전/다음 버튼
        this.prevButton.addEventListener('click', () => {
            if (this.currentSection > 0) {
                this.showSection(this.currentSection - 1);
            }
        });

        this.nextButton.addEventListener('click', () => {
            if (this.currentSection < this.sections.length - 1) {
                this.showSection(this.currentSection + 1);
            }
        });

        // 선택지 버튼
        document.querySelectorAll('.choice-button').forEach(button => {
            button.addEventListener('click', () => {
                const nextSection = button.dataset.next;
                const nextIndex = Array.from(this.sections).findIndex(section => section.id === nextSection);
                if (nextIndex !== -1) {
                    this.showSection(nextIndex);
                }
            });
        });

        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && this.currentSection < this.sections.length - 1) {
                this.showSection(this.currentSection + 1);
            } else if (e.key === 'ArrowLeft' && this.currentSection > 0) {
                this.showSection(this.currentSection - 1);
            }
        });

        // 다시 읽기 버튼
        document.querySelector('.restart-button')?.addEventListener('click', () => {
            this.showSection(0);
            this.showRain(false);
        });
    }
}

// DOM이 로드되면 StoryManager 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    new StoryManager();
}); 