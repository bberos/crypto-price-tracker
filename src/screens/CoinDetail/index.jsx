import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
} from "@rainbow-me/animated-charts";
import styles from "./styles";
import CoinDetailHeader from "./../../components/CoinDetail/Header";
import CoinPriceInfo from "./../../components/CoinDetail/PriceInfo";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "./../../services/requests";
export default function index() {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const fetchCoinData = async () => {
    setIsLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);
  const screenWidth = Dimensions.get("window").width;
  // Si la moneda dropeo al principio de las 24hs stroke=red : stroke=green

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
    <View style={styles.container}>
      <ChartPathProvider
        data={{
          // points: prices.map((price) => ({ x: price[0], y: price[1] })),
          points: prices.map(([x, y]) => ({ x, y })),
          smoothingStrategy: "bezier",
        }}
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
        {/* CHART COMPONENT START */}
        <View>
          <ChartPath
            height={screenWidth / 2}
            stroke={chartChangedColor}
            width={screenWidth}
          />
          <ChartDot style={{ backgroundColor: chartChangedColor }} />
        </View>
        {/* CHART COMPONENT END */}
        {/* PRICE CONVERTER CONTAINER START */}
        <View style={{ flexDirection: "row" }}>
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
        {/* PRICE CONVERTER CONTAINER END */}
      </ChartPathProvider>
    </View>
  );
}
