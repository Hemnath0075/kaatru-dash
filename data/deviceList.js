export const coloc4Devices = [
    { dID: 'S39', value: null ,lts: 0 ,status:false },
    { dID: 'S37', value: null ,lts: 0 ,status:false },
    { dID: 'S23', value: null ,lts: 0 ,status:false },
    { dID: 'S29', value: null ,lts: 0 ,status:false },
    { dID: 'S27', value: null ,lts: 0 ,status:false },
    { dID: 'S36', value: null ,lts: 0 ,status:false },   
]

export const deviceList = [
    { dID: 'SG1', value: null ,lts: 0 ,status:false },
    { dID: 'SG2', value: null ,lts: 0 ,status:false },
    { dID: 'SG3', value: null ,lts: 0 ,status:false },
    { dID: 'SG5', value: null ,lts: 0 ,status:false },
    { dID: 'SG6', value: null ,lts: 0 ,status:false },
    { dID: 'MG1', value: null ,lts: 0 ,status:false },
    { dID: 'MG2', value: null ,lts: 0 ,status:false },
    { dID: 'MG3', value: null ,lts: 0 ,status:false },
    { dID: 'MG4', value: null ,lts: 0 ,status:false },
    { dID: 'MG5', value: null ,lts: 0 ,status:false },
    { dID: 'SZTestS23', value: null ,lts: 0 ,status:false },
    { dID: 'SZTestS25', value: null ,lts: 0 ,status:false },
    // { dID: 'SZTestS35', value: null ,lts: 0 ,status:false },
    { dID: 'SZTestS33', value: null ,lts: 0 ,status:false },
    { dID: 'SZTest1', value: null ,lts: 0 ,status:false },
    { dID: 'BCo1', value: null ,lts: 0 ,status:false },
    { dID: 'BCo2', value: null ,lts: 0 ,status:false },
]

