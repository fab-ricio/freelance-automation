import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function computeIntegral(alpha) {
  if (alpha > 1) {
    return alpha / (alpha ** 2 - 1);
  }
  return null;
}

const CourbeAlpha = () => {
  const [alpha, setAlpha] = useState(2);

  // Génération des points pour x dans [-5, 5]
  const data = useMemo(() => {
    const xs = [];
    const ys = [];
    for (let x = -5; x <= 5; x += 0.1) {
      const denom = x + Math.sqrt(x * x + 1);
      const y = 1 / Math.pow(denom, alpha);
      xs.push(Number(x.toFixed(2)));
      ys.push(y);
    }
    return { xs, ys };
  }, [alpha]);

  const chartData = {
    labels: data.xs,
    datasets: [
      {
        label: `f(x) = 1 / (x + sqrt(x² + 1))^${alpha}`,
        data: data.ys,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'x' },
        grid: { color: 'rgba(100,100,150,0.1)' },
      },
      y: {
        title: { display: true, text: 'f(x)' },
        grid: { color: 'rgba(100,100,150,0.1)' },
      },
    },
  };

  const integral = computeIntegral(alpha);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#181c2a]/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-lg flex flex-col gap-4 items-center">
      <h3 className="text-lg font-bold text-blue-200 mb-2">Courbe de f(x) = 1 / (x + √(x² + 1))^α</h3>
      <div className="w-full h-72 bg-white/5 rounded-xl p-2">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-between mt-2">
        <label className="flex items-center gap-2 text-blue-100 font-medium">
          α =
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.01}
            value={alpha}
            onChange={e => setAlpha(Number(e.target.value))}
            className="accent-blue-500 w-40"
          />
          <span className="w-10 text-center text-blue-300 font-mono">{alpha.toFixed(2)}</span>
        </label>
        <div className="text-sm text-blue-200 bg-blue-900/30 rounded-lg px-3 py-2">
          {alpha > 1 ? (
            <>
              Intégrale exacte : <span className="font-mono">{alpha} / ({alpha}² - 1) = {integral.toPrecision(6)}</span>
            </>
          ) : (
            <span className="text-red-300">L'intégrale n'est définie que pour α &gt; 1</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourbeAlpha;
