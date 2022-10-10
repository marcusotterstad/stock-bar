import React, { useState, useEffect } from "react";

export default function Menu() {
 const [data, setData] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((response) => setData(response.message));
  }
  fetchData();
   
 }, []);

 return (<div>{data}</div>);
}
