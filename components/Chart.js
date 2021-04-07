import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Button,
  HStack,
  Container,
  WrapItem,
  Wrap,
  Spacer,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import { Doughnut, HorizontalBar } from "react-chartjs-2";

const SinglesChart = ({
  doublesData,
  forehandWin,
  backhandWin,
  win,
  loss,
  backhandCount,
  forehandCount,
  doublesWins,
  doublesLosses,
}) => {
  let backhandPercentage = (backhandWin / doublesData.length) * 100;
  let forehandPercentage = (forehandWin / doublesData.length) * 100;

  console.log("percentage!", backhandPercentage);
  console.log("percentage!", forehandPercentage);

  const donutChart = {
    labels: ["Singles Wins", "Singles Losses"],
    datasets: [
      {
        data: [win, loss],
        backgroundColor: ["#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f"],
      },
    ],
  };

  const donutChartTwo = {
    labels: ["Doubles Wins", "Doubles Losses"],
    datasets: [
      {
        data: [doublesWins, doublesLosses],
        backgroundColor: ["#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f"],
      },
    ],
  };

  const donutChartThree = {
    labels: ["Forehand", "Backhand"],
    datasets: [
      {
        data: [forehandCount, backhandCount],
        backgroundColor: ["#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f"],
      },
    ],
  };

  const barChart = {
    labels: ["Forehand", "Backhand"],
    options: {
      plugins: {
          title: {
              display: true,
              text: 'Custom Chart Title'
          }
      }
  },
    datasets: [
      {
        label: "Percent Doubles Matches Won",
        data: [forehandPercentage, backhandPercentage],
        backgroundColor: ["#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Flex flexWrap="wrap">
        <Box>
          <Doughnut data={donutChart} />
        </Box>
        <Box>
          <Doughnut data={donutChartTwo} />
        </Box>
        <Box>
          <Doughnut data={donutChartThree} />
        </Box>
        <Box>
          <HorizontalBar data={barChart} />
        </Box>
      </Flex>
    </>
  );
};

export default SinglesChart;
