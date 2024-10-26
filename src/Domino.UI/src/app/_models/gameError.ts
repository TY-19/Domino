import { ErrorType } from "../_enums/errorType";

export interface GameError {
    type: ErrorType;
    message?: string;
    data: Record<string, string>;
}
