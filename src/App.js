import React from 'react';
import './App.css';
import Plot from 'react-plotly.js';
// import json_ from "./json_plotly/scatter_data_label.json"
import json_ from "./json_plotly/bar_chart_color_bg.json"
// import json_ from "./json_plotly/line_chart.json"
import json_ from './json_plotly/bar_chart_modified.json'
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { HexColorPicker } from "react-colorful";
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { SketchPicker } from 'react-color'
import data_frame from "./json_plotly/df.json"
// import JSON

function App() {

  console.log(data_frame,"Printing Data Frame")
  console.log(json_,"printing json normal")
  // plot_bgcolor
  // json_["layout"]["template"]['layout']["paper_bgcolor"]
  // json_["layout"]["template"]['layout']["plot_bgcolor"]
  const list_of_color_section=["pg_bgcolor","plot_bgcolor","title","headingTitle"]
  // json_["data"][0]["visible"]= [true]
  const [data,setdata]=useState(json_["data"])
  let lay=json_['layout']
  lay["clickmode"]="select"
  const [layout,setlayout]=useState(lay)
  // const [layout,setlayout]=useState(json_["layout"])
  const [showDatalabel,setShowDatalabel]=useState(true)
  // const [config,setConfig]=useState(json_["config"])
  // const [setsection,selectsetsection]=useState()
  const [color_bg,setColor_bg]=useState("#fff")
  const [text,setText]=useState(json_["data"][0]["text"])

  console.log(layout)
  console.log(data)
  console.log(layout["template"]['layout']["paper_bgcolor"])

  const handleChangeComplete=(color)=>{
    // console.log(color)
    setColor_bg(color.hex)
  }

  const onchangeVgid=(e)=>{
    console.log(e)
    let h=layout
    h['xaxis']["showgrid"]= !layout['xaxis']["showgrid"]
    console.log(h)
    setlayout({...h})
}

const onchangeHgid=(e)=>{
  console.log(e)
  let h=layout
  h['yaxis']["showgrid"]= !layout['yaxis']["showgrid"]
  console.log(h)
  setlayout({...h})
}
const config={
  "scrollZoom":true,
  "editable":true,
  'modeBarButtonsToAdd': ['drawline',
  'drawopenpath',
  'drawclosedpath',
  'drawcircle',
  'drawrect',
  'eraseshape',
  "resetViewMapbox"

  ]
}

const toggleDataLabel=(e)=>{
  let dummy=data
  console.log(text)
  if (!showDatalabel){
    console.log("Setting Data")
    dummy[0]['text']=text
  }else{
    dummy[0]["text"]=[]
  }
  console.log(showDatalabel)
  setShowDatalabel(!showDatalabel)
  setdata(dummy)
 
}



  return (
    <div className="App">
      <div className="App-header">
      <div>
      <Switch onChange={onchangeVgid} checked={layout["xaxis"]["showgrid"]} />
      <Switch onChange={onchangeHgid} checked={layout["yaxis"]["showgrid"]} />
      <Switch onChange={toggleDataLabel} checked={showDatalabel} />
      </div>
            <Plot
        data={data}
        layout={layout}
        config={config}

      />
      <div className='color-picker-section' style={{"display":"flex"}}  >
      <SketchPicker  
              color={ color_bg }
              onChange={ handleChangeComplete }
      />     
      <FormGroup onChange={(e)=>{console.log(e)}} >
  <FormControlLabel control={<Checkbox defaultChecked />} label="Page Bg Color" />
  <FormControlLabel  control={<Checkbox />} label="Plot BG Color" />
  <FormControlLabel  control={<Checkbox />} label="Title Color" />
  <FormControlLabel  control={<Checkbox />} label="Font Color" />
</FormGroup>   
      </div>
      </div>
    </div>
  );
}

export default App;
