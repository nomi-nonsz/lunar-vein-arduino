import { Board } from "johnny-five";
import { run } from "./server";
import { defaultBoardOption, suBoard } from "./setup";

suBoard.board = new Board(defaultBoardOption);

run();