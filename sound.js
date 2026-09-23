// Sound management for KiKoGame No-Challenge.
// Background music starts with Assessment Rules.
// Department click sound is replayed reliably on EVERY department click.

class SoundManager {
    constructor() {
        this.backgroundMusic = document.getElementById("backgroundMusic");
        this.clickSound = document.getElementById("clickSound");
        this.musicPaused = false;

        if (this.backgroundMusic) {
            this.backgroundMusic.preload = "auto";
            this.backgroundMusic.volume = 1.0;
            this.backgroundMusic.load();
        }

        if (this.clickSound) {
            this.clickSound.preload = "auto";
            this.clickSound.volume = 1.0;
            this.clickSound.load();
        }
    }

    playMusic() {
        if (!this.backgroundMusic) {
            return Promise.resolve();
        }

        try {
            this.backgroundMusic.volume = 1.0;

            return this.backgroundMusic.play().catch(error => {
                console.log("Background music could not start:", error);
                return Promise.reject(error);
            });
        } catch (error) {
            console.log("Background music error:", error);
            return Promise.reject(error);
        }
    }

    pauseMusic() {
        if (this.backgroundMusic && !this.backgroundMusic.paused) {
            this.backgroundMusic.pause();
        }

        this.musicPaused = true;
    }

    resumeMusic() {
        if (!this.backgroundMusic) {
            return;
        }

        if (this.musicPaused || this.backgroundMusic.paused) {
            this.backgroundMusic.play().catch(error => {
                console.log("Music resume failed:", error);
            });

            this.musicPaused = false;
        }
    }

    playClick() {
        if (!this.clickSound) {
            console.warn("Department click sound element was not found.");
            return;
        }

        try {
            // Always restart the SAME preloaded audio element from the beginning.
            // This makes the department sound work for department 1, 2, 3, 4 and 5.
            this.clickSound.pause();
            this.clickSound.currentTime = 0;
            this.clickSound.volume = 1.0;

            const playPromise = this.clickSound.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn(
                        "Department click sound could not be played:",
                        error
                    );
                });
            }
        } catch (error) {
            console.warn(
                "Department click sound error:",
                error
            );
        }
    }
}
