import React, { useState, useEffect } from "react";
const {DrinkList} = require('./DrinkList');

export default function Menu({addToCart}) {

  return (
  <div>
    <h1 className="text-end me-4">Drink stock exchange</h1>
    <DrinkList />
  </div>
  );
}
