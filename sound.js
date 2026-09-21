// Sound management for KiKoGame No-Challenge.
// Keeps background music and the department click sound.
// Challenge-related collision and healing sounds remain removed.

class SoundManager {
    constructor() {
        this.backgroundMusic = document.getElementById("backgroundMusic");
        this.clickSound = document.getElementById("clickSound");
        this.musicPaused = false;

        // Prepare audio as early as possible.
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
            /*
             * Use a fresh copy for every department click.
             * This avoids problems when the same audio element is restarted
             * quickly and makes the sound independent of background music.
             */
            const sound = this.clickSound.cloneNode(true);
            sound.volume = 1.0;
            sound.preload = "auto";

            const playPromise = sound.play();

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
