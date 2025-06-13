// We import the mongoose module, which is used to interact with MongoDB databases.
import mongoose from "mongoose";

// We extract the necessary objects from mongoose:
// - model: to define new data models.
// - models: to access previously defined models.
// - Schema: to define the structure of documents in a collection.
const { model, models, Schema } = mongoose;

const Character_Schema = new Schema(
  {
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true },
    Image_Real: { type: String, required: true },
    User_Id: { type: String, required: true },
  },
  {
    collection: "Characters", // Name of the collection in the database
    versionKey: false,
    timestamps: true, // Automatically adds created and updated timestamps
  }
);

// We export the `Mongo_Character` model:
// - If a model named "Mongo_Character" already exists in `models`, we reuse it.
// - If it does not exist, we create a new model with the `Character_Schema` schema.
export const Mongo_Character = models.Mongo_Character || model("Mongo_Character", Character_Schema);