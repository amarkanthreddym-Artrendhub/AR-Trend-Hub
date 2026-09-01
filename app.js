const cards=[
{id:"hdfc-millennia",bank:"HDFC Bank",name:"HDFC Millennia",type:"Cashback",status:"Draft",highlights:["5% on specified eligible merchants","1% on eligible other spends","₹1,000 cycle cap for 5% category","₹1,000 cycle cap for 1% category"],best:"Online shopping",fee:1000,rate5:.05,rate1:.01},
{id:"sbi-cashback",bank:"SBI Card",name:"SBI Cashback",type:"Cashback",status:"Research",highlights:["Cashback-focused card","Card-specific exclusions and caps"],best:"Online spending",fee:null,rate5:0,rate1:0},
{id:"amazon-pay-icici",bank:"ICICI Bank",name:"Amazon Pay ICICI",type:"Co-brand",status:"Research",highlights:["Amazon co-brand","Reward rules vary by transaction/category"],best:"Amazon ecosystem",fee:null,rate5:0,rate1:0}
];
const selected=new Set(["hdfc-millennia"]);
function render(){
 const q=(document.getElementById("search").value||"").toLowerCase();
 const grid=document.getElementById("cardGrid"); grid.innerHTML="";
 cards.filter(c=>(c.name+" "+c.bank+" "+c.type).toLowerCase().includes(q)).forEach(c=>{
  const el=document.createElement("article");el.className="card";
  el.innerHTML=`<span class="tag">${c.type}</span> <span class="tag">${c.status}</span><h3>${c.name}</h3><p class="muted">${c.bank} • Best for ${c.best}</p><ul>${c.highlights.map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn ${selected.has(c.id)?"primary":""}" onclick="toggle('${c.id}')">${selected.has(c.id)?"✓ Selected":"Select for Compare"}</button>`;
  grid.appendChild(el);
 });
 const sel=cards.filter(c=>selected.has(c.id)).slice(0,3);
 document.getElementById("compareTable").innerHTML=sel.length?`<table style="width:100%;border-collapse:collapse"><tr><th style="text-align:left;padding:10px">Feature</th>${sel.map(c=>`<th style="padding:10px">${c.name}</th>`).join("")}</tr>
 <tr><td style="padding:10px">Type</td>${sel.map(c=>`<td style="padding:10px">${c.type}</td>`).join("")}</tr>
 <tr><td style="padding:10px">Best for</td>${sel.map(c=>`<td style="padding:10px">${c.best}</td>`).join("")}</tr>
 <tr><td style="padding:10px">Annual fee</td>${sel.map(c=>`<td style="padding:10px">${c.fee==null?"Verify": "₹"+c.fee+" + applicable taxes"}</td>`).join("")}</tr></table>`:"<p class='muted'>Select cards above.</p>";
 const select=document.getElementById("calcCard");select.innerHTML=cards.map(c=>`<option value="${c.id}">${c.name}</option>`).join("");
}
function toggle(id){if(selected.has(id)){selected.delete(id)}else if(selected.size<3){selected.add(id)}else{alert("Compare up to 3 cards.")}render()}
function calculate(){
 const c=cards.find(x=>x.id===document.getElementById("calcCard").value);
 const s5=Math.max(0,Number(document.getElementById("spend5").value)||0);
 const s1=Math.max(0,Number(document.getElementById("spend1").value)||0);
 const r5=Math.min(s5*c.rate5,1000),r1=Math.min(s1*c.rate1,1000),total=r5+r1;
 document.getElementById("calcResult").innerHTML=`<b>${c.name}</b><br>Estimated cashback: <b>₹${total.toFixed(2)}</b><br><span class="muted">This is a demonstration calculation. Final live calculations must use the card's verified current terms, exclusions, caps and applicable taxes/fees.</span>`;
}
document.getElementById("search").addEventListener("input",render);render();calculate();