const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology:", true);
// MongoDB 스키마 생성
const PuzzleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  value: { type: Number, required: true },
  flip: { type: Boolean, required: true },
});

const Puzzle = mongoose.model("Puzzle", PuzzleSchema);
export default Puzzle;
