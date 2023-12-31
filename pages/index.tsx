import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Select from 'react-select';
import SearchIcon from '../public/icons8-search.svg';
import Image from 'next/image';
import {co2, deviceList} from '../data/deviceList';
import {eighteenthCol, eigthCol, eleventhCol, fifteenthCol, fifthCol, fourteenthCol, fourthCol, lowerFirstCol, lowerLastCol, ninteenthCol, ninthCol, secondCol, seventeenthCol, seventhCol, sixteenthCol, sixthCol, tenthCol, thirdCol, thirteenthCol, twelvethCol, twentythCol, upperFirstCol, upperLastCol} from '../data/gridView';
import {defaultParameters} from '../data/deviceList';
// import Navbar from '@/components/Navbar';
import Logo from '../public/logo.png';
import Menu from '../public/menu-svgrepo-com.svg';
import Link from 'next/link';
import makeAnimated from 'react-select/animated';
import { Modal, Tooltip , Spin, Drawer } from 'antd';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {RiMenuFill} from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const animatedComponents = makeAnimated();

const parameterOptions = [
  {value:'all',label:'all'},
  { value: 'rHeap', label: 'rHeap' },
  { value: 'lHeap', label: 'lHeap' },
  { value: 'dTS', label: 'dTS' },
  { value: 'dUT', label: 'dUT' },
  { value: 'lat', label: 'lat' },
  { value: 'nso', label: 'nso' },
  { value: 'long', label: 'long' },
  { value: 'ewo', label: 'ewo' },
  { value: 'alt', label: 'alt' },
  { value: 'sog', label: 'sog' },
  { value: 'cog', label: 'cog' },
  { value: 'hdop', label: 'hdop' },
  { value: 'vdop', label: 'vdop' },
  { value: 'pdop', label: 'pdop' },
  { value: 'age', label: 'age' },
  { value: 'temp', label: 'temp' },
  { value: 'rh', label: 'rh' },
  { value: 'sPM1', label: 'sPM1' },
  { value: 'sPM2', label: 'sPM2' },
  { value: 'sPM4', label: 'sPM4' },
  { value: 'sPM10', label: 'sPM10' },
  { value: 'sNPMp5', label: 'sNPMp5' },
  { value: 'sNPM1', label: 'sNPM1' },
  { value: 'sNPM2', label: 'sNPM2' },
  { value: 'sNPM4', label: 'sNPM4' },
  { value: 'sNPM10', label: 'sNPM10' },
  { value: 'sTPS', label: 'sTPS' },
  { value: 'sTemp', label: 'sTemp' },
  { value: 'sRh', label: 'sRh' },
  { value: 'sVocI', label: 'sVocI' },
  { value: 'sNoxI', label: 'sNoxI' },
  { value: 'aFanTacho', label: 'aFanTacho' },
  { value: 'gIR', label: 'gIR' },
  { value: 'gLUM', label: 'gLUM' },
  { value: 'gUV', label: 'gUV' },
  { value: 'pIDar', label: 'pIDar' },
  { value: 'aUT', label: 'aUT' },
  { value: 'ax', label: 'ax' },
  { value: 'ay', label: 'ay' },
  { value: 'az', label: 'az' },
  { value: 'gx', label: 'gx' },
  { value: 'gy', label: 'gy' },
  { value: 'gz', label: 'gz' },
  { value: 'accTemp', label: 'accTemp' }
]

