import { CONTENT_A } from "./content-a";
import { CONTENT_B } from "./content-b";
import { CONTENT_C } from "./content-c";

export interface ToolContent {
  how: string[];
  faqs: { q: string; a: string }[];
}

export const CONTENT: Record<string, ToolContent> = {
  ...CONTENT_A,
  ...CONTENT_B,
  ...CONTENT_C,
};
