export function currencyValidate(currency: string): boolean {
     const validCurrencies = ['USD', 'EUR', 'GBP', 'PLN'];

    return validCurrencies.includes(currency?.toUpperCase());
}

export const vatTypeValidation = (vatType:string):boolean => vatType && vatType.length <= 2 ? true : false

export const priceValidation = (price:number):boolean => price && price > 0 ? true : false
export const notEmptyValidation = (field:string):boolean => field && field.length > 0 ? true : false

export function convertImageToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}