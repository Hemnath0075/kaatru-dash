import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';

export default function RealtimeChart() {
  useEffect(() => {
    // Register the StreamingPlugin when the component mounts
    Chart.register(StreamingPlugin);
    return () => {
      // Unregister the plugin when the component unmounts
      Chart.unregister(StreamingPlugin);
    };
  }, []);

  return (
    <div>
      {/* Check if the chartData is available or provide some default data */}
      <Line
        data={{
          datasets: [
            {
              data: [],
            },
            {
              data: [],
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
            },
          },
        }}
      />
    </div>
  );
}
