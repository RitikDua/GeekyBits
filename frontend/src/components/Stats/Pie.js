import React, { useEffect,useState} from 'react';
import {
  PieChart, Pie, Sector, Cell,Tooltip
} from 'recharts';
import axios from 'axios';
export default function PieChartData(props)  {
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
active}) => {
  // console.log(active);
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(data[index]);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}% `}
    </text>
  );
};
function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].name}</p>

      </div>
    );
  }

  return null;
}
// 
  if(!data) return "loading...";
    return (
      <div style={{paddingBottom:"10%",paddingTop:"1%"}}>
      <PieChart width={300} height={300}>
            <Tooltip content={<CustomTooltip />}/>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) =>
             <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)
          }
        </Pie>
      </PieChart></div>
    );
  
}