export default function Home() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const [isTableView,setIsTableView]=useState(true);
  const [isLoading , setIsLoading] = useState(true);
  const [activeButton,setActiveButton] = useState(0);
  const [filteredData,setFilteredData] = useState<{
    status: boolean;dID:string;value:null;lts:number;
}[]>([]);
  type ParameterOption = {
    value: string;
    label: string;
    desc: string;
  };
  const [parameters,SetParameters]=useState<ParameterOption[]>(defaultParameters);
  const [parameters2,SetParameters2]=useState<ParameterOption[]>(co2);
  // //console.log("the parameters that has been selected are ",parameters)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [paramsArr, setParamsArr] = useState<Array<string>>([       'rHeap', 'lHeap',
    'dTS',   'dUT',       'lat',   'nso',
    'long',  'ewo',       'alt',   'sog',
    'cog',   'hdop',
   'temp',      'rh',    'sPM1',
    'sPM2',  'sPM4',      'sPM10', 'sNPMp5',
    'sNPM1', 'sNPM2',     'sNPM4', 'sNPM10',
    'sTPS',  'sTemp',     'sRh',   'sVocI',
    'sNoxI', 'aFanTacho', 'pIDar',  'aUT',   'ax',
    'ay',    'az',        'gx',    'gy',
    'gz',    'accTemp'
  ]);
  const [paramsArr2, setParamsArr2] = useState<Array<string>>([       'rHeap', 'lHeap',
    'dTS',   'dUT',       'lat',   'nso',
    'long',  'ewo',       'alt',   'sog',
    'cog',   'hdop',
   'temp',      'rh',    'sPM1',
    'sPM2',  'sPM4',      'sPM10', 'sNPMp5',
    'sNPM1', 'sNPM2',     'sNPM4', 'sNPM10',
    'sTPS',  'sTemp',     'sRh',   'sVocI',
    'sNoxI', 'aFanTacho','scd30Co2','scd30Temp', 'scd30Hum','k30Co2','sunriseCo2','pIDar',  'aUT',
     'accTemp'
  ]);
  const handleOk = () => {
    // const value = parametersRef?.current?.commonProps?.selectProps?.value ?? [];
    SetParameters(selectedParams);
    // //console.log(selectedParams);
    let arr:string[] = []
    selectedParams.map((item:any)=>{
      if(item.value=="all"){
        arr.length=0;
        SetParameters(defaultParameters);
        defaultParameters.map((item)=>{
          arr.push(item.value);
        })
        return ;
      }
      else{
        arr.push(item.value);
      }
    })
    //console.log(arr); 
    setParamsArr(arr);
    //console.log(parametersRef?.current);
    setIsModalOpen(false);
  };
  // //console.log("the value of params arr is ",paramsArr);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const options = [
    { value: 'SG1-SG15', label: 'SG1-SG15' },
    { value: 'SG16-SG30', label: 'SG16-SG30' },
    { value: 'SG31-SG45', label: 'SG31-SG45' },
    { value: 'SG46-SG60', label: 'SG46-SG60' },
    { value: 'SG61-SG75', label: 'SG61-SG75' },
    { value: 'SG76-SG90', label: 'SG76-SG90' },
    { value: 'SG91-SG105', label: 'SG91-SG105' },
    { value: 'MG1-MG15', label: 'MG1-MG15' },
    { value: 'MG16-MG30', label: 'MG16-MG30' },
    { value: 'MG31-MG45', label: 'MG31-MG45' },
    { value: 'MG46-MG60', label: 'MG46-MG60' },
    { value: 'MG61-MG70', label: 'MG61-MG70' },
    { value: 'LMG1-LMG15', label: 'LMG1-LMG15' },
    { value: 'LMG16-LMG30', label: 'LMG16-LMG30' },
    { value: 'LMG31-LMG45', label: 'LMG31-LMG45' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sCount,setSCount]=useState(0);
  const [mCount,setMCount]=useState(0);
  const [lmCount,setLMCount]=useState(0);
  //console.log("the count of lmcount is ",lmCount);
  const [currentPage,setCurrentPage]=useState<{
    status: boolean;dID:string;value:null;lts:number;
}[]>([]);
// const parametersRef = useRef<HTMLInputElement | null>(null);
// type SelectValue = ValueType<{ label: string; value: string }, true>;
interface CustomInputElement extends HTMLInputElement {
  commonProps: {
    selectProps: {
      value: ParameterOption[]; // Adjust the type to match your data structure
    };
  };
}

