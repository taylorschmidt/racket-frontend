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
  switchWinFore,
  noSwitchWinFore,
  switchLoseFore,
  noSwitchLoseFore,
  switchWinBack,
  noSwitchWinBack,
  switchLoseBack,
  noSwitchLoseBack
}) => {

  const percentage = (data) => {
    return (data / doublesData.length) * 100
  }


  let backhandPercentage = (backhandWin / doublesData.length) * 100;
  let forehandPercentage = (forehandWin / doublesData.length) * 100;
  let switchWinForePercentage = percentage(switchWinFore)
  let noSwitchWinForePercentage = percentage(noSwitchWinFore)
  let switchLostForePercentage = percentage(switchLoseFore)
  let noSwitchLoseForePercentage = percentage(noSwitchLoseFore)
  let switchWinBackPercentage = percentage(switchWinBack)
  let noSwitchWinBackPercentage = percentage(noSwitchWinBack)
  let switchLostBackPercentage = percentage(switchLoseBack)
  let noSwitchLoseBackPercentage = percentage(noSwitchLoseBack)


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

  const barChartSwitchFore = {
    labels: ["Switched and Won", "Switched and Lost", "Didn't Switch and Won", "Didn't Switch and Lost"],
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
        label: "Percent of Matches Starting Forehand",
        data: [switchWinForePercentage, switchLostForePercentage, noSwitchWinForePercentage, noSwitchLoseForePercentage],
        backgroundColor: ["#008566", "#C6ED2C", "#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f", "#00a67f", "#dfff4f"],
        borderWidth: 2,
      },
    ],
  };
  const barChartSwitchBack = {
    labels: ["Switched and Won", "Switched and Lost", "Didn't Switch and Won", "Didn't Switch and Lost"],
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
        label: "Percent of Matches Starting Backhand",
        data: [switchWinBackPercentage, switchLostBackPercentage, noSwitchWinBackPercentage, noSwitchLoseBackPercentage],
        backgroundColor: ["#008566", "#C6ED2C", "#008566", "#C6ED2C"],
        hoverBackgroundColor: ["#00a67f", "#dfff4f", "#00a67f", "#dfff4f"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
    <Center>
      <Flex flexWrap="wrap" justifyContent="center">
     
        <Box m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <Doughnut data={donutChart} />
        </Box>
       
        <Box m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <Doughnut data={donutChartTwo} />
        </Box>
    
        <Box m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <Doughnut data={donutChartThree} />
        </Box>
  
        <Box   m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <HorizontalBar data={barChart} />
        </Box>
        <Box   m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <HorizontalBar data={barChartSwitchFore} />
        </Box>
        <Box   m={1} boxShadow="md" p="6" rounded="md" bg="#f7f5f5">
          <HorizontalBar data={barChartSwitchBack} />
        </Box>
      </Flex>
      </Center>
    </>
  );
};

export default SinglesChart;
