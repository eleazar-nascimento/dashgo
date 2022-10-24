import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Header from "../components/Header";
import Sidebar from "../components/Siderbar/Sidebar";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function Dashboard() {
  const options = {
    chart: {
      tollbar: {
        show: false,
      },
      zoom: {
        enable: false,
      },
      forColor: theme.colors.gray[500]
    },
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: [
        '2022-08-18T00:00:00.000Z',
        '2022-08-19T00:00:00.000Z',
        '2022-08-20T00:00:00.000Z',
        '2022-08-21T00:00:00.000Z',
        '2022-08-22T00:00:00.000Z',
        '2022-08-23T00:00:00.000Z',
        '2022-08-24T00:00:00.000Z',
      ]
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  };

  const series = [
    { name: 'series1', data: [31, 120, 10 , 28, 51, 109] }
  ];

    return (
        <Flex direction="column" h="100vh">
            <Header/>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box
              p="8"
              bg="gray.800"
              borderRadius={8}
              pb="4"
            > 
              <Text fontSize="lg" mb="4">Inscritos da semana</Text>
              <Chart options={options} series={series} type="area" height={160} />
            </Box>
            <Box
              p="8"
              bg="gray.800"
              borderRadius={8}
              pb="4"
            > 
              <Text fontSize="lg" mb="4">Taxa de abertura</Text>
              <Chart options={options} series={series} type="area" height={160} />
            </Box>
          </SimpleGrid>
        </Flex>
        </Flex>
    );
}