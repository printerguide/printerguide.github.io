const issues=[
{k:'New printer setup',d:'Get a new printer ready to use.',t:'Most setups take 10 to 15 minutes.',s:[
'Unbox the printer and remove all tape and protective film.',
'Install the ink or toner cartridges.',
'Load plain paper in the input tray and plug in the power cable.',
'Power on and choose language and region on the printer screen.',
'Let the printer run its alignment or cleaning cycle and print the test page.',
'Connect by USB, Wi-Fi or Ethernet.',
'Install the driver or app from your printer maker\u2019s own website.']},
{k:'Fix offline printer',d:'Bring it back online.',t:'"Offline" usually means the computer can\u2019t reach the printer. It is often a quick fix.',s:[
'Confirm the printer is on and shows no error lights.',
'Check the USB cable or the printer\u2019s Wi-Fi status.',
'Turn off the printer, router and computer, then turn them on in that order.',
'Windows: open Printers & scanners, select the printer, open Print queue and make sure Use Printer Offline is not ticked.',
'Cancel any stuck jobs in the print queue and try again.',
'Select the printer and choose Set as default.',
'Update or reinstall the driver from the manufacturer\u2019s website.',
'Reconnect the printer to Wi-Fi if the network name or password changed.']},
{k:'Connect to Wi-Fi',d:'Join your home network.',t:'If the printer isn\u2019t found, restart it and the router, and move it closer.',s:[
'Make sure the router is on and your PC or phone is on the same network.',
'On the printer panel, open Settings, then Network, Wireless or Wi-Fi Setup.',
'Select your network name.',
'Enter the password carefully. It is case-sensitive. Many printers support 2.4 GHz only.',
'Wait for the Wi-Fi light to stop blinking and stay solid.',
'On your computer, go to Printers & scanners and choose Add device.',
'Print a test page to confirm the connection.']},
{k:'Paper jam',d:'Clear it and stop repeats.',t:'Always pull paper in the direction of its normal path, slowly, to avoid tearing.',s:[
'Turn the printer off and unplug it.',
'Open all access doors and remove the tray.',
'Gently pull out the jammed paper with both hands. Check for torn scraps.',
'Look inside for small pieces and remove them.',
'Fan the paper stack, remove any curled or damp sheets, and reload.',
'Slide the paper guides snug against the stack.',
'Close everything, plug in and print a test page.']}];
const osd=[
{n:'Windows',p:'Settings \u2192 Bluetooth & devices \u2192 Printers & scanners \u2192 Add device. Select your printer and wait for the driver to install.'},
{n:'Mac',p:'System Settings \u2192 Printers & Scanners \u2192 Add Printer. Choose it from the list. macOS uses AirPrint automatically for most models.'},
{n:'Android',p:'Settings \u2192 Connected devices \u2192 Connection preferences \u2192 Printing. Turn on the default print service or install your maker\u2019s app.'},
{n:'iPhone / iPad',p:'Open any document, tap Share \u2192 Print \u2192 Select Printer. AirPrint printers on the same Wi-Fi appear automatically.'}];
const $=s=>document.querySelector(s);
let cur=0;const state=issues.map(()=>[]);
function pick(i){cur=i;
$('#picks').innerHTML=issues.map((x,j)=>`<button role="tab" aria-selected="${j===i}" data-i="${j}"><b>${x.k}</b><span>${x.d}</span></button>`).join('');
const x=issues[i];
$('#panel').innerHTML=`<div class="bar"><div id="fill"></div></div><div class="prog"><span id="cnt"></span><span>${x.s.length} steps</span></div>
<ul class="steps">${x.s.map((s,j)=>`<li><label><input type="checkbox" data-j="${j}" ${state[i][j]?'checked':''}><span>${s}</span></label></li>`).join('')}</ul>
<div class="tip"><b>Tip:</b> ${x.t}</div><div class="done" id="done">All steps complete. If it still isn\u2019t working, contact your printer maker\u2019s official support.</div>
<button class="reset" id="reset">Reset checklist</button>`;
upd()}
function upd(){const n=state[cur].filter(Boolean).length,t=issues[cur].s.length;
$('#fill').style.width=(n/t*100)+'%';$('#cnt').textContent=n+' of '+t+' done';
$('#done').style.display=n===t?'block':'none'}
$('#picks').addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(+b.dataset.i)});
$('#panel').addEventListener('change',e=>{if(e.target.dataset.j!==undefined){state[cur][+e.target.dataset.j]=e.target.checked;upd()}});
$('#panel').addEventListener('click',e=>{if(e.target.id==='reset'){state[cur]=[];pick(cur)}});
function os(i){$('#os').innerHTML=osd.map((x,j)=>`<button role="tab" aria-selected="${j===i}" data-i="${j}">${x.n}</button>`).join('');
$('#osbody').innerHTML=`<h3>${osd[i].n}</h3><p>${osd[i].p}</p>`}
$('#os').addEventListener('click',e=>{const b=e.target.closest('button');if(b)os(+b.dataset.i)});
$('#theme').addEventListener('click',()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dark?'light':'dark'});
pick(0);os(0);
