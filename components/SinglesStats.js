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
import { Doughnut } from "react-chartjs-2";
import SinglesChart from "./Chart";

const SinglesStats = ({ data, doubles }) => {
  const [loading, setLoading] = useState(true);

  let winCount = 0;
  let lossCount = 0;
  let doublesWins = 0;
  let doublesLosses = 0;
  let forehandCount = 0;
  let backhandCount = 0;
  let forehandWin = 0
  let backhandWin = 0
  let switchWinFore = 0
  let switchLoseFore = 0
  let noSwitchWinFore = 0
  let noSwitchLoseFore = 0
  let switchWinBack = 0
  let switchLoseBack = 0
  let noSwitchWinBack = 0
  let noSwitchLoseBack = 0



  const countingWins = () => {
    return data.map((data, index) => {
      if (data.win) {
        winCount += 1;
      } else if (!data.win) {
        lossCount += 1;
      }
    });
  };

  const countingDoublesWins = () => {
    return doubles.map((data, index) => {
      if (data.win) {
        doublesWins += 1;
      } else if (!data.win) {
        doublesLosses += 1;
      }
    });
  };

  const countingHands = () => {
    return doubles.map((data, index) => {
      if (data.hand === "forehand") {
        forehandCount += 1;
      } else if (data.hand === "backhand") {
        backhandCount += 1;
      }
    });
  };

  const countingHandWins = () => {
    return doubles.map((data, index) => {
        if (data.hand === "forehand" && data.win ) {
          forehandWin += 1;
        } else if (data.hand === "backhand" && data.win) {
          backhandWin += 1;
        }
      });
  }

  const countingForehandSwitches = () => {
    return doubles.map((data, index) => {
      if (data.hand === "forehand" && data.change && data.win ) {
        switchWinFore += 1
      } else if (data.hand === "forehand" && data.change && !data.win) {
        switchLoseFore += 1
      } else if (data.hand === "forehand" && !data.change && data.win) {
        noSwitchWinFore += 1
      } else if (data.hand === "forehand" && !data.change && !data.win) {
        noSwitchLoseFore += 1
      }
    });
  }

  const countingBackhandSwitches = () => {
    return doubles.map((data, index) => {
      if (data.hand === "backhand" && data.switch && data.win ) {
        switchWinBack += 1
      } else if (data.hand === "backhand" && data.switch && !data.win) {
        switchLoseBack += 1
      } else if (data.hand === "backhand" && !data.switch && data.win) {
        noSwitchWinBack += 1
      } else if (data.hand === "backhand" && !data.switch && !data.win) {
        noSwitchLoseBack += 1
      }
    });
  }



  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      {countingWins()}
      {countingDoublesWins()}
      {countingHands()}
      {countingHandWins()}
      {countingBackhandSwitches()}
      {countingForehandSwitches()}
      {!loading && (
        <>
        <Box>
          <SinglesChart
            doublesData={doubles}
            win={winCount}
            loss={lossCount}
            doublesWins={doublesWins}
            doublesLosses={doublesLosses}
            forehandCount={forehandCount}
            backhandCount={backhandCount}
            forehandWin={forehandWin}
            backhandWin={backhandWin}
            switchWinFore = {switchWinFore}
            switchLoseFore = {switchLoseFore}
            noSwitchWinFore = {noSwitchWinFore}
            noSwitchLoseFore = {noSwitchLoseFore}
            switchWinBack = {switchWinBack}
            switchLoseBack = {switchLoseBack}
            noSwitchWinBack = {noSwitchWinBack}
            noSwitchLoseBack = {noSwitchLoseBack}
          />
        </Box>
        </>
      )}
    </>
  );
};

export default SinglesStats;
