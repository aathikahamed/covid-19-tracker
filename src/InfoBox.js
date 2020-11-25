import React from "react";
import "./Infobox.css";
import { CardContent, Card, Typography } from "@material-ui/core";

function InfoBox({ title, cases, isRed, isActive, total, ...props }) {
  return (
    <Card
      className={`infoBox ${isActive && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent className="infoBox__content">
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total ? `Total: ${total.toLocaleString()}` : null}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
