/**
 * Utilidades transversales para assertions numéricas (cart total, precios en grid).
 */

/** Parsea precio con símbolo de moneda, ej. "$10" o "$10.50" → número */
export function parsePrice(priceText: string): number {
  const normalized = priceText.trim().replace(/[^0-9.-]/g, '');
  const value = Number.parseFloat(normalized);

  if (Number.isNaN(value)) {
    throw new Error(`Invalid price format: "${priceText}"`);
  }

  return value;
}

/** Suma una lista de precios en formato moneda */
export function sumPrices(prices: readonly string[]): number {
  return prices.reduce((total, price) => total + parsePrice(price), 0);
}