const [selectedParams,setSelectedParams]=useState<any[]>([]);
const handleSelectChange = (newValue: any) => {
  setSelectedParams(newValue);
};
const parametersRef = useRef<Select | null>(null);
  const [data,setData]=useState(deviceList);
  const getSocketUrl = useCallback(() => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('wss://bw07.kaatru.org/');
      }, 2000);
    });
  }, []);
  const getSocketUrlCO2 = useCallback(() => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('wss://bw07.kaatru.org/co2');
      }, 2000);
    });
  }, []);
  const changeIndex =(e:any)=>{
    console.log(e)

    switch(e){
      case 'SG1-SG15':
        setCurrentPage(data.slice(0,15));
        break;
      case 'SG16-SG30':
        setCurrentPage(data.slice(15,30));
        break;
      case 'SG31-SG45':
        setCurrentPage(data.slice(30,45));
        break;
      case 'SG46-SG60':
        setCurrentPage(data.slice(45,60));
        break;
      case 'SG61-SG75':
        setCurrentPage(data.slice(60,75));
        break;
      case 'SG76-SG90':
        setCurrentPage(data.slice(75,90));
        break;
      case 'SG91-SG105':
        setCurrentPage(data.slice(90,105));
        break;
      case 'MG1-MG15':
        setCurrentPage(data.slice(105,120));
        break;
      case 'MG16-MG30':
        setCurrentPage(data.slice(120,135));
        break;
      case 'MG31-MG45':
        setCurrentPage(data.slice(135,150));
        break;
      case 'MG46-MG60':
        setCurrentPage(data.slice(150,165));
        break;
      case 'MG61-MG70':
        setCurrentPage(data.slice(165,175));
        break;
      case 'LMG1-LMG15':
        setCurrentPage(data.slice(175,190));
        break;
      case 'LMG16-LMG30':
        setCurrentPage(data.slice(190,205));
        break;
      case 'LMG31-LMG45':
        setCurrentPage(data.slice(205,220));
        break;
      // case 'SG1-SG15':
      //   setCurrentPage(data.slice(0,15));
      //   break;
    }
    // //console.log(e);
  }
  const {} = useWebSocket(getSocketUrl, {
    onOpen: (_data) => {
      //console.log('WebSocket connection established.');
    },
    onMessage: (response) => {
      const mes = JSON.parse(response.data);
      //console.log(mes);
      
      data.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      // //console.log(data);
    },
    shouldReconnect: (_closeEvent) => true,
  });
  const {} = useWebSocket(getSocketUrlCO2, {
    onOpen: (_data) => {
      //console.log('WebSocket connection established.');
    },
    onMessage: (response) => {
      const mes = JSON.parse(response.data);
      //console.log(mes);
      
      data.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      // //console.log(data);
    },
    shouldReconnect: (_closeEvent) => true,
  });
  console.log(data)
  // //console.log(data);
  // console.log(data);
  useEffect(()=>{
    setTimeout(()=>{
      setCurrentPage(data?.slice(0,15));
      setIsLoading(false);
    },10000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call your function here
      const currentTs = Date.now() - 10000;
      let activeStationary = 0;
      let activeMobile = 0;
      let activeLeftMirror = 0;
      interface DataItem {
        lts: number;
        dID: string;
        status: boolean
        // Add other properties if necessary
      }   
      data?.map((item:DataItem)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID) || /\b(MG)\d+\b/.test(item?.dID)){
            activeStationary+=1;
            item.status = true;
          }
          else if (/\b(SZTestS)\d+\b/.test(item?.dID) || /\b(SZTest)\d+\b/.test(item?.dID)){
            activeMobile+=1;
            item.status = true;
          }
          else if (/\b(BCo)\d+\b/.test(item?.dID)){
            activeLeftMirror+=1;
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      setSCount(activeStationary);
      setMCount(activeMobile);
      setLMCount(activeLeftMirror);
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // //console.log("the lastfirstcol is ",lFirstCol);
  //console.log(data);
  // console.log("hello");
  const setDataOnFilter = (val:number) =>{
    switch(val){
      case 1:
        // //console.log(data);
        let filteredData1 = data.filter((item)=>item.status===true && ((/\b(SG)\d+\b/).test(item?.dID)||(/\b(MG)\d+\b/).test(item?.dID)))
        //console.log(filteredData1.length)
        setFilteredData(filteredData1)
        filteredData1.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setCurrentPage(filteredData1.slice(0,15));
        break;
      case 2:
        // //console.log(data);
        let filteredData2 = data.filter((item)=>item.status===false && ((/\b(SG)\d+\b/).test(item?.dID)||(/\b(MG)\d+\b/).test(item?.dID)))
        //console.log(filteredData2)
        filteredData2.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData2)
        setCurrentPage(filteredData2.slice(0,15));
        break;
      case 3:
        // //console.log(data);
        let filteredData3 = data.filter((item)=>item.status===true && (/\b(SZTestS)\d+\b/.test(item?.dID)||/\b(SZTest)\d+\b/.test(item?.dID)))
        //console.log(filteredData3)
        filteredData3.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData3)
        setCurrentPage(filteredData3.slice(0,15));
        break;
      case 4:
        // //console.log(data);
        let filteredData4 = data.filter((item)=>item.status===false && (/\b(SZTestS)\d+\b/.test(item?.dID)||/\b(SZTest)\d+\b/.test(item?.dID)))
        //console.log(filteredData4)
        filteredData4.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData4)
        setCurrentPage(filteredData4.slice(0,15));
        break;
      case 5:
        // //console.log(data);
        let filteredData5 = data.filter((item)=>item.status===true && /\b(BCo)\d+\b/.test(item?.dID))
        //console.log(filteredData5)
        filteredData5.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData5)
        setCurrentPage(filteredData5.slice(0,15));
        break;
      case 6:
        // //console.log(data);
        let filteredData6 = data.filter((item)=>item.status===false && /\b(Bco)\d+\b/.test(item?.dID))
        //console.log(filteredData6)
        filteredData6.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData6)
        setCurrentPage(filteredData6.slice(0,15));
        break;
    }
  }
  const [isNextThere,setIsNextThere]=useState(true);
  const [isPrevThere,setIsPrevThere]=useState(false);
  const goNextFilteredData = () =>{
     const currentIndex = filteredData.findIndex((item)=>item.dID === currentPage[0].dID)
     //console.log(currentIndex);
     const val1=currentIndex+15;
     const val2=currentIndex+30;
     const val3=currentIndex+30;
     const val4=currentIndex+45;
     
     const checkRangeForNext = filteredData.slice(val3,val4);
     if(!(checkRangeForNext.length > 0)){
      setIsNextThere(false);
     }
     else{
      setIsNextThere(true);
     }
     const val5=0;
     const val6=currentIndex+15;
     const checkRangeForPrev = filteredData.slice(val5,val6);
     if(!(checkRangeForPrev.length > 0)){
      setIsPrevThere(false);
     }
     else{
      setIsPrevThere(true);
     }
     //console.log(val1,val2)
     const checkRange = filteredData.slice(val1,val2);
     //console.log(checkRange);
     if(!(checkRange.length > 0)){
      //console.log("works")
      const notify = () => toast.error("Oops no Data is there to show");
      notify();
     }
     //console.log(filteredData.slice(val1,val2));
     setCurrentPage(filteredData.slice(val1,val2));
  }
  const goPrevFilteredData = () =>{
    const currentIndex = filteredData.findIndex((item)=>item.dID === currentPage[0].dID)
    //console.log(currentIndex);
    const val1=currentIndex-15;
    const val2=currentIndex;
    const val3=currentIndex-30;
     const val4=currentIndex-15;
     const checkRangeForPrev = filteredData.slice(val3,val4);
     if(!(checkRangeForPrev.length > 0)){
      setIsPrevThere(false);
     }
     else{
      setIsPrevThere(true);
     }
     const val5=currentIndex;
     const val6=currentIndex+1;
     
     const checkRangeForNext = filteredData.slice(val5,val6);
     if(!(checkRangeForNext.length > 0)){
      setIsNextThere(false);
     }
     else{
      setIsNextThere(true);
     }
    //console.log(val1,val2)
    //console.log(filteredData.slice(val1,val2));
    setCurrentPage(filteredData.slice(val1,val2));
 }
 const searchDevices = () =>{
  //console.log(inputRef?.current?.value);
  const devicesArr = inputRef?.current?.value.split(',');
  //console.log(devicesArr);
  const searchedDevices:any[] = [];
  devicesArr?.forEach((item1:string) => {
    data.forEach((item2) => {
      //console.log(item1 == item2.dID)
      if (item1 == item2.dID) {
        searchedDevices.push(item2);
      }
    });
  });
  //console.log(searchedDevices);
  setCurrentPage(searchedDevices);
 }
