// Sound management.
// Challenge-related collision and healing sounds are removed.
class SoundManager {
    constructor() {
        this.backgroundMusic = document.getElementById("backgroundMusic");
        this.clickSound = document.getElementById("clickSound");
        this.musicPaused = false;
    }

    playMusic() {
        try {
            if (!this.backgroundMusic) {
                return Promise.resolve();
            }

            return this.backgroundMusic.play().catch(error => {
                return Promise.reject(error);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    pauseMusic() {
        if (this.backgroundMusic && !this.musicPaused) {
            this.backgroundMusic.pause();
            this.musicPaused = true;
        }
    }

    resumeMusic() {
        if (this.backgroundMusic && this.musicPaused) {
            this.backgroundMusic.play().catch(error => {
                console.log("Music resume failed:", error);
            });

            this.musicPaused = false;
        }
    }

    playClick() {
        if (!this.clickSound) return;

        try {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(() => {});
        } catch (error) {
            // Audio is optional and must not interrupt the assessment.
        }
    }
}
