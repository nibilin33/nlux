import { ReactElement } from "react";
import { Greeting } from "./elements/Greeting";
import { Loader } from "./elements/Loader";
import { Tool, ToolBottom, CancelButton } from "./elements/Tool";

export type AiChatUIOverrides = {
  Loader: ReactElement;
  Greeting?: ReactElement;
  Tool?: ReactElement;
  ToolBottom?: ReactElement;
  CancelButton?: ReactElement;
};

/**
 * Wrapper for possible UI components that can be overridden in the default NLUX chat components.
 */
export const AiChatUI = {
  Loader,
  Greeting,
  Tool,
  ToolBottom,
  CancelButton,
};
