// Scores class - assessment progress and final feedback.
// Challenge-related life/health and repair mechanics remain removed.

class Scores {
    constructor(ctx) {
        this.ctx = ctx;
        this.image_progress = null;
        this.imagesLoaded = false;

        this.experience_study_url =
            "https://qualtricsxmbx6typpy4.qualtrics.com/jfe/form/SV_3axBm9gDkmVGvSm";

        this.continue_study_rect = {
            x: CONFIG.WIDTH / 2 - 310,
            y: 455,
            width: 620,
            height: 78
        };

        loadImage(
            "PICS/Departaments/visited depa.png"
        ).then(progressImg => {
            const progressCanvas =
                document.createElement("canvas");

            progressCanvas.width = 132;
            progressCanvas.height = 90;

            const progressCtx =
                progressCanvas.getContext("2d");

            progressCtx.drawImage(
                progressImg,
                0,
                0,
                132,
                90
            );

            this.image_progress =
                progressCanvas;

            this.imagesLoaded = true;
        });

        this.completed_departments =
            new Set();

        this.total_correct_answers = 0;

        this.total_departments =
            (
                typeof Departments !==
                    "undefined" &&
                Departments
            )
                ? Departments.length
                : 5;

        // Attention checks are not stored in Departments, so max score stays 15.
        this.max_answers =
            (
                typeof Departments !==
                    "undefined" &&
                Departments
            )
                ? Departments.reduce(
                    (sum, department) =>
                        sum +
                        department.questions.length,
                    0
                )
                : 15;

        this.game = true;
        this.reached_planet = false;
        this.to_planet = false;
    }

    visited_departments() {
        if (!this.imagesLoaded) {
            return;
        }

        const count =
            this.completed_departments.size;

        this.ctx.fillStyle = "white";
        this.ctx.font =
            "42px Comicsansms, Arial";
        this.ctx.textAlign = "left";

        this.ctx.drawImage(
            this.image_progress,
            940,
            20
        );

        this.ctx.fillText(
            `${count}/${this.total_departments}`,
            1085,
            72
        );
    }

    finish() {
        if (this.reached_planet) {
            this._draw_win_text();
            this.game = false;
        }
    }

    _draw_win_text() {
        this.ctx.fillStyle = "white";
        this.ctx.font =
            "40px Comicsansms, Arial";
        this.ctx.textAlign = "center";

        this.ctx.fillText(
            "Mission completed! You successfully reached AIity",
            CONFIG.WIDTH / 2,
            320
        );

        this.ctx.font =
            "30px Comicsansms, Arial";

        this.ctx.fillText(
            `with a score of: ${this.total_correct_answers} / ${this.max_answers}`,
            CONFIG.WIDTH / 2,
            385
        );

        // Continue to the Experience Study
        this.ctx.fillStyle =
            "rgb(39, 44, 78)";

        this._drawRoundedRect(
            this.continue_study_rect.x,
            this.continue_study_rect.y,
            this.continue_study_rect.width,
            this.continue_study_rect.height,
            16
        );

        this.ctx.fill();

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;

        this._drawRoundedRect(
            this.continue_study_rect.x,
            this.continue_study_rect.y,
            this.continue_study_rect.width,
            this.continue_study_rect.height,
            16
        );

        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.font =
            "28px Comicsansms, Arial";
        this.ctx.textAlign = "center";

        this.ctx.fillText(
            "Continue with Experience Study:",
            CONFIG.WIDTH / 2,
            this.continue_study_rect.y +
                this.continue_study_rect.height / 2 +
                10
        );
    }

    handle_click(x, y) {
        if (
            this.reached_planet &&
            pointInRect(
                x,
                y,
                this.continue_study_rect
            )
        ) {
            window.location.href =
                this.experience_study_url;

            return true;
        }

        return false;
    }

    add_department_score(
        correct_answers
    ) {
        this.total_correct_answers +=
            correct_answers;
    }

    _drawRoundedRect(
        x,
        y,
        width,
        height,
        radius
    ) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(
            x + width - radius,
            y
        );
        this.ctx.quadraticCurveTo(
            x + width,
            y,
            x + width,
            y + radius
        );
        this.ctx.lineTo(
            x + width,
            y + height - radius
        );
        this.ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius,
            y + height
        );
        this.ctx.lineTo(
            x + radius,
            y + height
        );
        this.ctx.quadraticCurveTo(
            x,
            y + height,
            x,
            y + height - radius
        );
        this.ctx.lineTo(
            x,
            y + radius
        );
        this.ctx.quadraticCurveTo(
            x,
            y,
            x + radius,
            y
        );
        this.ctx.closePath();
    }
}
