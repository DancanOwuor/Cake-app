import { Schema, model, models} from "mongoose";

const CakeSchema = new Schema(
    {
        "name": {type: String, required:true},
        "description": {type: String, required: true },
        "price": {type: Number, required: true},
        "imageUrl": {type: String}
    },

    {
        timestamps: true
    }
);

const Cake = models.Cake || model("Cake", CakeSchema);
export default Cake

