// Events system - department timing and planet arrival.
// Challenge-related mechanics (asteroids/comets, healing keys and lives) are removed.
class EventsManager {
    constructor() {
        this.Department_fly_in = null;
        this.AIity_fly_in = null;
        this.Departments_between_time_distance = 6000;
        this.AIity_delay = 3000;
        this.Total_departments = Departments.length;
    }

    init_events() {
        if (this.Department_fly_in) clearTimeout(this.Department_fly_in);
        if (this.AIity_fly_in) clearTimeout(this.AIity_fly_in);

        this.Department_fly_in = null;
        this.AIity_fly_in = null;

        // First department appears after 12 seconds.
        this.Department_fly_in = setTimeout(() => {
            if (
                window.game &&
                window.game.state === "game" &&
                !window.game.scores.to_planet
            ) {
                window.game.spawnDepartment();
            }
        }, this.Departments_between_time_distance);
    }

    pause_timers() {
        if (this.Department_fly_in) clearTimeout(this.Department_fly_in);
        if (this.AIity_fly_in) clearTimeout(this.AIity_fly_in);

        this.Department_fly_in = null;
        this.AIity_fly_in = null;
    }

    resume_after_quiz(scores) {
        // Continue department sequence only while the player is still
        // completing the five AIity departments.
        if (!scores.to_planet) {
            if (this.Department_fly_in) {
                clearTimeout(this.Department_fly_in);
            }

            this.Department_fly_in = setTimeout(() => {
                if (
                    window.game &&
                    window.game.state === "game" &&
                    !window.game.scores.to_planet
                ) {
                    window.game.spawnDepartment();
                }
            }, this.Departments_between_time_distance);
        }
    }

    schedule_planet_spawn() {
        if (this.AIity_fly_in) {
            clearTimeout(this.AIity_fly_in);
        }

        this.AIity_fly_in = setTimeout(() => {
            if (
                window.game &&
                window.game.state === "game" &&
                window.game.scores.to_planet &&
                window.game.planets.length === 0
            ) {
                window.game.spawnPlanet();
            }
        }, this.AIity_delay);
    }

    static collide_with_planet(hero, planets, scores) {
        if (!scores.to_planet) return false;

        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];

            if (rectCollide(hero.hitbox, planet.hitbox)) {
                scores.reached_planet = true;
                planets.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}
