import { useState, useEffect } from "react";
import { Redirect } from 'react-router'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { BiMicrophone } from 'react-icons/bi'
import PuffLoader from "react-spinners/PuffLoader";
import { MdClose } from 'react-icons/md'
import useWindowDimensions from '../../hooks/useWindow'
import "./Speech.scss";

const Speech = ({ closeMicro }) => {
  const commands = [
    {
      command: "ir a *",
      callback: (website) => {
        setRedirect(false)
        window.location.replace("https://m.el-mercado.es/" + website.split(" ").join("-"))
      },
    },
    {
      command: "ir a home",
      callback: () => {
        setRedirect(false)
        window.location.replace("https://m.el-mercado.es/")
      },
    },
    {
      command: "ir a inicio",
      callback: () => {
        setRedirect(false)
        window.location.replace("https://m.el-mercado.es/")
      },
    },
    {
      command: "(hola) (mercado) (El Mercado) (hola) (mercado) (El Mercado) (buscar) (quiero) (búscame) (comprar) (encuéntrame) * (por favor) (y) (gracias)",
      callback: (food) => {
        if (food.length > 1) {
          setParam(food)
          setRedirect(true)
          closeMicro()
        }
      },
    },
  ];
  const { width } = useWindowDimensions()
  const { transcript } = useSpeechRecognition({ commands })
  const [param, setParam] = useState('')
  const [isListening, setIsListening] = useState(false);
  const [redirect, setRedirect] = useState(false)

  const handleListing = () => {
    setIsListening(true)
    SpeechRecognition.startListening()
  }

  const stopHandle = () => {
    setIsListening(false)
    SpeechRecognition.stopListening()
  }

  useEffect(() => {
    SpeechRecognition.startListening()
    setIsListening(true)
    setTimeout(() => {
      stopHandle()
      setIsListening(false)
    }, 3000)
  }, [])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="overlayMicro">
        <div className={`container popUpMicro ${ width < 640 && "popUpMicro-xs"}`}>
          <div className="row justify-content-end p-1">
            <button onClick={() => closeMicro()} className="cross"> <MdClose /></button>
          </div>
          <div className="row justify-content-center">
            <p>
              Este navegador no soporta el reconocimiento de voz.
              Sentimos las molestias.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overlayMicro">
    <div className={`container popUpMicro ${ width < 640 && "popUpMicro-xs"}`}>
      <div className="row justify-content-end p-1">
        <button onClick={() => closeMicro()} className="cross"> <MdClose /></button>
      </div>
      {
        isListening
        ? (
          <>
          <div className="row justify-content-center pt-1 pb-3">
            <PuffLoader color="#E15D45"/>
          </div>
          <div className="row justify-content-center">
            <p>Te escuchamos...</p>
          </div>
          {
            transcript && (
              <p className="text-center mt-1 transcript"><i>{transcript}</i></p>
            )
          }
          </>
        ) : (
          <>
          <div className="row pt-4 justify-content-center pb-3">
            <p>Lo sentimos, no te hemos entendido</p>
          </div>
          <div className="row justify-content-center">
            <button onClick={handleListing} className="redo">Reintentar <BiMicrophone /></button>
          </div>
          </>
        )
      }
    </div>
      { redirect && (<Redirect to={`/productos?filter=${param}`}/>)}
    </div>
  );
}

export default Speech
