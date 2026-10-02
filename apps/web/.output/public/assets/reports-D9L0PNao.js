import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{g as t,m as n}from"./index-IHbHzuhm.js";import{t as r}from"./proxy-veWvDkYs.js";import{E as i,M as a,T as o,at as s,ct as c,n as l,t as u,ut as d,xt as f}from"./fi-CfdMX1W2.js";import{d as p,f as m,g as h,p as g,u as _}from"./smpApi-D04FL0d2.js";import{n as v}from"./SMPContext-BOWtKYn9.js";var y=e(t(),1),b=n(),x=`#4A0918`,S=`#C79A2B`;function C(e){return!e&&e!==0?`—`:`LKR `+Number(e).toLocaleString(`en-LK`,{minimumFractionDigits:2,maximumFractionDigits:2})}function w(e,t,n){let r=[n.map(e=>e.label).join(`,`),...e.map(e=>n.map(t=>{let n=t.key.split(`.`).reduce((e,t)=>e?.[t],e)??``;return`"${String(n).replace(/"/g,`""`)}"`}).join(`,`))],i=new Blob([r.join(`
`)],{type:`text/csv`}),a=document.createElement(`a`);a.href=URL.createObjectURL(i),a.download=`${t}_${new Date().toISOString().slice(0,10)}.csv`,a.click()}function T(e,t,n,r){let i=window.open(``,`_blank`);i.document.write(`
    <html><head><title>${e}</title>
    <style>
      @page { margin: 20mm 18mm; }
      body { font-family: Arial, sans-serif; padding: 0; color: #1a1a1a; font-size: 12px; }
      .header { border-bottom: 3px solid #C79A2B; padding-bottom: 14px; margin-bottom: 20px; }
      .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
      .logo-block { display: flex; align-items: center; gap: 12px; }
      .logo-box { width: 48px; height: 48px; background: #4A0918; border-radius: 10px;
                  display: flex; align-items: center; justify-content: center; }
      .logo-box span { color: #C79A2B; font-weight: 900; font-size: 15px; letter-spacing: 2px; }
      .org-name { font-size: 11px; color: #4A0918; font-weight: 700; letter-spacing: 0.5px; }
      .org-sub  { font-size: 10px; color: #777; margin-top: 2px; }
      .report-title { font-family: Georgia, serif; font-size: 20px; color: #4A0918;
                      font-weight: 700; margin: 14px 0 4px; }
      .report-meta  { font-size: 11px; color: #888; }
      ${r?`.subtitle { background: rgba(199,154,43,0.08); border-left: 4px solid #C79A2B;
                    padding: 8px 14px; margin-bottom: 18px; font-size: 11px; color: #4A0918;
                    border-radius: 0 6px 6px 0; }`:``}
      table { width: 100%; border-collapse: collapse; margin-top: 6px; }
      th { background: #4A0918; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
      td { padding: 6px 10px; border: 1px solid #e0d5c5; font-size: 11px; vertical-align: top; }
      tr:nth-child(even) td { background: #fdf9f0; }
      .footer { margin-top: 28px; border-top: 1px solid #e0d5c5; padding-top: 10px;
                display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 10px;
               font-size: 10px; font-weight: 700; }
      .badge-pending   { background: #FEF3C7; color: #92400E; }
      .badge-approved  { background: #D1FAE5; color: #065F46; }
      .badge-disposed  { background: #FEE2E2; color: #991B1B; }
      .badge-active    { background: #DBEAFE; color: #1E40AF; }
      .badge-completed { background: #F3F4F6; color: #374151; }
    </style></head><body>
    <div class="header">
      <div class="header-top">
        <div class="logo-block">
          <div class="logo-box"><span>SMP</span></div>
          <div>
            <div class="org-name">PLANNING SECRETARIAT — SOUTHERN PROVINCE</div>
            <div class="org-sub">Store Management System</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;color:#555">Report Generated</div>
          <div style="font-size:12px;font-weight:700;color:#4A0918">${new Date().toLocaleString(`en-LK`)}</div>
        </div>
      </div>
      <div class="report-title">${e}</div>
      <div class="report-meta">Confidential · Internal Use Only · Planning Secretariat, Southern Province</div>
    </div>
    ${r?`<div class="subtitle">${r}</div>`:``}
    <table>
      <thead><tr>${t.map(e=>`<th>${e}</th>`).join(``)}</tr></thead>
      <tbody>${n.map(e=>`<tr>${e.map(e=>`<td>${e??`—`}</td>`).join(``)}</tr>`).join(``)}</tbody>
    </table>
    <div class="footer">
      <span>Planning Secretariat Store Management System</span>
      <span>CONFIDENTIAL — Do not distribute</span>
      <span>Total records: ${n.length}</span>
    </div>
    </body></html>`),i.document.close(),i.print()}function E(e){let t=e.items||[],n=window.open(``,`_blank`);n.document.write(`
    <html><head><title>Asset Value Summary</title>
    <style>
      @page { margin: 20mm 18mm; }
      body { font-family: Arial, sans-serif; padding: 0; color: #1a1a1a; font-size: 12px; }
      .header { border-bottom: 3px solid #C79A2B; padding-bottom: 14px; margin-bottom: 20px; }
      h1 { font-family: Georgia, serif; font-size: 20px; color: #4A0918; margin: 14px 0 4px; }
      .org { font-size: 11px; color: #888; }
      .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
      .stat { background: rgba(74,9,24,0.04); border: 1px solid rgba(199,154,43,0.2); border-radius: 8px;
              padding: 14px; }
      .stat-label { font-size: 10px; color: #888; margin-bottom: 4px; }
      .stat-val   { font-size: 15px; font-weight: 700; color: #4A0918; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #4A0918; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
      td { padding: 6px 10px; border: 1px solid #e0d5c5; font-size: 11px; }
      tr:nth-child(even) td { background: #fdf9f0; }
      .footer { margin-top: 28px; border-top: 1px solid #e0d5c5; padding-top: 10px;
                font-size: 10px; color: #aaa; text-align: center; }
    </style></head><body>
    <div class="header">
      <div style="font-size:11px;color:#4A0918;font-weight:700">PLANNING SECRETARIAT — SOUTHERN PROVINCE &nbsp;|&nbsp; Store Management System</div>
      <h1>Asset Value Summary Report</h1>
      <div class="org">Generated: ${new Date().toLocaleString(`en-LK`)} &nbsp;·&nbsp; Confidential</div>
    </div>
    <div class="summary-grid">
      <div class="stat"><div class="stat-label">Total Stock Value (Purchase)</div><div class="stat-val">LKR ${Number(e.totalPurchaseValue||0).toLocaleString(`en-LK`,{minimumFractionDigits:2})}</div></div>
      <div class="stat"><div class="stat-label">Total Current Value</div><div class="stat-val">LKR ${Number(e.totalCurrentValue||0).toLocaleString(`en-LK`,{minimumFractionDigits:2})}</div></div>
      <div class="stat"><div class="stat-label">Items Tracked</div><div class="stat-val">${t.length}</div></div>
    </div>
    <table>
      <thead><tr><th>#</th><th>Item Name</th><th>SKU</th><th>Category</th><th>Qty</th><th>Purchase Value</th><th>Current Value</th></tr></thead>
      <tbody>${t.map((e,t)=>`<tr>
        <td>${t+1}</td>
        <td>${e.name}</td>
        <td>${e.sku||`—`}</td>
        <td>${e.category||`—`}</td>
        <td>${e.qty||0}</td>
        <td style="text-align:right">${e.purchaseValue?`LKR `+Number(e.purchaseValue).toLocaleString(`en-LK`,{minimumFractionDigits:2}):`—`}</td>
        <td style="text-align:right">${e.currentValue?`LKR `+Number(e.currentValue).toLocaleString(`en-LK`,{minimumFractionDigits:2}):`—`}</td>
      </tr>`).join(``)}</tbody>
    </table>
    <div class="footer">Planning Secretariat Store Management System · CONFIDENTIAL · Total items: ${t.length}</div>
    </body></html>`),n.document.close(),n.print()}var D=[{id:`inventory`,title:`Full Inventory Report`,desc:`All items with quantity, category, location and status`,icon:s,iconBg:`rgba(74,9,24,0.08)`,iconColor:x,fetch:async()=>(await p()).data,csvCols:[{label:`Name`,key:`name`},{label:`SKU`,key:`sku`},{label:`Category`,key:`category`},{label:`Qty`,key:`qty`},{label:`Available`,key:`availableQty`},{label:`Status`,key:`status`},{label:`Purchase Value`,key:`purchaseValue`},{label:`Current Value`,key:`currentValue`}],printHeaders:[`Name`,`SKU`,`Category`,`Qty`,`Available`,`Status`],printRows:e=>e.map(e=>[e.name,e.sku,e.category,e.qty,e.availableQty??e.qty,e.status]),printSubtitle:null},{id:`transactions`,title:`Stock Movement Report`,desc:`All stock in/out and item action history`,icon:u,iconBg:`rgba(245,158,11,0.08)`,iconColor:`#D97706`,fetch:async()=>(await g()).data,csvCols:[{label:`Date`,key:`createdAt`},{label:`Action`,key:`action`},{label:`Item`,key:`itemName`},{label:`Qty Before`,key:`qtyBefore`},{label:`Qty After`,key:`qtyAfter`},{label:`User`,key:`username`},{label:`Note`,key:`note`}],printHeaders:[`Date`,`Action`,`Item`,`Qty Before`,`Qty After`,`User`,`Note`],printRows:e=>e.map(e=>[new Date(e.createdAt).toLocaleString(`en-LK`),e.action,e.itemName,e.qtyBefore,e.qtyAfter,e.username,e.note||`—`])},{id:`disposal`,title:`Disposal Report`,desc:`Item disposal records with approval status and methods`,icon:f,iconBg:`rgba(220,38,38,0.08)`,iconColor:`#DC2626`,fetch:async()=>(await _()).data,csvCols:[{label:`Date`,key:`disposalDate`},{label:`Item`,key:`itemName`},{label:`SKU`,key:`sku`},{label:`Qty`,key:`qty`},{label:`Method`,key:`disposalMethod`},{label:`Reason`,key:`disposalReason`},{label:`Institute`,key:`institute`},{label:`Authorized By`,key:`authorizedBy`},{label:`Status`,key:`status`},{label:`Approved By`,key:`approvedBy`},{label:`Est. Value`,key:`estimatedDisposalValue`},{label:`Disposed By`,key:`disposedBy`}],printHeaders:[`Date`,`Item`,`SKU`,`Qty`,`Method`,`Reason`,`Institute`,`Auth. By`,`Status`,`Est. Value`],printRows:e=>e.map(e=>[e.disposalDate?new Date(e.disposalDate).toLocaleDateString(`en-LK`):`—`,e.itemName,e.sku||`—`,e.qty,e.disposalMethod,e.disposalReason,e.institute||`—`,e.authorizedBy||`—`,e.status,e.estimatedDisposalValue?`LKR ${Number(e.estimatedDisposalValue).toLocaleString(`en-LK`,{minimumFractionDigits:2})}`:`—`])},{id:`login_logs`,title:`Login Activity Report`,desc:`User login/logout history (28-day retention)`,icon:l,iconBg:`rgba(139,92,246,0.08)`,iconColor:`#7C3AED`,adminOnly:!0,fetch:async()=>(await m()).data,csvCols:[{label:`Username`,key:`username`},{label:`Status`,key:`status`},{label:`Login Time`,key:`loginTime`},{label:`Logout Time`,key:`logoutTime`},{label:`IP`,key:`ip`},{label:`Device`,key:`deviceInfo`}],printHeaders:[`Username`,`Status`,`Login Time`,`Logout Time`,`IP`,`Device`],printRows:e=>e.map(e=>[e.username,e.status,new Date(e.loginTime).toLocaleString(`en-LK`),e.logoutTime?new Date(e.logoutTime).toLocaleString(`en-LK`):`Active`,e.ip,(e.deviceInfo||``).slice(0,60)])}];function O({report:e,onCsv:t,onPrint:n,busy:a}){let o=e.icon;return(0,b.jsxs)(r.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.25},style:{background:`#fff`,borderRadius:12,border:`1px solid rgba(74,9,24,0.1)`,boxShadow:`0 2px 10px rgba(74,9,24,0.05)`,overflow:`hidden`},children:[(0,b.jsxs)(`div`,{style:{padding:`1rem 1.25rem`,borderBottom:`1px solid rgba(74,9,24,0.07)`,background:`rgba(74,9,24,0.015)`,display:`flex`,alignItems:`center`,gap:10},children:[(0,b.jsx)(`div`,{style:{width:38,height:38,borderRadius:10,background:e.iconBg,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,b.jsx)(o,{size:17,color:e.iconColor})}),(0,b.jsxs)(`div`,{style:{flex:1},children:[(0,b.jsx)(`p`,{style:{fontFamily:`'Playfair Display',serif`,fontSize:`0.9rem`,fontWeight:700,color:x},children:e.title}),(0,b.jsx)(`p`,{style:{fontSize:`0.71rem`,color:`rgba(74,9,24,0.45)`,marginTop:2,lineHeight:1.4},children:e.desc})]}),e.adminOnly&&(0,b.jsx)(`span`,{style:{fontSize:`0.65rem`,background:`rgba(220,38,38,0.08)`,color:`#DC2626`,border:`1px solid rgba(220,38,38,0.2)`,borderRadius:6,padding:`2px 7px`,fontWeight:700,flexShrink:0},children:`ADMIN`})]}),(0,b.jsxs)(`div`,{style:{padding:`0.875rem 1.25rem`,display:`flex`,gap:8},children:[(0,b.jsxs)(`button`,{onClick:t,disabled:a.csv,style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6,padding:`8px`,borderRadius:8,border:`1.5px solid ${S}`,background:`transparent`,color:S,fontSize:`0.78rem`,fontWeight:600,cursor:a.csv?`not-allowed`:`pointer`,fontFamily:`Inter,sans-serif`,opacity:a.csv?.6:1,transition:`all 0.15s`},onMouseEnter:e=>{a.csv||(e.currentTarget.style.background=`rgba(199,154,43,0.08)`)},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:[(0,b.jsx)(i,{size:13}),` `,a.csv?`Exporting…`:`Export CSV`]}),(0,b.jsxs)(`button`,{onClick:n,disabled:a.print,style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6,padding:`8px`,borderRadius:8,border:`none`,background:a.print?`rgba(74,9,24,0.4)`:`linear-gradient(135deg,${x} 0%,#6E1528 100%)`,color:`#fff`,fontSize:`0.78rem`,fontWeight:600,cursor:a.print?`not-allowed`:`pointer`,fontFamily:`Inter,sans-serif`,boxShadow:a.print?`none`:`0 3px 12px rgba(74,9,24,0.22)`},children:[(0,b.jsx)(c,{size:13}),` `,a.print?`Preparing…`:`Print Report`]})]})]})}function k({data:e,loading:t,onRefresh:n,onPrint:r}){if(t)return(0,b.jsx)(`div`,{style:{background:`#fff`,borderRadius:12,border:`1px solid rgba(74,9,24,0.1)`,padding:`2rem`,textAlign:`center`,color:`rgba(74,9,24,0.4)`,fontSize:`0.85rem`},children:`Loading value summary…`});if(!e)return null;let a=[{label:`Total Purchase Value`,value:C(e.totalPurchaseValue),color:x},{label:`Total Current Value`,value:C(e.totalCurrentValue),color:`#059669`},{label:`Items Tracked`,value:(e.items||[]).length,color:S}];return(0,b.jsxs)(`div`,{style:{background:`#fff`,borderRadius:12,border:`1px solid rgba(74,9,24,0.1)`,boxShadow:`0 2px 10px rgba(74,9,24,0.05)`,overflow:`hidden`},children:[(0,b.jsxs)(`div`,{style:{padding:`1rem 1.25rem`,borderBottom:`1px solid rgba(74,9,24,0.07)`,background:`rgba(74,9,24,0.015)`,display:`flex`,alignItems:`center`,gap:10},children:[(0,b.jsx)(`div`,{style:{width:38,height:38,borderRadius:10,background:`rgba(199,154,43,0.1)`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,b.jsx)(o,{size:17,color:S})}),(0,b.jsxs)(`div`,{style:{flex:1},children:[(0,b.jsx)(`p`,{style:{fontFamily:`'Playfair Display',serif`,fontSize:`0.9rem`,fontWeight:700,color:x},children:`Asset Value Summary`}),(0,b.jsx)(`p`,{style:{fontSize:`0.71rem`,color:`rgba(74,9,24,0.45)`,marginTop:2},children:`Purchase value and current value tracking`})]}),(0,b.jsx)(`button`,{onClick:n,style:{background:`none`,border:`none`,cursor:`pointer`,color:`rgba(74,9,24,0.4)`,padding:6,display:`flex`,borderRadius:6,transition:`all 0.15s`},onMouseEnter:e=>{e.currentTarget.style.color=x,e.currentTarget.style.background=`rgba(74,9,24,0.05)`},onMouseLeave:e=>{e.currentTarget.style.color=`rgba(74,9,24,0.4)`,e.currentTarget.style.background=`none`},children:(0,b.jsx)(d,{size:14})})]}),(0,b.jsxs)(`div`,{style:{padding:`1rem 1.25rem`},children:[(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:10,marginBottom:16},children:a.map(e=>(0,b.jsxs)(`div`,{style:{background:`rgba(74,9,24,0.02)`,border:`1px solid rgba(74,9,24,0.07)`,borderRadius:10,padding:`12px 14px`},children:[(0,b.jsx)(`p`,{style:{fontSize:`0.7rem`,color:`rgba(74,9,24,0.5)`,marginBottom:5},children:e.label}),(0,b.jsx)(`p`,{style:{fontSize:`0.95rem`,fontWeight:700,color:e.color,fontFamily:`'Playfair Display',serif`},children:e.value})]},e.label))}),(e.items||[]).length>0&&(0,b.jsx)(`div`,{style:{overflowX:`auto`},children:(0,b.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.78rem`},children:[(0,b.jsx)(`thead`,{children:(0,b.jsx)(`tr`,{children:[`Item`,`Category`,`Qty`,`Purchase Value`,`Current Value`].map(e=>(0,b.jsx)(`th`,{style:{padding:`8px 10px`,background:`rgba(74,9,24,0.04)`,borderBottom:`2px solid rgba(74,9,24,0.1)`,textAlign:`left`,fontSize:`0.7rem`,fontWeight:700,color:x,whiteSpace:`nowrap`},children:e},e))})}),(0,b.jsx)(`tbody`,{children:e.items.map((e,t)=>(0,b.jsxs)(`tr`,{style:{borderBottom:`1px solid rgba(74,9,24,0.06)`},children:[(0,b.jsx)(`td`,{style:{padding:`7px 10px`,fontWeight:600,color:x},children:e.name}),(0,b.jsx)(`td`,{style:{padding:`7px 10px`,color:`rgba(74,9,24,0.6)`},children:e.category||`—`}),(0,b.jsx)(`td`,{style:{padding:`7px 10px`,color:`rgba(74,9,24,0.6)`},children:e.qty}),(0,b.jsx)(`td`,{style:{padding:`7px 10px`,color:`rgba(74,9,24,0.7)`,textAlign:`right`},children:e.purchaseValue?C(e.purchaseValue):`—`}),(0,b.jsx)(`td`,{style:{padding:`7px 10px`,color:`#059669`,textAlign:`right`,fontWeight:500},children:e.currentValue?C(e.currentValue):`—`})]},e.id||t))})]})}),(0,b.jsxs)(`div`,{style:{marginTop:14,display:`flex`,gap:8},children:[(0,b.jsxs)(`button`,{onClick:()=>w(e.items||[],`value_summary`,[{label:`Name`,key:`name`},{label:`SKU`,key:`sku`},{label:`Category`,key:`category`},{label:`Qty`,key:`qty`},{label:`Purchase Value`,key:`purchaseValue`},{label:`Current Value`,key:`currentValue`}]),style:{display:`flex`,alignItems:`center`,gap:6,padding:`8px 16px`,borderRadius:8,border:`1.5px solid ${S}`,background:`transparent`,color:S,fontSize:`0.78rem`,fontWeight:600,cursor:`pointer`,fontFamily:`Inter,sans-serif`,transition:`all 0.15s`},onMouseEnter:e=>{e.currentTarget.style.background=`rgba(199,154,43,0.08)`},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:[(0,b.jsx)(i,{size:13}),` Export CSV`]}),(0,b.jsxs)(`button`,{onClick:r,style:{display:`flex`,alignItems:`center`,gap:6,padding:`8px 16px`,borderRadius:8,border:`none`,background:`linear-gradient(135deg,${x} 0%,#6E1528 100%)`,color:`#fff`,fontSize:`0.78rem`,fontWeight:600,cursor:`pointer`,fontFamily:`Inter,sans-serif`,boxShadow:`0 3px 12px rgba(74,9,24,0.22)`},children:[(0,b.jsx)(c,{size:13}),` Print Value Report`]})]})]})]})}function A(){let{isAdmin:e}=v(),[t,n]=(0,y.useState)({}),[r,i]=(0,y.useState)(null),[o,s]=(0,y.useState)(!0),c=async()=>{s(!0);try{let e=await h();i(e.data)}catch{i(null)}finally{s(!1)}};(0,y.useEffect)(()=>{c()},[]);let l=async(e,t)=>{let r=`${e.id}_${t}`;n(e=>({...e,[r]:!0}));try{let n=await e.fetch();t===`csv`&&w(n,e.id,e.csvCols),t===`print`&&T(e.title,e.printHeaders,e.printRows(n),e.printSubtitle)}finally{n(e=>({...e,[r]:!1}))}},u=e?D:D.filter(e=>!e.adminOnly);return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:20},children:[(0,b.jsxs)(`div`,{style:{background:`#fff`,borderRadius:12,border:`1px solid rgba(74,9,24,0.1)`,padding:`1rem 1.25rem`,display:`flex`,alignItems:`center`,gap:12},children:[(0,b.jsx)(`div`,{style:{width:40,height:40,borderRadius:10,background:`rgba(199,154,43,0.1)`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,b.jsx)(a,{size:18,color:S})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{style:{fontFamily:`'Playfair Display',serif`,fontSize:`1rem`,fontWeight:700,color:x},children:`Reports & Exports`}),(0,b.jsx)(`p`,{style:{fontSize:`0.73rem`,color:`rgba(74,9,24,0.5)`,marginTop:2},children:`Generate, print, and export inventory and activity reports`})]})]}),(0,b.jsx)(k,{data:r,loading:o,onRefresh:c,onPrint:()=>r&&E(r)}),(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(300px, 1fr))`,gap:16},children:u.map(e=>(0,b.jsx)(O,{report:e,busy:{csv:!!t[`${e.id}_csv`],print:!!t[`${e.id}_print`]},onCsv:()=>l(e,`csv`),onPrint:()=>l(e,`print`)},e.id))})]})}var j=A;export{j as component};