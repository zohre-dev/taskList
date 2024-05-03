"use client";

import { ButtonHTMLAttributes, FC } from "react";
import { ButtonContainer } from "./style";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string | undefined;
  isDisabled?: boolean;
}
export const Button: FC<IProps> = (props) => {
  return (
    <ButtonContainer $bgColor={props.bgColor} disabled={props.isDisabled} />
  );
};

{
  /* <ButtonContainer
disabled={false}
title="clickMe"
onClick={() => console.log("hi")}
{...props}
$bgColor={props.bgColor}
/> */
}
