import React, { useEffect,useState } from 'react';
import {
  ResponsiveContainer,BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';


export default function Example(props) {
   const [data, setData] = useState([])
   useEffect(() => {
         const getData= () => {
          axios.get(`/stats/user/attempts`)
                     .then((res)=>{
                       console.log(!data)
                       setData(res.data.count);
                       
                     })
                     .catch((err)=>console.log(err));
    };
    getData();
   }, [props])
   
   if(!data||data.length==0) return (
       <div>
       </div>);
    return (
      <ResponsiveContainer width="100%" height={350}>
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
      </ResponsiveContainer>
    );

}
