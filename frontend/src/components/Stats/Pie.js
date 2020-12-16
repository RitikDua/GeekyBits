
import React, { useEffect,useState} from 'react';

import axios from 'axios';
import { ResponsiveContainer,Cell, PieChart, Pie } from "recharts";


// const data = [{ name: "network 1", value: 2 }, { name: "network 3", value: 4 }];

export default function PieData(props){

  const [data, setData] = useState([])
  useEffect(() => {
    const getData= () => {
          axios.get(`/stats/user/accuracy`)
                     .then((res)=>{
                       console.log(res.data.count)
                       
                       let arr=[];
                       for(let i=0;i<res.data.count.length;i++)
                       arr.push({"name":res.data.count[i]._id,"value":res.data.count[i].count})
                       setData(arr);
                       
                     })
                     .catch((err)=>console.log(err));
    };
    getData();
  }, [props])

const COLORS={
  "correct":"#1c8c0e",
  "wrong":"#e56255",
  "compiler error":"#a5a09e",
  "runtime error":"#f7750f"
}

   if(!data||data.length==0) return (
       <div >
       </div>);
  return  (
  <ResponsiveContainer width="100%" height={350} style={{paddingRight:"30px"}}>
    <PieChart height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          percent,
          index
        }) => {

          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {data[index].name} ({`${Math.round((percent * 100).toFixed(1))}%`})
            </text>
          );
        }}
      >
       {
            data.map((entry, index) =>
             <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)
          }
      </Pie>
    </PieChart>
  </ResponsiveContainer>);
}
