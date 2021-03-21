import {useEffect, useState} from 'react'
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
import { Doughnut } from 'react-chartjs-2';

const SinglesChart = ({win, loss, backhandCount, forehandCount, doublesWins, doublesLosses}) => {
    
    const donutChart = {
        labels: [
            'Singles Wins',
            'Singles Losses'
        ],
        datasets: [{
            data:[win, loss],
            backgroundColor: [
                '#008566',
                '#C6ED2C'
            ],
            hoverBackgroundColor: [
                '#00a67f',
                '#dfff4f'
            ]
        }]
    };

    const donutChartTwo = {
        labels: [
            'Doubles Wins',
            'Doubles Losses'
        ],
        datasets: [{
            data:[doublesWins, doublesLosses],
            backgroundColor: [
                '#008566',
                '#C6ED2C'
            ],
            hoverBackgroundColor: [
                '#00a67f',
                '#dfff4f'
            ]
        }]
    };

    const donutChartThree = {
        labels: [
            'Forehand',
            'Backhand'
        ],
        datasets: [{
            data:[backhandCount, forehandCount],
            backgroundColor: [
                '#008566',
                '#C6ED2C'
            ],
            hoverBackgroundColor: [
                '#00a67f',
                '#dfff4f'
            ]
        }]
    };


    return(
        <>
        <Flex flexWrap="wrap">
            <Box>
                <Doughnut data={donutChart}/>
            </Box>
            <Box>
                <Doughnut data={donutChartTwo}/>
            </Box>
            <Box>
                <Doughnut data={donutChartThree}/>
            </Box>
            </Flex>
   
            </>
    )
}


export default SinglesChart
