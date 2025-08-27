import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodType, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));

        throw new BadRequestException({
          statusCode: 400,
          message: fromZodError(error).message,
          errors: formattedErrors,
        });
      }

      throw new BadRequestException("Validation failed");
    }

    return value;
  }
}
