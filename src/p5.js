/* ================= SCENES VII - IX ================= */
/* ---------- EPISODE VII : STARKILLER BASE ---------- */
SC.push((()=>{
 let L0,L1,L2,L3,L4;const STARS=mkStars(120,71,0,110);
 const cfg={cx:255,y:226,g0:76,g1:48,roam:12,T:1.7,hop:7,seed:7,spk:'#d8f0ff'};
 return{num:'VII',title:'THE FORCE AWAKENS',place:'STARKILLER BASE',acc:'#9fd8ff',
 init(){
  L0=mkLayer(()=>{fillGrad(0,206,S('#040918','#0c1e46','#2a5088','#7fb0d8','#d8ecf8'));rect(X0,206,X1-X0,H-206,C('#d8ecf8'));
   ridge(158,58,3.3,[C('#5c7aa8'),C('#e8f4ff'),C('#3a5480'),C('#2a4068')],{fx:.02,oct:5,fade:60})});
  L1=mkLayer(()=>{const r=rng(11);for(let x=X0;x<X1;x+=7){const h=34+r()*36;pine(x+r()*5,198,h,16+r()*8,C('#0e2040'),C('#6a8ab8'))}});
  L2=mkLayer(()=>{const r=rng(12);for(let x=X0-10;x<X1;x+=24){const h=76+r()*64;pine(x+r()*8,210,h,36+r()*14,C('#081630'),C('#9ec0e8'))}});
  L3=mkLayer(()=>{fillGrad(206,H,S('#9cc0e4','#d8ecfa','#b8d4ee','#8ab0da'));const r=rng(5);
   for(let i=0;i<420;i++){const x=X0+r()*(X1-X0),y=208+r()*62,rx=3+r()*12;dell(x,y,rx,1+r()*2,C(r()>.5?'#f2faff':'#86a8d0'),.55)}
   let x=330,y=216;for(let i=0;i<9;i++){const nx=x+12+r()*10,ny=y+3+r()*5;tline(x,y,nx,ny,C('#3a0e12'),3);line(x,y,nx,ny,C('#ff6a30'));x=nx;y=ny}
   for(let i=0;i<40;i++){const px_=X0+r()*(X1-X0),py=214+r()*50;dpx(px_,py,C('#5a7ea8'),1)}});
  L4=mkLayer(()=>{rect(-26,0,44,H,C('#050a18'));rect(14,0,2,H,C('#9ec0e8'));for(let y=0;y<H;y+=17)dell(-4+((y*7)%13),y,8,2,C('#dff0ff'),.7);
   rect(W-16,0,46,H,C('#050a18'));rect(W-16,0,2,H,C('#9ec0e8'));for(let y=8;y<H;y+=19)dell(W+8-((y*5)%11),y,8,2,C('#dff0ff'),.7);
   pine(20,86,96,86,C('#050a18'),C('#cfe6ff'));pine(W-14,70,80,80,C('#050a18'),C('#cfe6ff'))})},
 draw(u){
  const cm=camx(u,6,50,.7),bo=-round(cm);
  blit(L0,-round(cm*.1));twStars(STARS,u,-cm,.1,[0,10,30]);
  glow(410-round(cm*.1),200,150,[255,70,40],.3+.12*sin(u*1.3),2,50);
  blit(L1,-round(cm*.3));mist(150,56,[190,220,250],.38,u,4,.016,3);
  blit(L2,-round(cm*.6));blit(L3,bo);
  glow(400+bo,226,70,[255,80,40],.5+.15*sin(u*2),2,12);
  cfg.cx=255+bo;const s=drawDuel(u,cfg,CH.kylo,CH.rey);
  glow(s.xa,s.y+2,50,[255,60,60],.42,2,11);glow(s.xb,s.y+2,50,[70,150,255],.5,2,11);glow((s.xa+s.xb)/2,s.y+2,60,[190,150,255],.18,2,9);
  refl(s.y,10,.22,.8,0,0,u);
  mist(206,40,[210,235,255],.28,u,10,.02,7);
  const gk=pow(sin(u*.28)*.5+.5,3);
  for(let L=0;L<3;L++){const n=[120,90,60][L],sp=[26,44,70][L],wd=[10,18,30][L];for(let i=0;i<n;i++){const x=mod(hsh(i,L,1)*W+u*(wd+gk*60)+sin(u*.9+i)*4,W),y=mod(hsh(i,L,2)*H+u*sp,H),c=C(L===0?'#c8e0f8':'#ffffff');px(x,y,c);if(L===2&&(i%3===0)){px(x+1,y,c);px(x,y+1,c)}}}
  for(let i=0;i<40;i++){const y=hsh(i,3,3)*H,x=mod(hsh(i,4,3)*W+u*190,W);dline(x,y,x-9,y+1,C('#e8f4ff'),gk*.8)}
  blit(L4,-round(cm*1.6))}}
})());
/* ---------- EPISODE VIII : SUPREME LEADER'S THRONE ROOM ---------- */
SC.push((()=>{
 let L0,L1,L2,L3;const CURT=S('#4a060c','#7a0e16','#a8161f','#c82a30');
 const cf1={anchor:'B',at:230,g0:72,g1:46,T:1.7,hop:7,y:218,seed:8,spk:'#ffd060'},cf2={anchor:'A',at:252,g0:72,g1:46,T:1.9,hop:7,y:218,seed:9,spk:'#ffd060'};
 const GOLD=C('#d8a530');
 return{num:'VIII',title:'THE LAST JEDI',place:"SUPREME LEADER'S THRONE ROOM",acc:'#e02a30',
 init(){
  L0=mkLayer(()=>{fillGrad(0,206,S('#3a0508','#6b0a10','#8a1018','#4a060a'));
   for(let x=-30;x<W+40;x+=60){rect(x,0,10,206,C('#520a10'));rect(x+10,0,1,206,GOLD);rect(x-1,0,1,206,GOLD)}
   rect(X0,20,X1-X0,3,GOLD);rect(X0,24,X1-X0,1,C('#7a5a18'));
   ell(240,124,96,100,C('#2a0306'));for(let a=0;a<TAU;a+=.012){px(240+cos(a)*97,124+sin(a)*101,GOLD);px(240+cos(a)*93,124+sin(a)*97,C('#7a5a18'))}
   for(let a=0;a<TAU;a+=.16){line(240+cos(a)*50,124+sin(a)*52,240+cos(a)*88,124+sin(a)*92,C('#5a080e'))}ell(240,124,44,46,C('#160205'))});
  L1=mkLayer(()=>{for(const[y,x0,w]of[[184,130,220],[176,150,180],[168,170,140],[160,190,100]]){rect(x0,y,w,8,C('#3a0608'));rect(x0,y,w,1,GOLD)}
   rect(226,104,28,58,C('#2a0306'));rect(224,102,32,3,GOLD);rect(230,110,20,44,C('#1a0204'));
   for(const bx of[104,376]){rect(bx-8,172,16,20,C('#2a0306'));rect(bx-9,170,18,3,GOLD);rect(bx-2,192,4,16,C('#2a0306'))}});
  L2=mkLayer(()=>{fillGrad(196,H,S('#4a060c','#2a0408','#160205'));rect(X0,196,X1-X0,1,GOLD);for(let x=-300;x<W+300;x+=56)line(240+(x-240)*.22,197,x,H,C('#7a0e16'));for(let k=1;k<7;k++)rect(X0,196+fl(74*pow(k/7,1.6)),X1-X0,1,C('#5a0a12'))});
  L3=mkLayer(()=>{rect(-30,0,46,H,C('#2a0306'));rect(15,0,1,H,GOLD);rect(W-16,0,46,H,C('#2a0306'));rect(W-16,0,1,H,GOLD);for(let y=14;y<H;y+=40){rect(-30,y,46,2,GOLD);rect(W-16,y,46,2,GOLD)}})},
 draw(u){
  const cm=camx(u,5,46,.3),bo=-round(cm*.9),ox=-round(cm*.2);
  blit(L0,ox);
  for(const[x0,x1]of[[0,118],[362,480]]){for(let x=x0;x<x1;x++){const c=x-x0;for(let y=26;y<196;y++){const wv=sin(y*.045+u*1.3+x*.13)*2.5,sh=.5+.5*sin(x*.55+wv*.8+y*.01);px(x,y,gcol(CURT,sh*(.35+.65*(1-y/230)),x,y))}}}
  for(let x=0;x<480;x+=3)if(x<118||x>362){for(let y=24;y<28;y++)px(x,y,GOLD)}
  blit(L1,-round(cm*.5));
  for(const bx of[104,376]){const fx=bx-round(cm*.5);for(let i=0;i<9;i++){const h=8+8*hsh(fl(u*14),i+bx,1),w=5-i*.4;poly([[fx-w,170],[fx+w,170],[fx+(hsh(fl(u*14),i,3)-.5)*5,170-h]],C(i<4?'#ff8a20':'#ffd060'))}glow(fx,164,60,[255,170,50],.55+.1*sin(u*9+bx),2,50)}
  blit(L2,bo);
  cf1.at=230+bo;cf2.at=252+bo;
  drawDuel(u,cf1,CH.guard,CH.rey);drawDuel(u+.65,cf2,CH.kylo,CH.guard);
  refl(218,44,.5,.55,0,0,u);
  for(let i=0;i<44;i++){const sp=4+hsh(i,1,6)*10,x=mod(hsh(i,2,6)*W+u*(hsh(i,3,6)>.5?7:-6)+sin(u+i)*4,W),y=mod(hsh(i,4,6)*H-u*sp*(hsh(i,5,6)>.5?1:-.6),H),sz=1+fl(hsh(i,6,6)*3),an=u*(.6+hsh(i,7,6))+i,c=hsh(i,8,6)>.72?'#d8a530':(hsh(i,8,6)>.35?'#3a0508':'#8a1018');poly([[x,y-sz],[x+sz*cos(an),y+sz*.6],[x-sz*.6,y+sz*sin(an)*.6+1]],C(c))}
  for(let i=0;i<50;i++){const x=mod(hsh(i,1,7)*W+sin(u*1.2+i)*8,W),y=H-mod(u*(22+hsh(i,2,7)*30)+hsh(i,3,7)*300,300);dpx(x,y,C(hsh(i,4,7)>.5?'#ffd060':'#ff7a30'),.5+.5*sin(u*8+i))}
  mist(190,60,[210,50,40],.14,u,6,.02,4);
  blit(L3,-round(cm*1.6))}}
})());
/* ---------- EPISODE IX : KEF BIR ---------- */
SC.push((()=>{
 let L1,L2,L3;const WAT=S('#6a8298','#3a5468','#1f3344','#0e1a26'),wv=new Float32Array(W*H);
 const cfg={cx:255,y:230,g0:76,g1:48,roam:12,T:1.8,hop:7,seed:10,spk:'#d8ecff'};
 const EV=[[2.0,.9,340],[5.8,.7,120],[9.4,1.0,280],[13.2,.8,90],[17.6,1.0,400],[21.0,.8,220]];
 const flashK=u=>{let k=0;for(const e of EV){const a=(u-e[0])/e[1];if(a>=0&&a<=1)k=max(k,pow(sin(PI*a),2)*(.75+.25*sin(a*38)))}return k};
 return{num:'IX',title:'THE RISE OF SKYWALKER',place:'KEF BIR WRECKAGE',acc:'#7fb0e0',
 init(){
  L1=mkLayer(()=>{const r=rng(21);
   const shapes=[[[20,192],[54,124],[118,112],[150,150],[214,138],[244,192]],[[290,192],[306,102],[384,74],[428,122],[474,104],[520,192]]];
   for(const p of shapes){poly(p,C('#131b26'));for(let i=0;i<p.length-1;i++)line(p[i][0],p[i][1],p[i+1][0],p[i+1][1],C('#4a6078'));
    for(let y=110;y<190;y+=7)for(let x=p[0][0];x<p[p.length-1][0];x+=6)if(gp(x,y)===C('#131b26')&&r()>.86)px(x,y,C(r()>.5?'#3a8ab0':'#1a4a66'))}
   for(let y=118;y<192;y+=9)for(let x=X0;x<X1;x++)if(gp(x,y)===C('#131b26')&&mod(x+y*3,13)<9)px(x,y,C('#1c2836'));
   for(const[x,y,h]of[[300,102,30],[430,120,22],[120,112,20]])rect(x,y-h,2,h,C('#131b26'))});
  L2=mkLayer(()=>{poly([[-40,196],[-20,120],[70,96],[120,150],[150,196]],C('#0c121a'));for(let i=0;i<6;i++)line(-20+i*24,120-i*3+(i>3?18:0),-10+i*26,196,C('#1a2634'));line(-20,120,70,96,C('#5a7288'));line(70,96,120,150,C('#5a7288'));
   poly([[360,196],[380,140],[430,120],[470,84],[520,110],[540,196]],C('#0c121a'));line(380,140,430,120,C('#5a7288'));line(430,120,470,84,C('#5a7288'));for(let x=372;x<530;x+=18)line(x,196,x-6,132+((x*7)%20),C('#1a2634'))});
  L3=mkLayer(()=>{poly([[110,224],[400,224],[424,240],[86,240]],C('#1e2934'));line(110,224,400,224,C('#7a90a4'));for(let x=90;x<430;x+=28)line(255+(x-255)*.9,225,x,239,C('#141c25'));
   rect(86,240,338,14,C('#141c24'));rect(86,240,338,1,C('#5a7288'));for(let x=96;x<420;x+=34){rect(x,244,20,6,C('#1c2630'));px(x+2,246,C('#3a8ab0'))}
   for(const x of[130,210,300,390])tline(x,254,255+(x-255)*.6,272,C('#0a0f16'),3);
   poly([[86,240],[70,252],[86,258]],C('#141c24'));poly([[424,240],[440,250],[424,256]],C('#141c24'))})},
 draw(u){
  const cm=camx(u,6,50,.5),bo=-round(cm),fk=flashK(u);
  fillGradSky();
  mist(20,100,[14,20,28],1.1,u,9,.010,7,false);mist(70,80,[76,96,116],.55,u,14,.014,9);
  const ev=EV.find(e=>u>=e[0]&&u<e[0]+e[1]*.7);
  blit(L1,-round(cm*.25));blit(L2,-round(cm*.5));
  mist(170,26,[130,160,190],.34,u,6,.02,11);
  for(let y=186;y<H;y++){const dd=(y-186)/(H-186);for(let x=0;x<W;x++){const v=sin(x*(.045+dd*.03)+y*.55-u*(1+dd*2.2))+.55*sin(x*.11-u*1.7+y*.31+dd*4);wv[y*W+x]=v;px(x,y,gcol(WAT,clamp(dd*.85+.07*v),x,y))}}
  refl(186,46,.5,.6,2,.7,u);
  for(let y=186;y<H;y++){const dd=(y-186)/(H-186);for(let x=0;x<W;x++){const v=wv[y*W+x];if(v>1.3-dd*.14)px(x,y,C(v>1.55?'#a8bfd2':'#6c869c'))}}
  blit(L3,bo);
  cfg.cx=255+bo;drawDuel(u,cfg,CH.rey,CH.kylo);
  refl(230,10,.42,.55,0,0,u);
  const tw_=mod(u,12),wa=(tw_-7.6)/3.4;
  if(wa>0&&wa<1){const h=44*sin(PI*wa),X0w=340,cy=x=>236-h*(x<430?pow((x-X0w)/90,1.4):1-(x-430)/120*.3)+sin(x*.3+u*9)*1.6;
   for(let x=X0w;x<W;x++){const c0=fl(cy(x));for(let y=c0;y<H;y++){const t=(y-c0)/(H-c0);px(x,y,gcol(S('#9fb6c8','#5f849e','#33506a','#22384c'),t*1.4,x,y))}
    px(x,c0-1,C('#eef6fc'));px(x,c0,C('#dbe8f2'));if(hsh(x,fl(u*12),4)>.55)px(x,c0-2-hsh(x,3,3)*4,C('#eef6fc'))}
   for(let i=0;i<40;i++){const a=hsh(i,1,9)*PI+PI,v=30+hsh(i,2,9)*60,age=wa*2.2,x=400+(hsh(i,3,9)-.5)*100+cos(a)*v*age*.5,y=236-h+sin(a)*v*age+50*age*age;dpx(x,y,C('#eaf4fb'),clamp(1.2-wa))}}
  if(fk>0){const ar=90,ag=115,ab=150;for(let y=0;y<H;y++){for(let x=0;x<W;x++){const kk=fl(fk*.5*6*(1-y/H*.35)+bay(x,y))/6;if(kk<=0)continue;const i=y*W+x,v=T[i],R=(v&255)+ar*kk,G=((v>>8)&255)+ag*kk,B=((v>>16)&255)+ab*kk;T[i]=(0xff000000|((B>255?255:B)<<16)|((G>255?255:G)<<8)|(R>255?255:R))>>>0}}}
  if(ev){const a=(u-ev[0])/ev[1],sd=ev[0]*10+fl(u*16);if(a<.7){let x=ev[2]-round(cm*.1),y=0,pp=[[x,y]];while(y<184){y+=8+hsh(y,sd,1)*10;x+=(hsh(y,sd,2)-.5)*22;pp.push([x,y])}
   for(let i=0;i<pp.length-1;i++){tline(pp[i][0],pp[i][1],pp[i+1][0],pp[i+1][1],C('#6a9aff'),3);line(pp[i][0],pp[i][1],pp[i+1][0],pp[i+1][1],C('#ffffff'))}
   const l=pp[pp.length-1];glow(l[0],l[1],46,[150,190,255],.9,2)}}
  for(let i=0;i<260;i++){const y=mod(hsh(i,1,2)*H+u*250,H),x=mod(hsh(i,2,2)*W-u*250*.35,W);dline(x,y,x+1.4,y-4,C('#8fa9c0'),.5)}
  for(let i=0;i<110;i++){const y=mod(hsh(i,3,2)*H+u*420,H),x=mod(hsh(i,4,2)*W-u*420*.35,W);dline(x,y,x+3,y-8,C('#b8d0e4'),.8)}
  }}
})());
function fillGradSky(){fillGrad(0,190,S('#080d14','#1a2836','#34475c','#5a7288','#8aa0b4'))}
