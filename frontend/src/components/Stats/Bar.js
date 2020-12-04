import React, { useEffect,useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';
const data = [
  {
    name: 'Page A', uv: 4000,  amt: 2400,
  },
  {
    name: 'Page B', uv: 3000,  amt: 2210,
  },
  {
    name: 'Page C', uv: 2000,  amt: 2290,
  },
  {
    name: 'Page D', uv: 2780,  amt: 2000,
  },
  {
    name: 'Page E', uv: 1890,  amt: 2181,
  },
  {
    name: 'Page F', uv: 2390,  amt: 2500,
  },
  {
    name: 'Page G', uv: 3490,  amt: 2100,
  },
];

export default function Example() {
   const [data, setData] = useState([])
   useEffect(() => {
     return () => {
       axios.get("/stats/user/attempts")
             .then((res)=>{
               console.log(res.data);;
               setData(res.data.count)
             })
             .catch((err)=>console.log(err))
     };
   }, [])
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
