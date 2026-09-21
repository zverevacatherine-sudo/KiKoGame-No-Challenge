// Scores class - assessment progress and final feedback.
// Challenge-related life/health and repair mechanics are removed.
class Scores {
    constructor(ctx) {
        this.ctx = ctx;
        this.image_progress = null;
        this.imagesLoaded = false;

        // Only the department progress icon is needed in this condition.
        loadImage("PICS/Departaments/visited depa.png").then(progressImg => {
            const progressCanvas = document.createElement("canvas");
            progressCanvas.width = 132;
            progressCanvas.height = 90;

            const progressCtx = progressCanvas.getContext("2d");
            progressCtx.drawImage(progressImg, 0, 0, 132, 90);

            this.image_progress = progressCanvas;
            this.imagesLoaded = true;
        });

        this.completed_departments = new Set();
        this.total_correct_answers = 0;

        this.total_departments =
            (typeof Departments !== "undefined" && Departments)
                ? Departments.length
                : 5;

        this.max_answers =
            (typeof Departments !== "undefined" && Departments)
                ? Departments.reduce(
                    (sum, department) => sum + department.questions.length,
                    0
                )
                : 15;

        this.game = true;
        this.reached_planet = false;
        this.to_planet = false;
    }

    visited_departments() {
        if (!this.imagesLoaded) return;

        const count = this.completed_departments.size;

        this.ctx.fillStyle = "white";
        this.ctx.font = "42px Comicsansms, Arial";
        this.ctx.textAlign = "left";

        this.ctx.drawImage(this.image_progress, 940, 20);
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
        this.ctx.font = "40px Comicsansms, Arial";
        this.ctx.textAlign = "left";

        this.ctx.fillText(
            "Mission completed! You successfully reached AIity",
            130,
            330
        );

        this.ctx.font = "30px Comicsansms, Arial";

        this.ctx.fillText(
            `with a score of: ${this.total_correct_answers} / ${this.max_answers}`,
            130,
            400
        );
    }

    add_department_score(correct_answers) {
        this.total_correct_answers += correct_answers;
    }
}
