export function currencyValidate(currency: string): boolean {
  const validCurrencies = ["USD", "EUR", "GBP", "PLN"];

  return validCurrencies.includes(currency?.toUpperCase());
}

export const vatTypeValidation = (vatType: string): boolean =>
  vatType && vatType.length <= 2 ? true : false;

export const priceValidation = (price: number): boolean =>
  price && price > 0 ? true : false;
export const notEmptyValidation = (field: string): boolean =>
  field && field.length > 0 ? true : false;

export function convertImageToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (!file || !file.type.startsWith("image/")) {
      resolve("");
      return;
    }

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      // Validate Base64 string structure
      const base64Regex = /^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/]+={0,2}$/;
      if (base64Regex.test(result)) {
        // Remove the data URL prefix before resolving
        const base64String = result.replace(
          /^data:image\/[a-zA-Z]+;base64,/,
          ""
        );
        resolve(base64String);
      } else {
        reject(new Error("The input is not a valid Base64 string."));
      }
    };

    reader.onerror = (error) => reject(error);
  });
}
