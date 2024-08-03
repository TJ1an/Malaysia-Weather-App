import React from "react";
import {
  Card,
  CardBody,
  Text,
  CardHeader,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { format } from "date-fns";

function cards(props) {
  const formattedDate = format(new Date(props.date), "MMMM d, yyyy");
  return (
    <Card direction="column" alignItems={"left"} minWidth={"350px"}>
      <CardHeader>
        <Heading size="md">{formattedDate}</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          <span style={{ fontWeight: "bold" }}>🌄 Morning: </span>
          {props.morning_forecast}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>☀ Afternoon: </span>
          {props.afternoon_forecast}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>🌃 Night: </span>
          {props.night_forecast}
        </p>
      </CardBody>
      <CardBody>
      <p>
        <span style={{ fontWeight: "bold" }}>Minimum Temperature: </span>
        {props.min_temp}°C
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Maximum Temperature: </span>
        {props.max_temp}°C
      </p>
      </CardBody>
    </Card>
  );
}

export default cards;
