# 3Commas API Client for TypeScript

![npm](https://img.shields.io/npm/v/3commas-typescript)
![npm bundle size](https://img.shields.io/bundlephobia/min/3commas-typescript)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kirosc/3commas-typescript)

An unofficial 3Commas API wrapper in TypeScript. Check out the offical documentation [here](https://github.com/3commas-io/3commas-official-api-docs).

## Install

```
npm install 3commas-typescript
```

## Usage

```ts
import { API } from '3commas-typescript';

const api = new API({
  key: 'YOUR_KEY', // Optional if only query endpoints with no security requirement
  secrets: 'YOUR_SECRETS', // Optional
  timeout: 60000, // Optional, in ms, default to 30000
  errorHandler: (response, reject) => {
    // Optional, Custom handler for 3Commas error
    const { error, error_description } = response;
    reject(new Error(error_description ?? error));
  },
});
```

## Supported Request

### Account

```ts
ping()

time()

transfer(params: TransferParams)

getTransferHistory(params: TransferHistoryParams)

getTransferData()

addExchangeAccount(params: any)

editExchangeAccount(params: any)

getExchange()

getMarketList()

getMarketPairs(params?: any)

getCurrencyRate(params: any)

getActiveTradeEntities(account_id: number)

sellAllToUSD(account_id: number)

sellAllToBTC(account_id: number)

getBalanceChartData(account_id: number, params: any)

loadBalances(account_id: number)

renameExchangeAccount(account_id: number, name: string)

removeExchangeAccount(account_id: number)

getPieChartData(account_id: number)

getAccountTableData(account_id: number)

getAccountInfo(account_id?: number)
```

### User

```ts
changeUserMode(mode: 'paper' | 'real')
```

### Smart Trade

```ts
getSmartTradeHistory(params?: SmartTradeHistoryParams)

smartTrade(params: SmartTradeParams)

getSmartTrade(id: number)

cancelSmartTrade(id: number)

updateSmartTrade(id: number)

averageSmartTrade(id: number, params: any)

closeSmartTrade(id: number)

forceStartSmartTrade(id: number)

forceProcessSmartTrade(id: number)

setNoteSmartTrade(id: number, note: string)

getSubTrade(id: number)

closeSubTrade(smartTradeId: number, subTradeId: number)

cancelSubTrade(smartTradeId: number, subTradeId: number)

```

### Bots

```ts
getBots(params?: BotsParams)

getBot(id: number)

getBotsStats(params?: BotsStatsParams)

getDeals(params?: DealsParams)

getDeal(id: number)

getDealSafetyOrders(id: number)
```

### Websocket

```ts
subscribeSmartTrade(callback?: (data: WebSocket.Data) => void)

subscribeDeal(callback?: (data: WebSocket.Data) => void)

unsubscribe()
```

## Response Type

The Order type returned by smart trade endpoint is generated using [quicktype](https://github.com/quicktype/quicktype).

The type correctness isn't guaranteed. You can perform a type check before access.

```ts
try {
  const order = await api.getSmartTrade(1234567)
  const validatedOrder = api.validateOrderType(order)
  ...
} catch (error) {
  console.error(error)
}
```

## Support

Buy me a coffee

ETH: 0xB6fc1dFABf1244138b048C3F80ba5678d8f6f0CE

BAT: 0x336bFB8247640C0848F8aFFB80464f3fF489B888
