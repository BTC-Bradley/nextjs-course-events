import React from "react";
import classes from "./event-content.module.css";

interface IEventContentProps {
  children: React.ReactNode;
}

function EventContent(props: IEventContentProps) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
