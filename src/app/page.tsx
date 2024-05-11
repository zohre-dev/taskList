"use client";
import { Button } from "@/components/Button";
import { TaskList } from "@/components/TaskList";
// import { useAppContext } from "@/context";

import Image from "next/image";

//  #0a1629;
//  #91929e;
//  #713fff;
//  #0ac947;
//  #ffbd21;
//  #f73446;

export default function Home() {
  // const { dispatch, values } = useAppContext();

  // const handleOpen = () => {
  //   dispatch.setOpenModal(true);
  // };

  // const showOpen = () => {
  //   const valu = values.open;
  //   console.log(valu);
  // };
  return (
    <>
      {/* <button onClick={handleOpen}>Open</button>
      <button onClick={showOpen}>show</button> */}
      <TaskList />
    </>
  );
}
