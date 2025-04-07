import { z } from "zod";

function textValidation(value: string) {
  value = value.trim();
  if (value.length > 0) {
    return true;
  } else {
    return false;
  }
}
export const checkAndValidateText = (maxLength?: number) => 
  z
    .string()
    .max(maxLength ?? Number.MAX_SAFE_INTEGER, {
      message: `Text must be less than ${maxLength ?? Number.MAX_SAFE_INTEGER} characters`,
    })
    .min(1, {
      message: 'Text must be at least 1 character',
    })
    .refine((value) => textValidation(value), {
      message: 'Text is required',
    });

export type TextSchema = z.infer<ReturnType<typeof checkAndValidateText>>;
