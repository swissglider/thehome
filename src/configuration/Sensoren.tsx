export const BALCK_LIST_SENSOREN = ['enum.functions.blinds_position', 'enum.functions.wind_'];
export const LOCATION_OVERVOEW_BOX_SENSORS: { [key: string]: string[] } = {
    switch: ['enum.functions.light', 'enum.functions.blinds'],
    boolean: ['enum.functions.doors', 'enum.functions.window', 'enum.functions.motion'],
    allboolean: ['enum.functions.light', 'enum.functions.doors', 'enum.functions.window', 'enum.functions.motion'],
    number1: ['enum.functions.temp', 'enum.functions.hum'],
    // number2: ['enum.functions.rain', 'enum.functions.wind_'],
    number2: ['enum.functions.rain', 'enum.functions.pressure'],
};
