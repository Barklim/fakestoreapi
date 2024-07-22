// TODO: decide to use classnames, modules or css-in-js
export const boxShadow = "rgba(26, 32, 44, 0.3)";
export const darkBg = "#1a202c";

export type ColorMode = ColorModeEnum.Light | ColorModeEnum.Dark;
export enum ColorModeEnum {
  Light = "light",
  Dark = "dark",
}
export const light = ColorModeEnum.Light
