import { Component } from "../component";
import { types } from "../../savegame/serialization";

export class HealthComponent extends Component {
    static getId() {
        return "Health";
    }

    static getSchema() {
        return types.structured({
            health: types.float,
            maxHealth: types.float,
        });
    }

    /**
     * @param {object} param0
     * @param {number} param0.maxHealth Where to render belt underlays
     */
    constructor({ maxHealth = 100 }) {
        super();

        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }
}
