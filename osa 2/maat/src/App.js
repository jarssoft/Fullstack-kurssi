import { useState, useEffect } from 'react'
import restcountries from './services/restcountries'

const Maa = ({maa}) => {
  return(
    <li>{maa.name.common}</li>
  )
}

const MaaLisatieto = ({maa}) => {
  console.log(Object.values(maa.languages));
  return (
    <div>
      <h1>{maa.name.common}</h1>
        
      <div>Pääkaupunki: {maa.capital}</div>
      <div>Pinta-ala: {maa.area} km²</div>

      <h2>Kielet</h2>

      <ul>
        {Object.values(maa.languages).map(
          lang => <li key={lang}>{lang}</li>
        )}
      </ul>

      <img src={maa.flags.png}></img>
    </div>
    )
}

const Ilmoitus = ({text}) => {
  return(
    text!=='' 
      ? <div>{text}</div>
      : <div />
  )
}

const MaaLista = ({maat}) => {

  console.log(maat.length)
  return (
    maat.length > 1
    ? <>
      <Ilmoitus text='
        Haku tuotti liikaa tuloksia.
        Rajoita hakua.'/>
        <ul>
          {maat.map(maa => 
            <Maa 
              maa={maa} 
              key={maa.name.common}/>)}
        </ul>
      </>
    : <Ilmoitus text='Haulla ei löydy yhtään maata.'/>
    )
}

const MaaTiedot = (props) => {
  let filterLC = props.filter.toLowerCase();
  const valitut = props.countries              
      .filter(maa => maa.name.common
          .toLowerCase().startsWith(filterLC))
    
  console.log(valitut.length);
  return (
      (valitut.length == 1)
        ? <MaaLisatieto 
          maa={valitut[0]} 
          key={valitut[0].name.common} />
        : <MaaLista maat={valitut} />      
    )
}

const MaaHaku = ({value, onChange}) => {
  return(
    <form>
      Maa: 
      <input 
        value={value} 
        onChange={onChange} 
      />        
    </form>      
  )
}

const App = () => {

  const [haku, setHaku] = useState('')
  const [countries, setCountries] = useState([])

  const hae = (event) => {
    console.log(event.target.value);
    setHaku(event.target.value)
  }

  useEffect(() => {
    restcountries
      .getAll()      
      .then(response => {        
        setCountries(response.data)        
      })
  }, [])

  return (
    <div className="App">
      <MaaHaku value={haku} onChange={hae} />
      <MaaTiedot countries={countries} filter={haku} />
    </div>
  );
}

export default App;