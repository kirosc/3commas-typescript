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
  key: 'YOUR_KEY',
  secrets: 'YOUR_SECRETS',
  timeout: 10000, // Optional, in ms, default to 6000
});
```

## Supported Request

### Account

```ts
transfer(params: any)

getTransferHistory(params: any)

getTransferData()

addExchangeAccount(params: any)

editExchangeAccount(params: any)

getExchange()

getMarketList()

getMarketPairs()

getCurrencyRate()

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
getSmartTradeHistory(params: any)

smartTrade(params: SmartTradeParams)

getSmartTrade(id: number)

cancelSmartTrade(id: number)

updateSmartTrade(id: number)

averageSmartTrade(id: number, params: any)

closeSmartTrade(id: number)

forceStartSmartTrade(id: number)

forceProcessSmartTrade(id: number)

setNoteSmartTrade(id: number, note: string)
```

## Support

Buy me a coffee

ETH: 0xB6fc1dFABf1244138b048C3F80ba5678d8f6f0CE
