import './OSX.css';
import apple from './apple.png'
import * as si from 'systeminformation';
import { useEffect, useState } from 'react';
import * as util from 'util';
import { exec } from 'child_process';

function nearestPowerOf2(num: number) {
  return Math.pow(2, Math.round(Math.log(num) / Math.log(2)));
}
function titleCase(str: string) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
function App() {
  const [speed, setSpeed] = useState<string>()
  const [model, setModel] = useState<string>()
  const [gpu, setGPU] = useState<string>()
  const [osinfo, setOsInfo] = useState<si.Systeminformation.OsData>();
  const [std, setStd] = useState<string>();
  useEffect(() => {
    si.cpu().then(cpu => {
      setSpeed(`${cpu.speedMax} GHz`)
      setModel(`${cpu.manufacturer} ${cpu.manufacturer === "AMD" ? cpu.brand.match(/^(.*)\s\d+-Core Processor$/)![1] : cpu.brand}`)
    });
    si.graphics().then(gpus => {
      const gpu = gpus.controllers[0];
      setGPU(`${Math.round(gpu.vram! / 1000)} GB ${gpu.name}`)
    });
    si.osInfo().then(osinfo => {
      setOsInfo(osinfo);
    });
    exec(`awk '$2 == "/"' /proc/self/mounts`, (err, stdout, stderr) => {
      setStd(stdout.split(' ')[0]);
    })
  }, [])
  return (
    <div className="container">
      <div id="titlebar">
        <div id="buttons">
          <div id="close" onClick={() => window.close()}>
            x
          </div>
        </div>
        <div id="window-title">
          <div>About This Mac</div>
        </div>
      </div>
      <div id="window">
        <div id="content">
          <img id="apple-logo" alt="The Apple Logo" src={apple} />
          <div id="title">{(() => {
            switch (osinfo?.platform) {
              case "linux": {
                return "Linux"
              }
              case "darwin": {
                return "Mac OS X"
              }
              case "win32": {
                return "Windows"
              }
            }
          })()}</div>
          <div id="subtitle">Version {osinfo?.kernel}</div>
          <button onClick={() => {
            exec('/usr/bin/kitty /usr/bin/bash -c \"sudo pacman -Syu; read -n 1 -s -r -p \\\"Done! Press any key to continue.\\\"\"')
          }}>Software Update...</button>
          <table className="hardware">
            <tbody>
              <tr>
                <td className="key">Processor</td>
                <td className="value">{`${speed} ${model}`}</td>
              </tr>
              <tr>
                <td className="key">Graphics</td>
                <td className="value">{gpu}</td>
              </tr>
              <tr>
                <td className="key">Boot Disk</td>
                <td className="value">{std}</td>
              </tr>
            </tbody>
          </table>
          <button style={{ marginTop: -10 }} onClick={() => {
            exec('/usr/bin/kitty /usr/bin/bash -c \"neofetch; read -n 1 -s -r -p \\\"Press any key to continue.\\\"\"')
          }}>More Info...</button>
          <div id="footer">
            {`TM and © 1983-${(new Date()).getFullYear()} madzzz <33`} <br />
            All Rights Reserved. {'(but not really)'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
