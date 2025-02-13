import { object, string } from "zod";

export const urlValidator = object({
  url: string({
    required_error: "URL is required",
    invalid_type_error: "URL must be a string",
  })
    .trim()
    .url({ message: "It must be a valid URL" }),
}, { required_error: "You need to provide a URL to print" });
