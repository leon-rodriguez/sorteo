import './App.css';
import React, { useState } from 'react';

function App() {
  let botonSortear = document.getElementById("sorteo");
  let input = document.getElementById("input");
  const [nombreEscrito, setNombreEscrito] = useState("");
  const [listaSorteo, setListaSorteo] = useState([]);
  const [botonSorteo, setBotonSorteo] = useState(false);
  const [ganador, setGanador] = useState("");
  const [modal, setModal] = useState(false);
  const arrayLength = [];
 
  const setearEstilo = (e) =>{
    if(e){
    botonSortear.style.backgroundColor = "rgba(0, 183, 255, 1)";
    botonSortear.style.cursor = "pointer";
    botonSortear.style.boxShadow = "0 0 20px rgb(255, 255, 255)";
    }
    else{
      botonSortear.style.backgroundColor = "rgba(0, 183, 255, .6)";
      botonSortear.style.cursor = "auto";
      botonSortear.style.boxShadow = "none";
    }
  } 

  const agregarNombres = (nombreEscrito) =>{
      if(nombreEscrito != 0){
        setListaSorteo([...listaSorteo, nombreEscrito]);
        console.log(listaSorteo.length);
        input.value = "";
        setNombreEscrito("");
      if(listaSorteo.length > 0){
        setBotonSorteo(true);
        console.log(botonSorteo);
        setearEstilo(true);
        }
      }
  }

  const tomarNombres = (e) => {
    setNombreEscrito(e.target.value);
  }

  const sorteo = (arraySorteo) =>{
    for(let i = 0; i < arraySorteo.length; i++){
      arrayLength.push(arraySorteo[i].length);
    }

    arrayLength.sort(function(a, b){return b - a});

    for(let g = 0; g < arraySorteo.length; g++){
      if(arrayLength[0] == arraySorteo[g].length){
        //alert(`El ganador del sorteo es ${arraySorteo[g]}`);
        setGanador(arraySorteo[g]);
        setModal(true);
      }
    } 
  }

  const terminarSorteo = () =>{
    setModal(false);
    setListaSorteo([]);
    setearEstilo(false);
  }


  return (
    <div>
      { modal ? <div className='overlay'>
        <div className='popup'>
          <div onClick={terminarSorteo}>+</div>
          El ganador es:<span>{ganador}</span>
        </div>
      </div> : undefined}
    <div className='container'>
      <div className='tittle'>
        Sorteos
      </div>
      <div className='main'>
        <div className='linea' id='linea1'></div>
        <div className='linea' id='linea2'></div>
        <div className='grid'>
          <div className='contenedor_input'>
            <div className='contenedor_input_input'>
              <input id="input" type={"text"} placeholder={"escriba el nombre"} onChange={tomarNombres}/>
            </div>
            <div className='contenedor_input_button'>
             <button onClick={ () =>{agregarNombres(nombreEscrito)}}>Agregar</button>
            </div>
          </div>
          <div className='contenedor_lista'>

            {listaSorteo.map(e =>(
              <li><span>{e}</span></li>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className='container_sortear'>
      <button className='sortear' id='sorteo' onClick={ () =>{
        if(botonSorteo){
          sorteo(listaSorteo);
        }
      }}>Sortear</button>
    </div>          
  </div>            
  );
}

export default App;
