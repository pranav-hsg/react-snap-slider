import { useState } from 'react'
import './App.css'
import { Slider } from 'react-snap-slider'
import { type ButtonProps } from 'react-snap-slider'
import { data } from './data'
function App() {
  const [count, setCount] = useState(0)
  const a: ButtonProps = { label: 'mango', onClick: () => { console.log("a") } };
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>

        <Slider >
          {data.map(e => {
            return <Slide d={e} key={e.id}></Slide>
          })}
        </Slider>

        <div style={{ width: '400px' }}>

          {/* <Slider>
            <h1>first</h1>
            <h1>second</h1>
            <h1>third</h1>
          </Slider> */}
        </div>
      </div>
    </>
  )
}

function Slide({ d }: { d: any }) {
  return (<div className="slider-wrapper" style={{ width: 200 + 'px' }}>
    <div className="slide-card">
      <img src={d.image} alt={d.caption} className="slide-image" />
      <div className="slide-caption">{d.caption}</div>
    </div>
  </div>)
}
export default App
