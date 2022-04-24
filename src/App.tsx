import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './map/Map';
import { Countries } from './countries/Countries';



function App() {

  const [data, _setData] = React.useState<any[]>([["Country", "Been"],]);

  React.useEffect(() => {
    const restored_data = window.sessionStorage.getItem("data");
    if(restored_data){
      _setData(JSON.parse(restored_data));
    }
  }, [])

  const setData = (data: any[]) => {
    _setData(data);
    window.sessionStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <React.Fragment>
      <Map data={data}/>
      <Countries data={data} setData={setData}/>
      </React.Fragment>
  );
}

export default App;
