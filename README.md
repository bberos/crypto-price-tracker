# Crypto Price Tracker App Project.

#### This project is a React-Native app using Expo. The main purpose was improving my skills as a frontend developer.

The app is a price tracker of cryptocurrency powered by coingeeko api (https://www.coingecko.com/en/api).
- At this moment, all the currency conversions are in USD.
- Currently there is not any connection to a database, therefore I used the device storage with react-native-async-storage


## HOME  
On this screen, we mainly deploy a list of criptocurrency, paginated 50 by 50 with infinit scroll, ordered by the rank provided by the API. Here we can visualize the name, rank, symbol, percentage change (24hs), current price and market cap of each currency.  

<img src="https://i.imgur.com/6jMmiXu.png" width="350"  />  <img src="https://i.imgur.com/Mx6hs96.gif" width="350"  />

--------------
## COIN DETAIL
Is a dynamic screen where you can access the desired criptocurrency by tapping the card, and it shows the details of it (symbol, name, rank, dynamic current price & percentage change).
There is a graph where I used react-native-wagmi-charts library where we can loop through it and see the current price also we can filter by time.
And finally we have a simple price converter.

<img src="https://i.imgur.com/pkIjksR.png" width="350"  />  <img src="https://i.imgur.com/D3kzIpw.gif" width="350"  />

--------------
## PORTFOLIO
This screen is a list of our assets where we can upload and remove them. It shows our actual balance and informs our general balance, considering the purchase price and the actual price. This was a big challenge given that I used Recoil for the first time.

<img src="https://i.imgur.com/DRdkpiF.png" width="350"  />

### NEW ASSET
On this screen is where we can add new assets, there is a list of all the available criptocurrency from API. Once we have selected one, we are allowed to add the amount of the asset that we want to purchase.

<img src="https://i.imgur.com/gFgOHOz.gif" width="350"  />

--------------

## FAVOURITES 
This screen is for saving and removing our favorite cryptocurrency. I used Context from React as state management given that it was enough for the functionalities that I needed.

<img src="https://i.imgur.com/CIWBxHa.png" width="350"  />  <img src="https://i.imgur.com/eRXHB7R.gif" width="350"  />

--------------
#### Technologies used for this application:
React-Native | Expo | Axios | react-native-wagmi-charts | Async-Storage | React-Navigation | Reanimated | react-native-searchable-dropdown | recoil
