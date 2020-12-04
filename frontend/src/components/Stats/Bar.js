import React, { useEffect,useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';


export default function Example(props) {
   const [data, setData] = useState([])
   useEffect(() => {
         const getData= () => {
          axios.get(`/stats/user/attempts`)
                     .then((res)=>{
                       console.log(res.data.count)
                       setData(res.data.count);
                       
                     })
                     .catch((err)=>console.log(err));
    };
    getData();
   }, [props])
   if(!data) return "";
    return (
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    );

}
