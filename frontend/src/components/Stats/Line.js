import React, { useEffect,useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';


export default function Example(props) {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData= () => {
          axios.get(`/stats/user/lastweek`)
                     .then((res)=>{
                       console.log(res.data)
                       setData(res.data.data);
                     })
                     .catch((err)=>console.log(err));
    };
    getData();
  }, [props])
  if(!data) return "";
  return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis domain={[0,'dataMax'+1]}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
     
      </LineChart>
    );

}
