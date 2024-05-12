"use client";

import { ButtonHTMLAttributes, FC } from "react";
import { ButtonContainer } from "./style";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgcolor?: string | undefined;
  isdisabled?: boolean | undefined;
}
export const Button: FC<IProps> = (props) => {
  return (
    <ButtonContainer
      {...props}
      $bgcolor={props.bgcolor}
      disabled={props.isdisabled}
    />
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
