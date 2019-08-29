export const formatCCYPairSymbol = symbol => {
    return  symbol || symbol.length === 6 ?`${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`: '';
  }
