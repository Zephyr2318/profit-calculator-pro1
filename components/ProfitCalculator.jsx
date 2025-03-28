import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfitCalculator() {
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [rd, setRd] = useState(0);
  const [misc, setMisc] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("profitData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setPrice(data.price);
      setCost(data.cost);
      setRd(data.rd);
      setMisc(data.misc);
      setResult(data.result);
    }
  }, []);

  const calculateProfit = () => {
    const grossProfit = price - cost;
    const netProfit = grossProfit - rd - misc;
    const grossRate = ((grossProfit / price) * 100).toFixed(2);
    const netRate = ((netProfit / price) * 100).toFixed(2);

    const resultData = {
      grossProfit,
      netProfit,
      grossRate,
      netRate,
    };

    setResult(resultData);
    localStorage.setItem(
      "profitData",
      JSON.stringify({ price, cost, rd, misc, result: resultData })
    );
  };

  const clearData = () => {
    localStorage.removeItem("profitData");
    setPrice(0);
    setCost(0);
    setRd(0);
    setMisc(0);
    setResult(null);
  };

  return (
    <div className="p-6 grid gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">机械设备利润测算</h1>
      <Input
        type="number"
        placeholder="销售价格 (万)"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <Input
        type="number"
        placeholder="直接成本 (万)"
        value={cost}
        onChange={(e) => setCost(parseFloat(e.target.value))}
      />
      <Input
        type="number"
        placeholder="研发费用 (万)"
        value={rd}
        onChange={(e) => setRd(parseFloat(e.target.value))}
      />
      <Input
        type="number"
        placeholder="管理杂项费用 (万)"
        value={misc}
        onChange={(e) => setMisc(parseFloat(e.target.value))}
      />
      <Button onClick={calculateProfit}>计算利润</Button>
      <Button onClick={clearData} variant="outline">清空数据</Button>

      {result && (
        <Card className="mt-4">
          <CardContent className="p-4 grid gap-2">
            <div>毛利润：{result.grossProfit} 万</div>
            <div>毛利润率：{result.grossRate}%</div>
            <div>净利润：{result.netProfit} 万</div>
            <div>净利润率：{result.netRate}%</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
