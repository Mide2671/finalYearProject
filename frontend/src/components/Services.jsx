import { useState, useEffect } from "react";
import crawledData from "../assets/data.json";
import datas from "./data";
import axios from "axios";
function Services() {
  const [status, setStatus] =useState('0')
  const [num, setNum] = useState([]);
  const [crawlingId, setCrawlingId] = useState(0);
  const [result, setResult] = useState([]);
  const [updatedData, setUpdatedData] = useState([
    { id: datas[0].id, name:"Onion Site "+datas[0].id, url: datas[2].url, alert: "none", natureOfAttack:'' },
    { id: datas[1].id, name:"Onion Site "+datas[1].id, url: datas[1].url, alert: "none", natureOfAttack:''},
    { id: datas[2].id, name:"Onion Site "+datas[2].id, url: datas[2].url, alert: "none", natureOfAttack:'' },
    { id: datas[3].id, name:"Onion Site "+datas[3].id, url: datas[3].url, alert: "none", natureOfAttack:'' },
  ]);
  const updateAlert = (id, newAlert) => {
    const newData = [...updatedData];
    const index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      newData[index].alert = newAlert;
      console.log(newAlert)
      setUpdatedData(newData);
    }
  };
  const updateAttack = (id, newAttack) => {
    const newData = [...updatedData];
    const index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      newData[index].natureOfAttack = newAttack;
      console.log(newAttack)
      setUpdatedData(newData);
    }
  };
  function add() {
    setCrawlingId(crawlingId + 1);
  }

  const handleclick = () => {
    if (crawlingId < datas.length) setCrawlingId(crawlingId + 1);

  };
  async function getresult() {
    console.log( datas[crawlingId - 1].data)
    const { data } = await axios.post("http://localhost:1122/process", {
      data: datas[crawlingId - 1].data,
    });
    
    if (data.status !== false) {
      console.log(data)
      setResult([...result, data[0]]);
      updateAlert(crawlingId,data[0]  )
      updateAttack(crawlingId, data[1] )
      setNum([...num , crawlingId])
      if(crawlingId === 4){
        setStatus('1')
      }
    } else console.log("error");

    if (crawlingId < datas.length) {
      add();
    }
  }
  useEffect(() => {
    if (crawlingId === 0) {
      return;
    }
  
    getresult();
  }, [crawlingId]);


  return (
    <div className="container mx-auto mt-10 mb-10">
      <button
        onClick={handleclick}
        className="bg-green-500 hover:bg-green-700 text-white mb-3  float-end font-semibold py-2 px-4 rounded-full shadow-lg"
      >
        {status == 0? (1<=crawlingId?'Tracking':"Start Tracking"): "Done Tracking"}
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              S/N
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              URL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Alert
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Attack
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {updatedData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    num.includes(item.id)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {crawlingId === item.id ? (status == 0?'Processing': 'Done') :  (num.includes(item.id)?'Done':'pending')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.alert === "green"
                      ? "bg-green-300 text-green-900"
                      : "bg-red-300 text-red-900"
                  }`}
                >
                  {item.alert}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.natureOfAttack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;
