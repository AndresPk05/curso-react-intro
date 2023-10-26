export const Get = async () => {
    const response = await fetch(`https://localhost:7160/moneda/`);
    const result = await response.json();
    return result;
}