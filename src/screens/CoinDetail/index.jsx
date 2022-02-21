import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
} from "@rainbow-me/animated-charts";
import { LineChart, LineChartProvider } from "react-native-wagmi-charts";
import styles from "./styles";
import CoinDetailHeader from "./../../components/CoinDetail/Header";
import CoinPriceInfo from "./../../components/CoinDetail/PriceInfo";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "./../../services/requests";
import Filter from "../../components/CoinDetail/Filter";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];
export default function CoinDetail() {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1");
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const fetchCoinData = async () => {
    setIsLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setIsLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
  }, []);

  const handlerSelectedRange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  //fix rerender
  const memoOnSelectedRangeChange = React.useCallback(
    (range) => handlerSelectedRange(range),
    []
  );

  const screenWidth = Dimensions.get("window").width;

  if (isLoading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }
  const {
    id,
    image: { small },
    symbol,
    name,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  const { prices } = coinMarketData;
  const chartChangedColor =
    current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const handleChangeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };
  const handleChangeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <ChartPathProvider
        data={{
          // points: prices.map((price) => ({ x: price[0], y: price[1] })),
          points: prices.map(([x, y]) => ({ x, y })),
          // smoothingStrategy: "bezier",
        }}
      > */}
      <LineChartProvider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CoinDetailHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <CoinPriceInfo
          name={name}
          currentPrice={current_price}
          priceChangePercentage24h={price_change_percentage_24h}
        />
        {/* CHART FILTER START */}
        <View style={styles.filterContainer}>
          {filterDaysArray.map((day) => (
            <Filter
              key={day.filterDay}
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
              // setSelectedRange={handlerSelectedRange}
            />
          ))}
        </View>
        {/* CHART FILTER END */}
        {/* CHART COMPONENT START */}
        <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={chartChangedColor} />
          <LineChart.CursorCrosshair color={chartChangedColor} />
        </LineChart>
        {/* CHART COMPONENT END */}
        {/* PRICE CONVERTER CONTAINER START */}
        <View style={styles.priceConverterContainer}>
          <Text style={styles.priceConverterTitle}>Price Converter</Text>
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            {/* importante agregar el flex 1 tanto aca como en el text input para que en todas las pantallas se vea bien el width del border */}
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={{ color: "white", alignSelf: "center" }}>
                {symbol.toUpperCase()}
              </Text>
              <TextInput
                style={styles.input}
                value={coinValue.toString()}
                keyboardType="numeric"
                // onChangeText={setCoinValue}
                onChangeText={handleChangeCoinValue}
              />
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
              <TextInput
                style={styles.input}
                value={usdValue.toString()}
                keyboardType="numeric"
                // onChangeText={setUsdValue}
                onChangeText={handleChangeUsdValue}
              />
            </View>
          </View>
        </View>
        {/* PRICE CONVERTER CONTAINER END */}
      </LineChartProvider>
      {/* </ChartPathProvider> */}
    </KeyboardAvoidingView>
  );
}
