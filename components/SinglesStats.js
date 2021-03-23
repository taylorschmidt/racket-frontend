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
            
          />
        </Box>
        </>
      )}
    </>
  );
};

export default SinglesStats;