//  console.log(currentPage);

  //console.log("the currentpage data is ",currentPage);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start ${inter.className}`}
    >
      
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} okText={"Apply"} onCancel={handleCancel} okButtonProps={{style:{backgroundColor:'blue'}}}>
        <h2>Select the Fields You Need:-</h2>
        <Select
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={parameterOptions}
      value={selectedParams}
      onChange={handleSelectChange}
      // ref={parametersRef}
    />
      </Modal>
      <Drawer title="Select Device Range" placement="left" onClose={onClose} open={open} >
        <div className="flex flex-col gap-8">
        {options.map((item)=>{
          return (
            <p key={item.value} className='cursor-pointer px-2 py-2 border-black' onClick={()=>{changeIndex(item.value);onClose()}}>{item.value}</p>  
          )
        })}
        </div>
      </Drawer>
      <div className="h-[50px] w-full fixed flex justify-between items-center border-b-2">
        <div className="flex flex-row gap-[15%]">
            <div className="flex flex-row w-auto gap-4">
              <Image src={Menu} alt="" width={30} className='cursor-pointer' onClick={showDrawer}/>
              <Image src={Logo} alt="" width={120}/>
            </div>
            <div className="flex flex-row gap-3">
            <Link href="/" onClick={()=>setIsTableView(true)}>Home</Link>
            <Link href="/charts">Charts</Link>
            <Link href="/realtimechart" className='w-40'>Realtime Charts</Link>
            
            </div>
        </div>
        <div className=""><h1 className='text-2xl'>COLLOCATION</h1></div>
        <div className="">
        <div className="basis-[30%] w-full flex items-center gap-4">
          <div className="">
            <button className='bg-blue-400 px-2 py-2 text-white border-black rounded-md' onClick={()=>showModal()}>Parameters Filter</button>
          </div>
          
        <div className="relative">
          <input type="text" className='w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef}/>
          <Image src={SearchIcon} alt="" className='absolute top-1 right-2 cursor-pointer' width={30} onClick={searchDevices}/>
        </div>
        </div> 
      </div>
    </div>
{isTableView &&<><div className="w-full flex flex-row justify-between gap-4 fixed mt-[60px] z-[1]"> 
        <div className="basis-[100%] w-full flex flex-row gap-4 mx-2 text-white">
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>IITM GURGUGRAM DEVICES {sCount}/10</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==1?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==1){setActiveButton(1);setDataOnFilter(1)}}}>{(activeButton==1) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({sCount}){(activeButton==1) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==2?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==2){setActiveButton(2);setDataOnFilter(2)}}}>{(activeButton==2) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({10-sCount}){(activeButton==2) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>ZANZIBAR DEVICES {mCount}/4</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==3?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==3){setActiveButton(3);setDataOnFilter(3)}}}>{(activeButton==3) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({mCount}){(activeButton==3) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==4?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==4){setActiveButton(4);setDataOnFilter(4)}}}>{(activeButton==4) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({4-mCount}){(activeButton==4) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>INDOOR DEVICES {lmCount}/2</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==5?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==5){setActiveButton(5);setDataOnFilter(5)}}}>{(activeButton==5) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({lmCount}){(activeButton==5) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==6?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==6){setActiveButton(6);setDataOnFilter(6)}}}>{(activeButton==6) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({2-lmCount}){(activeButton==6) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full mt-[21vh]">
      <Spin tip="Loading..." spinning={isLoading}>
        {!((activeButton===5)||activeButton===6) &&<table>
          <tbody>
          <tr className='table_row'>
          <th className='fixed bg-white'>dID</th>  
          <th className='ml-[104px]'>pID</th>  
            {parameters.map((item)=>{
              return(
                <Tooltip title={item?.desc} key={item.value}>
                  <th key={item.value}>{item?.value}</th> 
                </Tooltip>
              )
            })}
          </tr>   
            {currentPage.map((item)=>{
              return (
                <tr key={item.dID} className={`values`}>
                <td className={`fixed ${item.status ? 'bg-white':'bg-red-500'}`}>{item.dID}</td>
                <td className='ml-[104px]'>{(item?.value as unknown as { pID: string | undefined })?.pID}</td>
                {paramsArr.map((item1)=>{
                  //console.log(item1);
                  return(
                    <>
                {item1?.includes('rHeap') && <td>{(item?.value as unknown as { rHeap: string | undefined })?.rHeap}</td>}
                {/\b(lHeap)\b/.test(item1) && <td>{(item?.value as unknown as { lHeap: string | undefined })?.lHeap}</td>}
                {item1?.includes('dTS') && <td>{(item?.value as unknown as { dTS: string | undefined })?.dTS}</td>}
                {item1?.includes('dUT') && <td>{(item?.value as unknown as { dUT: string | undefined })?.dUT}</td>}
                {/* <td>{item.value?.dTS}</td> */}
                {item1?.includes('lat') && <td>{(item?.value as unknown as { lat: string | undefined })?.lat}</td>}
                {item1?.includes('nso') && <td>{(item?.value as unknown as { nso: string | undefined })?.nso}</td>}
                {item1?.includes('long') && <td>{(item?.value as unknown as { long: string | undefined })?.long}</td>}
                {item1?.includes('ewo') && <td>{(item?.value as unknown as { ewo: string | undefined })?.ewo}</td>}
                {item1?.includes('alt') && <td>{(item?.value as unknown as { alt: string | undefined })?.alt}</td>}
                {/\b(sog)\b/.test(item1) && <td>{(item?.value as unknown as { sog: string | undefined })?.sog}</td>}
                {/\b(cog)\b/.test(item1) && <td>{(item?.value as unknown as { cog: string | undefined })?.cog}</td>}
                {/\b(hdop)\b/.test(item1) && <td>{(item?.value as unknown as { hdop: string | undefined })?.hdop}</td>}
                {/* {item1?.includes('vdop') && <td>{(item?.value as unknown as { vdop: string | undefined })?.vdop}</td>} */}
                {/* {item1?.includes('pdop') && <td>{(item?.value as unknown as { pdop: string | undefined })?.pdop}</td>} */}
                {/* {item1?.includes('age') && <td>{(item?.value as unknown as { age: string | undefined })?.age}</td>} */}
                {/\b(temp)\b/.test(item1) && <td>{(item?.value as unknown as { temp: string | undefined })?.temp}</td>}
                {/\b(rh)\b/.test(item1) && <td>{(item?.value as unknown as { rh: string | undefined })?.rh}</td>}
                {/\b(sPM1)\b/.test(item1) && <td>{(item?.value as unknown as { sPM1: string | undefined })?.sPM1}</td>}
                {/\b(sPM2)\b/.test(item1) && <td>{(item?.value as unknown as { sPM2: string | undefined })?.sPM2}</td>}
                {/\b(sPM4)\b/.test(item1) && <td>{(item?.value as unknown as { sPM4: string | undefined })?.sPM4}</td>}
                {/\b(sPM10)\b/.test(item1) && <td>{(item?.value as unknown as { sPM10: string | undefined })?.sPM10}</td>}
                {/\b(sNPMp5)\b/.test(item1) && <td>{(item?.value as unknown as { sNPMp5: string | undefined })?.sNPMp5}</td>}
                {/\b(sNPM1)\b/.test(item1) && <td>{(item?.value as unknown as { sNPM1: string | undefined })?.sNPM1}</td>}
                {item1?.includes('sNPM2') && <td>{(item?.value as unknown as { sNPM2: string | undefined })?.sNPM2}</td>}
                {item1?.includes('sNPM4') && <td>{(item?.value as unknown as { sNPM4: string | undefined })?.sNPM4}</td>}
                {/\b(sNPM10)\b/.test(item1) && <td>{(item?.value as unknown as { sNPM10: string | undefined })?.sNPM10}</td>}
                {item1?.includes('sTPS') && <td>{(item?.value as unknown as { sTPS: string | undefined })?.sTPS}</td>}
                {item1?.includes('sTemp') && <td>{(item?.value as unknown as { sTemp: string | undefined })?.sTemp}</td>}
                {item1?.includes('sRh') && <td>{(item?.value as unknown as { sRh: string | undefined })?.sRh}</td>}
                {item1?.includes('sVocI') && <td>{(item?.value as unknown as { sVocI: string | undefined })?.sVocI}</td>}
                {item1?.includes('sNoxI') && <td>{(item?.value as unknown as { sNoxI: string | undefined })?.sNoxI}</td>}
                {item1?.includes('aFanTacho') && <td>{(item?.value as unknown as { aFanTacho: string | undefined })?.aFanTacho}</td>}
                {/* {item1?.includes('gIR') && <td>{(item?.value as unknown as { gIR: string | undefined })?.gIR}</td>} */}
                {/* {item1?.includes('gLUM') && <td>{(item?.value as unknown as { gLUM: string | undefined })?.gLUM}</td>} */}
                {/* {item1?.includes('gUV') && <td>{(item?.value as unknown as { gUV: string | undefined })?.gUV}</td>} */}
                {item1?.includes('pIDar') && <td>{(item?.value as unknown as { pIDar: string | undefined })?.pIDar}</td>}
                {item1?.includes('aUT') && <td>{(item?.value as unknown as { aUT: string | undefined })?.aUT}</td>}
                {item1?.includes('ax') && <td>{(item?.value as unknown as { ax: string | undefined })?.ax}</td>}
                {item1?.includes('ay') && <td>{(item?.value as unknown as { ay: string | undefined })?.ay}</td>}
                {item1?.includes('az') && <td>{(item?.value as unknown as { az: string | undefined })?.az}</td>}
                {item1?.includes('gx') && <td>{(item?.value as unknown as { gx: string | undefined })?.gx}</td>}
                {item1?.includes('gy') && <td>{(item?.value as unknown as { gy: string | undefined })?.gy}</td>}
                {item1?.includes('gz') && <td>{(item?.value as unknown as { gz: string | undefined })?.gz}</td>}
                {item1?.includes('accTemp') && <td>{(item?.value as unknown as { accTemp: string | undefined })?.accTemp}</td>}
                    </>
                  )
                  })}
                
                </tr>  
              )
            })} 
             
          
          </tbody>
        </table>}   
        {(activeButton===5 || activeButton===6) &&<table>
          <tbody>
          <tr className='table_row'>
          <th className='fixed bg-white'>dID</th>  
          <th className='ml-[104px]'>pID</th>  
            {parameters2.map((item)=>{
              return(
                <Tooltip title={item?.desc} key={item.value}>
                  <th key={item.value}>{item?.value}</th> 
                </Tooltip>
              )
            })}
          </tr>   
            {currentPage.map((item)=>{
              return (
                <tr key={item.dID} className={`values`}>
                <td className={`fixed ${item.status ? 'bg-white':'bg-red-500'}`}>{item.dID}</td>
                <td className='ml-[104px]'>{(item?.value as unknown as { pID: string | undefined })?.pID}</td>
                {paramsArr2.map((item1)=>{
                  //console.log(item1);
                  return(
                    <>
                {item1?.includes('rHeap') && <td>{(item?.value as unknown as { rHeap: string | undefined })?.rHeap}</td>}
                {/\b(lHeap)\b/.test(item1) && <td>{(item?.value as unknown as { lHeap: string | undefined })?.lHeap}</td>}
                {item1?.includes('dTS') && <td>{(item?.value as unknown as { dTS: string | undefined })?.dTS}</td>}
                {item1?.includes('dUT') && <td>{(item?.value as unknown as { dUT: string | undefined })?.dUT}</td>}
                {/* <td>{item.value?.dTS}</td> */}
                {item1?.includes('lat') && <td>{(item?.value as unknown as { lat: string | undefined })?.lat}</td>}
                {item1?.includes('nso') && <td>{(item?.value as unknown as { nso: string | undefined })?.nso}</td>}
                {item1?.includes('long') && <td>{(item?.value as unknown as { long: string | undefined })?.long}</td>}
                {item1?.includes('ewo') && <td>{(item?.value as unknown as { ewo: string | undefined })?.ewo}</td>}
                {item1?.includes('alt') && <td>{(item?.value as unknown as { alt: string | undefined })?.alt}</td>}
                {/\b(sog)\b/.test(item1) && <td>{(item?.value as unknown as { sog: string | undefined })?.sog}</td>}
                {/\b(cog)\b/.test(item1) && <td>{(item?.value as unknown as { cog: string | undefined })?.cog}</td>}
                {/\b(hdop)\b/.test(item1) && <td>{(item?.value as unknown as { hdop: string | undefined })?.hdop}</td>}
                {/* {item1?.includes('vdop') && <td>{(item?.value as unknown as { vdop: string | undefined })?.vdop}</td>} */}
                {/* {item1?.includes('pdop') && <td>{(item?.value as unknown as { pdop: string | undefined })?.pdop}</td>} */}
                {/* {item1?.includes('age') && <td>{(item?.value as unknown as { age: string | undefined })?.age}</td>} */}
                {/\b(temp)\b/.test(item1) && <td>{(item?.value as unknown as { temp: string | undefined })?.temp}</td>}
                {/\b(rh)\b/.test(item1) && <td>{(item?.value as unknown as { rh: string | undefined })?.rh}</td>}
                {/\b(sPM1)\b/.test(item1) && <td>{(item?.value as unknown as { sPM1: string | undefined })?.sPM1}</td>}
                {/\b(sPM2)\b/.test(item1) && <td>{(item?.value as unknown as { sPM2: string | undefined })?.sPM2}</td>}
                {/\b(sPM4)\b/.test(item1) && <td>{(item?.value as unknown as { sPM4: string | undefined })?.sPM4}</td>}
                {/\b(sPM10)\b/.test(item1) && <td>{(item?.value as unknown as { sPM10: string | undefined })?.sPM10}</td>}
                {/\b(sNPMp5)\b/.test(item1) && <td>{(item?.value as unknown as { sNPMp5: string | undefined })?.sNPMp5}</td>}
                {/\b(sNPM1)\b/.test(item1) && <td>{(item?.value as unknown as { sNPM1: string | undefined })?.sNPM1}</td>}
                {item1?.includes('sNPM2') && <td>{(item?.value as unknown as { sNPM2: string | undefined })?.sNPM2}</td>}
                {item1?.includes('sNPM4') && <td>{(item?.value as unknown as { sNPM4: string | undefined })?.sNPM4}</td>}
                {/\b(sNPM10)\b/.test(item1) && <td>{(item?.value as unknown as { sNPM10: string | undefined })?.sNPM10}</td>}
                {item1?.includes('sTPS') && <td>{(item?.value as unknown as { sTPS: string | undefined })?.sTPS}</td>}
                {item1?.includes('sTemp') && <td>{(item?.value as unknown as { sTemp: string | undefined })?.sTemp}</td>}
                {item1?.includes('sRh') && <td>{(item?.value as unknown as { sRh: string | undefined })?.sRh}</td>}
                {item1?.includes('sVocI') && <td>{(item?.value as unknown as { sVocI: string | undefined })?.sVocI}</td>}
                {item1?.includes('sNoxI') && <td>{(item?.value as unknown as { sNoxI: string | undefined })?.sNoxI}</td>}
                {item1?.includes('aFanTacho') && <td>{(item?.value as unknown as { aFanTacho: string | undefined })?.aFanTacho}</td>}
                {item1?.includes('scd30Co2') && <td>{(item?.value as unknown as { scd30Co2: string | undefined })?.scd30Co2}</td>}
                {item1?.includes('scd30Temp') && <td>{(item?.value as unknown as { scd30Temp: string | undefined })?.scd30Temp}</td>}
                {item1?.includes('scd30Hum') && <td>{(item?.value as unknown as { scd30Hum: string | undefined })?.scd30Hum}</td>}
                {item1?.includes('k30Co2') && <td>{(item?.value as unknown as { k30Co2: string | undefined })?.k30Co2}</td>}
                {item1?.includes('sunriseCo2') && <td>{(item?.value as unknown as { sunriseCo2: string | undefined })?.sunriseCo2}</td>}
                {/* {item1?.includes('gIR') && <td>{(item?.value as unknown as { gIR: string | undefined })?.gIR}</td>} */}
                {/* {item1?.includes('gLUM') && <td>{(item?.value as unknown as { gLUM: string | undefined })?.gLUM}</td>} */}
                {/* {item1?.includes('gUV') && <td>{(item?.value as unknown as { gUV: string | undefined })?.gUV}</td>} */}
                {item1?.includes('pIDar') && <td>{(item?.value as unknown as { pIDar: string | undefined })?.pIDar}</td>}
                {item1?.includes('aUT') && <td>{(item?.value as unknown as { aUT: string | undefined })?.aUT}</td>}
                {item1?.includes('accTemp') && <td>{(item?.value as unknown as { accTemp: string | undefined })?.accTemp}</td>}
                    </>
                  )
                  })}
                
                </tr>  
              )
            })} 
             
          
          </tbody>
        </table>}   
         
        </Spin>
      </div></>}
      <ToastContainer />
    </main>
  )
}

//TODO: <div className="bg-red-500 w-[2vw] h-[5vh] absolute left-[6vw] top-[0px] rounded-[50%]"></div> 

// {[0,1,2,3,4,5,6,7,8,9].map((item)=>
        
//   <><div className="flex flex-row justify-between gap-4 px-4 w-[90%]">
//       <div className="w-[60px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//   </div>
//   <div className="flex flex-row justify-between gap-3 px-4 ml-[8vh] w-[90%]">
//   <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//       <div className="w-[50px] h-[50px] bg-white rounded-[50%] border-black border-[2px] text-black flex items-center justify-center">
//         S33
//       </div>
//   </div></>)}