export const CO2deviceList = [
    { dID: 'BCo1', value: null ,lts: 0 ,status:false },
    { dID: 'BCo2', value: null ,lts: 0 ,status:false },
]
export const defaultParameters=[
    { value: 'rHeap', label: 'rHeap',desc:'available dynamic memory to be allocated by function calls' },
    { value: 'lHeap', label: 'lHeap' ,desc:'returns the minimum free heap size that was ever seen during program execution'},
    { value: 'dTS', label: 'dTS' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'dUT', label: 'dUT' ,desc:'How many minutes the device has been running. '},
    { value: 'lat', label: 'lat' ,desc:'Latitude coordinates measure distance north and south from the equator'},
    { value: 'nso', label: 'nso' ,desc:'Usually used to denote the north'},
    { value: 'long', label: 'long' ,desc:'Longitude coordinates measure distance east and west from the prime meridian'},
    { value: 'ewo', label: 'ewo' ,desc:'Usually used to denote the east'},
    { value: 'alt', label: 'alt' ,desc:'Altitude of the device'},
    { value: 'sog', label: 'sog' ,desc:'SOG is the speed of the vessel relative to the surface of the earth'},
    { value: 'cog', label: 'cog' ,desc:`COG is the actual direction of progress of a vessel, between two points, concerning the earth's surface`},
    { value: 'hdop', label: 'hdop' ,desc:'hdop is used for measuring the UNI-GR1’s horizontal position precision'},
    // { value: 'vdop', label: 'vdop' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'pdop', label: 'pdop' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'age', label: 'age' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'temp', label: 'temp' ,desc:'Termperature measued by the SHT45 in degree centigrade'},
    { value: 'rh', label: 'rh' ,desc:'Relative humidity measured by the SHT45 in %'},
    { value: 'sPM1', label: 'sPM1' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM2', label: 'sPM2' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM4', label: 'sPM4' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM10', label: 'sPM10' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sNPMp5', label: 'sNPMp5' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM1', label: 'sNPM1' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM2', label: 'sNPM2' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM4', label: 'sNPM4' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM10', label: 'sNPM10' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sTPS', label: 'sTPS' ,desc:'Typical particle size'},
    { value: 'sTemp', label: 'sTemp' ,desc:'Temperature from sen55'},
    { value: 'sRh', label: 'sRh' ,desc:'Relative Humidity from sen55'},
    { value: 'sVocI', label: 'sVocI' ,desc:'Volatile organic compound'},
    { value: 'sNoxI', label: 'sNoxI' ,desc:'NOx compunds'},
    { value: 'aFanTacho', label: 'aFanTacho' ,desc:`Fan's tachometer reading`},
    // { value: 'gIR', label: 'gIR' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'gLUM', label: 'gLUM' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'gUV', label: 'gUV' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'pIDar', label: 'pIDar' ,desc:'Packet ID denotes the serial number of the data packet. It is sent every 5 seconds from the device'},
    { value: 'aUT', label: 'aUT' ,desc:'How many minutes the ATMEGA2560 has been running. '},
    { value: 'ax', label: 'ax' ,desc:'Acceleration measured in X direction by the accelerometer'},
    { value: 'ay', label: 'ay' ,desc:'Acceleration measured in Y direction by the accelerometer'},
    { value: 'az', label: 'az' ,desc:'Acceleration measured in Z direction by the accelerometer'},
    { value: 'gx', label: 'gx' ,desc:'Rotational velocity in rad/s in the X direction'},
    { value: 'gy', label: 'gy' ,desc:'Rotational velocity in rad/s in the Y direction'},
    { value: 'gz', label: 'gz' ,desc:'Rotational velocity in rad/s in the Z direction '},
    { value: 'accTemp', label: 'accTemp',desc:'Temperature measured by the MPU6050 module' }
  ]

  export const co2=[
    { value: 'rHeap', label: 'rHeap',desc:'available dynamic memory to be allocated by function calls' },
    { value: 'lHeap', label: 'lHeap' ,desc:'returns the minimum free heap size that was ever seen during program execution'},
    { value: 'dTS', label: 'dTS' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'dUT', label: 'dUT' ,desc:'How many minutes the device has been running. '},
    { value: 'lat', label: 'lat' ,desc:'Latitude coordinates measure distance north and south from the equator'},
    { value: 'nso', label: 'nso' ,desc:'Usually used to denote the north'},
    { value: 'long', label: 'long' ,desc:'Longitude coordinates measure distance east and west from the prime meridian'},
    { value: 'ewo', label: 'ewo' ,desc:'Usually used to denote the east'},
    { value: 'alt', label: 'alt' ,desc:'Altitude of the device'},
    { value: 'sog', label: 'sog' ,desc:'SOG is the speed of the vessel relative to the surface of the earth'},
    { value: 'cog', label: 'cog' ,desc:`COG is the actual direction of progress of a vessel, between two points, concerning the earth's surface`},
    { value: 'hdop', label: 'hdop' ,desc:'hdop is used for measuring the UNI-GR1’s horizontal position precision'},
    // { value: 'vdop', label: 'vdop' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'pdop', label: 'pdop' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'age', label: 'age' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'temp', label: 'temp' ,desc:'Termperature measued by the SHT45 in degree centigrade'},
    { value: 'rh', label: 'rh' ,desc:'Relative humidity measured by the SHT45 in %'},
    { value: 'sPM1', label: 'sPM1' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM2', label: 'sPM2' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM4', label: 'sPM4' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sPM10', label: 'sPM10' ,desc:'Particulate matter mass concentration measured in ug/m^3 '},
    { value: 'sNPMp5', label: 'sNPMp5' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM1', label: 'sNPM1' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM2', label: 'sNPM2' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM4', label: 'sNPM4' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sNPM10', label: 'sNPM10' ,desc:'Particulate matter Number concentration measured in #/cm^3 '},
    { value: 'sTPS', label: 'sTPS' ,desc:'Typical particle size'},
    { value: 'sTemp', label: 'sTemp' ,desc:'Temperature from sen55'},
    { value: 'sRh', label: 'sRh' ,desc:'Relative Humidity from sen55'},
    { value: 'sVocI', label: 'sVocI' ,desc:'Volatile organic compound'},
    { value: 'sNoxI', label: 'sNoxI' ,desc:'NOx compunds'},
    { value: 'aFanTacho', label: 'aFanTacho' ,desc:`Fan's tachometer reading`},
    { value: 'scd30Co2', label: 'scd30Co2' ,desc:`Fan's tachometer reading`},
    { value: 'scd30Temp', label: 'scd30Temp' ,desc:`Fan's tachometer reading`},
    { value: 'scd30Hum', label: 'scd30Hum' ,desc:`Fan's tachometer reading`},
    { value: 'k30Co2', label: 'k30Co2' ,desc:`Fan's tachometer reading`},
    { value: 'sunriseCo2', label: 'sunriseCo2' ,desc:`Fan's tachometer reading`},
    // { value: 'gIR', label: 'gIR' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'gLUM', label: 'gLUM' ,desc:'Time obtained by the device from the NTP server'},
    // { value: 'gUV', label: 'gUV' ,desc:'Time obtained by the device from the NTP server'},
    { value: 'pIDar', label: 'pIDar' ,desc:'Packet ID denotes the serial number of the data packet. It is sent every 5 seconds from the device'},
    { value: 'aUT', label: 'aUT' ,desc:'How many minutes the ATMEGA2560 has been running. '},
    { value: 'accTemp', label: 'accTemp',desc:'Temperature measured by the MPU6050 module' }
  ]