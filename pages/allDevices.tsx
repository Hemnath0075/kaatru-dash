import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Select from 'react-select';
import SearchIcon from '../public/icons8-search.svg';
import Image from 'next/image';
import {deviceList} from '../data/deviceList';
import {eighteenthCol, eigthCol, eleventhCol, fifteenthCol, fifthCol, fourteenthCol, fourthCol, lowerFirstCol, lowerLastCol, ninteenthCol, ninthCol, secondCol, seventeenthCol, seventhCol, sixteenthCol, sixthCol, tenthCol, thirdCol, thirteenthCol, twelvethCol, twentythCol, upperFirstCol, upperLastCol} from '../data/gridView';
import {defaultParameters} from '../data/deviceList';
// import Navbar from '@/components/Navbar';
import Logo from '../public/logo.png';
import Link from 'next/link';
import makeAnimated from 'react-select/animated';
import { Modal, Tooltip , Spin } from 'antd';
import {FcNext, FcPrevious} from 'react-icons/fc';
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
  const router = useRouter();
  const [lFirstCol,setLFirstCol]=useState(lowerFirstCol);
  const [uFirstCol,setUFirstCol]=useState(upperFirstCol);
  const [SecondCol,setSecondCol]=useState(secondCol);
  const [ThirdCol,setThirdCol]=useState(thirdCol);
  const [FourthCol,setFourthCol]=useState(fourthCol);
  const [FifthCol,setFifthCol]=useState(fifthCol);
  const [SixthCol,setSixthCol]=useState(sixthCol);
  const [SeventhCol,setSeventhCol]=useState(seventhCol);
  const [EighthCol,setEighthCol]=useState(eigthCol);
  const [NinthCol,setNinthCol]=useState(ninthCol);
  const [TenthCol,setTenthCol]=useState(tenthCol);
  const [EleventhCol,setEleventhCol]=useState(eleventhCol);
  const [TwelvethCol,setTwelvethCol]=useState(twelvethCol);
  const [ThirteenthCol,setThirteenthCol]=useState(thirteenthCol);
  const [FourteenthCol,setFourteenthCol]=useState(fourteenthCol);
  const [FifteenthCol,setFifteenthCol]=useState(fifteenthCol);
  const [SixteenthCol,setSixteenthCol]=useState(sixteenthCol);
  const [SeventeenthCol,setSeventeethCol]=useState(seventeenthCol);
  const [EighteenthCol,setEighteenCol]=useState(eighteenthCol);
  const [NineteenthCol,setNineteenthCol]=useState(ninteenthCol);
  const [TwentyethCol,setTwentyethCol]=useState(twentythCol);
  // const [lLastCol,setLastCol]=useState(lowerFirstCol);
  // const [uLastCol,setLCol]=useState(upperFirstCol);
  const [lLastCol,setlLastCol]=useState(lowerLastCol);
  const [uLastCol,setuLastCol]=useState(upperLastCol);
  const [isTableView,setIsTableView]=useState(false);
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
  // console.log("the parameters that has been selected are ",parameters)
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
  const handleOk = () => {
    // const value = parametersRef?.current?.commonProps?.selectProps?.value ?? [];
    SetParameters(selectedParams);
    console.log(selectedParams);
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
    console.log(arr);
    setParamsArr(arr);
    console.log(parametersRef?.current);
    setIsModalOpen(false);
  };
  // console.log("the value of params arr is ",paramsArr);
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
  console.log("the count of lmcount is ",lmCount);
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
  const changeIndex =(e:any)=>{
    // console.log(typeof(e))
    switch(e.value){
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
    // console.log(e);
  }
  const {} = useWebSocket(getSocketUrl, {
    onOpen: (_data) => {
      console.log('WebSocket connection established.');
    },
    onMessage: (response) => {
      const mes = JSON.parse(response.data);
      console.log(mes);
      lFirstCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      uFirstCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      SecondCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      ThirdCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      FourthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      FifthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      SixthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      SeventhCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      EighthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      NinthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      TenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      EleventhCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      TwelvethCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      ThirteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      FourteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      FifteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      SixteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      SeventeenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      EighteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      NineteenthCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      TwentyethCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      lLastCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      uLastCol.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      })
      data.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      // console.log(data);
    },
    shouldReconnect: (_closeEvent) => true,
  });
  // console.log(data);
  
  useEffect(()=>{
    setCurrentPage(data?.slice(0,15));
    setTimeout(()=>{
      setIsLoading(false);
    },10000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call your function here
      const currentTs = Date.now() - 10000;
      interface DataItem {
        lts: number;
        dID: string;
        status: boolean
        // Add other properties if necessary
      }
      lFirstCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      uFirstCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      SecondCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      ThirdCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      FourthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      FifthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      SixthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      SeventhCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      EighthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      NinthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      TenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      EleventhCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      TwelvethCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      ThirteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      FourteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      FifteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      SixteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      SeventeenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      EighteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      NineteenthCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      TwentyethCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      lLastCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      uLastCol.map((item)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })     
      
      
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("the lastfirstcol is ",lFirstCol);
  console.log(data);
  const setDataOnFilter = (val:number) =>{
    switch(val){
      case 1:
        // console.log(data);
        let filteredData1 = data.filter((item)=>item.status===true && /\b(SG)\d+\b/.test(item?.dID))
        console.log(filteredData1.length)
        setFilteredData(filteredData1)
        filteredData1.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setCurrentPage(filteredData1.slice(0,15));
        break;
      case 2:
        // console.log(data);
        let filteredData2 = data.filter((item)=>item.status===false && /\b(SG)\d+\b/.test(item?.dID))
        console.log(filteredData2)
        filteredData2.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData2)
        setCurrentPage(filteredData2.slice(0,15));
        break;
      case 3:
        // console.log(data);
        let filteredData3 = data.filter((item)=>item.status===true && /\b(MG)\d+\b/.test(item?.dID))
        console.log(filteredData3)
        filteredData3.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData3)
        setCurrentPage(filteredData3.slice(0,15));
        break;
      case 4:
        // console.log(data);
        let filteredData4 = data.filter((item)=>item.status===false && /\b(MG)\d+\b/.test(item?.dID))
        console.log(filteredData4)
        filteredData4.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData4)
        setCurrentPage(filteredData4.slice(0,15));
        break;
      case 5:
        // console.log(data);
        let filteredData5 = data.filter((item)=>item.status===true && /\b(LMG)\d+\b/.test(item?.dID))
        console.log(filteredData5)
        filteredData5.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData5)
        setCurrentPage(filteredData5.slice(0,15));
        break;
      case 6:
        // console.log(data);
        let filteredData6 = data.filter((item)=>item.status===false && /\b(LMG)\d+\b/.test(item?.dID))
        console.log(filteredData6)
        filteredData6.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData6)
        setCurrentPage(filteredData6.slice(0,15));
        break;
    }
  }
  const [isNextThere,setIsNextThere]=useState(true);
  const [isPrevThere,setIsPrevThere]=useState(false);
  
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
      
      <div className="h-[50px] w-full fixed flex justify-between items-center border-b-2">
        <div className="flex flex-row gap-[15%]">
            <Image src={Logo} alt="" width={110}/>
            <div className="flex flex-row gap-3">
            <Link href="/" onClick={()=>setIsTableView(true)}>Home</Link>
            <Link href="/charts">Charts</Link>
            <p className='w-[140px] cursor-pointer' onClick={()=>{setIsTableView(false);router.push('/allDevices')}}>Grid View</p>
            </div>
        </div>
        <div className=""><h1 className='text-2xl'>COLOCATION</h1></div>
        <div className="">
        {/* <div className="basis-[30%] w-full flex items-center gap-4">
          <div className="">
            <button className='bg-blue-400 px-2 py-2 text-white border-black rounded-md' onClick={()=>showModal()}>Parameters Filter</button>
          
          </div>
          <Select
          defaultValue={selectedOption}
          onChange={(value)=>changeIndex(value)}
          options={options}
        
          />
        <div className="relative">
          <input type="text" className='w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef}/>
          <Image src={SearchIcon} alt="" className='absolute top-1 right-2 cursor-pointer' width={30} onClick={searchDevices}/>
        </div>
        </div>  */}
      </div>
    </div>
      
      
      {!isTableView && <div className="flex flex-row justify-center mt-[6vh] w-[100vw] h-[90vh] gap-[2px]">
        <div className="flex flex-col mt-[50px] gap-4 pb-[50px]">
          <div className="flex flex-col gap-[25px]">
          {uFirstCol.map((item:any)=>{
                return(
                  <div key={item.dID} className={`w-[60px] h-[25px]  border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
                )
              })}
            </div>
            <div className="flex flex-col gap-[25px] mt-[140px]">
              {lFirstCol.map((item:any)=>{
                return(
                  <div key={item.dID} className={`w-[60px] h-[25px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
                )
              })}
          </div>
          
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px]">
          {SecondCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] p-4 border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px] ">
          {ThirdCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px]  border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {FourthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {FifthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {SixthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {SeventhCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {EighthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {NinthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {TenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {EleventhCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {TwelvethCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {ThirteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {FourteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {FifteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {SixteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {SeventeenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {EighteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[47px]">
          {NineteenthCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col gap-[45px] mt-[0px] h-[105vh]">
          {TwentyethCol.map((item)=>{
            return(
              <div key={item.dID} className={`w-[60px] h-[50px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
            )
          })}
        </div>
        <div className="flex flex-col mt-[47px] gap-4 pb-[50px]">
            <div className="flex flex-col gap-[25px]">
              {lLastCol.map((item:any)=>{
                return(
                  <div key={item.dID} className={`w-[60px] h-[25px] border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
                )
              })}
          </div>
          <div className="flex flex-col gap-[25px]  mt-[140px]">
          {uLastCol.map((item:any)=>{
                return(
                  <div key={item.dID} className={`w-[60px] h-[25px]  border-black border-[2px] text-black flex items-center justify-center ${item.status ? 'bg-white':'bg-red-500 text-white'}`}>{item.dID}</div>
                )
              })}
            </div>
          
        </div>
        
        
      </div>}
      <ToastContainer />
    </main>
  )
}

