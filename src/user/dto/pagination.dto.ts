import { IsNotEmpty } from "class-validator";

export class PaginationQueryDTO {
    @IsNotEmpty()
    page: number;

    @IsNotEmpty()
    perPage: number;
}