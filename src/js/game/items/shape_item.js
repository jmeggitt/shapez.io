import { DrawParameters } from "../../core/draw_parameters";
import { types } from "../../savegame/serialization";
import { BaseItem } from "../base_item";
import { ShapeDefinition } from "../shape_definition";
import { THEME } from "../theme";

export class ShapeItem extends BaseItem {
    static getId() {
        return "shape";
    }

    static getSchema() {
        return types.structured({
            definition: types.knownType(ShapeDefinition),
            melted: types.bool,
        });
    }

    // serialize() {
    //     return this.definition.getHash();
    // }

    deserialize(data) {
        try {
            super.deserialize(data);
        } catch (e) {
            // Old serialization method was used for this save
            this.definition = ShapeDefinition.fromShortKey(data);
        }
    }

    /**
     * @param {ShapeDefinition} definition
     */
    constructor(definition) {
        super();
        // logger.log("New shape item for shape definition", definition.generateId(), "created");

        /**
         * This property must not be modified on runtime, you have to clone the class in order to change the definition
         */
        this.definition = definition;
    }

    getBackgroundColorAsResource() {
        return THEME.map.resources.shape;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {DrawParameters} parameters
     * @param {number=} size
     */
    draw(x, y, parameters, size) {
        this.definition.draw(x, y, parameters, size);
    }
}
