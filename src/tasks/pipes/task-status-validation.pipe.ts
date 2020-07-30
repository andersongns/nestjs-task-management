import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../taskStatus.enum";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    private isStatusValid(status: any): boolean {
        return this.allowStatuses.indexOf(status) !== -1;
    }

    transform(value: string): string {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) { throw new BadRequestException(`${value} is an invalid status`) }
        return value;
    }

}