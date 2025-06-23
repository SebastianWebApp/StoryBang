// We import the mongoose module, which is used to interact with MongoDB databases.
import mongoose from "mongoose";

// We extract the necessary objects from mongoose:
// - model: to define new data models.
// - models: to access previously defined models.
// - Schema: to define the structure of documents in a collection.
const { model, models, Schema } = mongoose;

const Story_Schema = new Schema(
  {
    Content: { type: JSON, required: true }, 
    Id: {type: String, required: true}   
  },
  {
    collection: "Story", // Name of the collection in the database
    versionKey: false,
    timestamps: true, // Automatically adds created and updated timestamps
  }
);

// We export the `Mongo_Character` model:
// - If a model named "Mongo_Character" already exists in `models`, we reuse it.
// - If it does not exist, we create a new model with the `Character_Schema` schema.
export const Mongo_Story = models.Mongo_Story || model("Mongo_Story", Story_Schema);