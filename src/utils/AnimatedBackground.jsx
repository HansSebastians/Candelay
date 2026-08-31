import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    let COLS, ROWS, CELL_W, CELL_H;
    let PATHS = [], ARCS = [];
    let animId;

    const PALETTES = [
      [[138,77,255],[176,120,255],[212,180,255]],
      [[106,108,255],[148,150,255],[190,191,255]],
      [[79,163,255],[130,195,255],[180,220,255]],
    ];
    const LINE_PAL = [0,1,2,0,1,2,0,1,2,1];
    const OFFSETS  = Array.from({length:10},(_,i)=>i/10);
    const TRAIL    = 0.42;
    const LW       = [0.9,0.8,0.9,0.8,0.9,0.8,0.8,0.9,0.8,0.9];

    function node(c,r){ return [c*CELL_W, r*CELL_H]; }

    function buildGrid(){
      COLS=4; ROWS=3;
      CELL_W=W/COLS; CELL_H=H/ROWS;
    }

    function buildPaths(){
      return [
        [[-1,1],[0,1],[0,2],[1,2],[1,1],[2,1],[2,2],[3,2],[3,1],[4,1],[5,1]],
        [[1,-1],[1,0],[1,1],[2,1],[2,2],[2,3],[2,4]],
        [[5,2],[4,2],[4,1],[3,1],[3,0],[2,0],[1,0],[0,0],[-1,0]],
        [[3,4],[3,3],[3,2],[2,2],[2,1],[2,0],[2,-1]],
        [[-1,0],[0,0],[1,0],[1,1],[2,1],[3,1],[3,2],[3,3],[3,4]],
        [[2,-1],[2,0],[3,0],[4,0],[4,1],[4,2],[3,2],[2,2],[1,2],[0,2],[-1,2]],
        [[-1,2],[0,2],[0,1],[1,1],[1,0],[2,0],[3,0],[4,0],[5,0]],
        [[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4]],
        [[5,0],[4,0],[4,1],[3,1],[3,2],[3,3],[3,4]],
        [[1,4],[1,3],[1,2],[2,2],[2,1],[3,1],[3,0],[4,0],[4,-1]],
      ].map(path => path.map(([c,r]) => node(c,r)));
    }

    function arcParam(pts){
      const d=[0];
      for(let i=1;i<pts.length;i++)
        d.push(d[d.length-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
      const tot=d[d.length-1];
      return {norm:d.map(v=>v/tot),total:tot};
    }

    function getPoint(pts,arc,t){
      t=Math.max(0,Math.min(1,t));
      let lo=0,hi=arc.norm.length-1;
      while(lo<hi-1){const m=(lo+hi)>>1;arc.norm[m]<=t?lo=m:hi=m;}
      const dd=arc.norm[hi]-arc.norm[lo];
      const f=dd===0?0:(t-arc.norm[lo])/dd;
      return [pts[lo][0]+f*(pts[hi][0]-pts[lo][0]),pts[lo][1]+f*(pts[hi][1]-pts[lo][1])];
    }

    function rgba([r,g,b],a){return `rgba(${r},${g},${b},${a.toFixed(3)})`;}
    function lerp(c1,c2,t){return c1.map((v,i)=>Math.round(v+(c2[i]-v)*t));}

    const off2=document.createElement('canvas');
    const offCtx=off2.getContext('2d');

    function drawGrid(){
      ctx.save();
      ctx.strokeStyle='rgba(0,0,0,0.06)';
      ctx.lineWidth=1;
      ctx.setLineDash([]);
      for(let c=0;c<=COLS;c++){
        ctx.beginPath();ctx.moveTo(c*CELL_W,0);ctx.lineTo(c*CELL_W,H);ctx.stroke();
      }
      for(let r=0;r<=ROWS;r++){
        ctx.beginPath();ctx.moveTo(0,r*CELL_H);ctx.lineTo(W,r*CELL_H);ctx.stroke();
      }
      ctx.strokeStyle='rgba(0,0,0,0.06)';
      ctx.beginPath();ctx.arc(CELL_W,CELL_H,28,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }

    const STEPS=280;
    function drawLines(t){
      off2.width!==W&&(off2.width=W);
      off2.height!==H&&(off2.height=H);
      offCtx.clearRect(0,0,W,H);

      for(let idx=0;idx<PATHS.length;idx++){
        const pts=PATHS[idx],arc=ARCS[idx];
        const pal=PALETTES[LINE_PAL[idx]];
        const off=OFFSETS[idx],lw=LW[idx];
        const headT=(t+off)%1.0;
        const trailT=Math.max(0,headT-TRAIL);

        offCtx.save();
        offCtx.lineCap='square';offCtx.lineJoin='miter';

        for(let s=0;s<STEPS;s++){
          const f0=s/(STEPS-1),f1=(s+1)/(STEPS-1);
          const st=trailT+(headT-trailT)*f0;
          const et=trailT+(headT-trailT)*f1;
          if(et>1) break;
          const p0=getPoint(pts,arc,st),p1=getPoint(pts,arc,et);
          const ease=Math.pow(f0,1.2),ease2=Math.pow(f0,0.6);
          const cC=lerp(pal[2],pal[0],ease),bC=lerp(pal[2],pal[1],ease2);

          offCtx.beginPath();offCtx.moveTo(p0[0],p0[1]);offCtx.lineTo(p1[0],p1[1]);
          offCtx.strokeStyle=rgba(bC,0.07*ease2);offCtx.lineWidth=lw+12;offCtx.stroke();
          offCtx.beginPath();offCtx.moveTo(p0[0],p0[1]);offCtx.lineTo(p1[0],p1[1]);
          offCtx.strokeStyle=rgba(bC,0.22*ease);offCtx.lineWidth=lw+5;offCtx.stroke();
          offCtx.beginPath();offCtx.moveTo(p0[0],p0[1]);offCtx.lineTo(p1[0],p1[1]);
          offCtx.strokeStyle=rgba(cC,0.42*ease);offCtx.lineWidth=lw+2;offCtx.stroke();
          offCtx.beginPath();offCtx.moveTo(p0[0],p0[1]);offCtx.lineTo(p1[0],p1[1]);
          offCtx.strokeStyle=rgba(cC,0.92*ease);offCtx.lineWidth=lw;offCtx.stroke();
        }

        const [hx,hy]=getPoint(pts,arc,headT);
        const rc=pal[0];
        [[28,.07],[18,.18],[10,.36],[6,.60],[3,.88]].forEach(([r,a])=>{
          const g2=offCtx.createRadialGradient(hx,hy,0,hx,hy,r);
          g2.addColorStop(0,rgba(rc,a));g2.addColorStop(1,rgba(rc,0));
          offCtx.beginPath();offCtx.arc(hx,hy,r,0,Math.PI*2);
          offCtx.fillStyle=g2;offCtx.fill();
        });
        offCtx.beginPath();offCtx.arc(hx,hy,lw+0.8,0,Math.PI*2);
        offCtx.fillStyle=rgba(rc,1);offCtx.fill();
        offCtx.beginPath();offCtx.arc(hx,hy,1,0,Math.PI*2);
        offCtx.fillStyle='#fff';offCtx.fill();
        offCtx.restore();
      }

      ctx.save();ctx.filter='blur(10px)';ctx.globalAlpha=0.60;ctx.drawImage(off2,0,0);ctx.restore();
      ctx.save();ctx.filter='blur(3px)'; ctx.globalAlpha=0.75;ctx.drawImage(off2,0,0);ctx.restore();
      ctx.save();ctx.filter='none';      ctx.globalAlpha=1.0; ctx.drawImage(off2,0,0);ctx.restore();
    }

    function drawFrame(t){
      ctx.fillStyle='#ffffff';
      ctx.fillRect(0,0,W,H);
      drawGrid();
      drawLines(t);
    }

    function init(){
      W=canvas.width=canvas.offsetWidth;
      H=canvas.height=canvas.offsetHeight;
      buildGrid();
      PATHS=buildPaths();
      ARCS=PATHS.map(p=>arcParam(p));
    }

    const onResize=()=>init();
    window.addEventListener('resize',onResize);

    const DURATION = 10000;
    let elapsed = 0;        
    let lastTs = null;      
    let isPaused = false;   

    function loop(ts) {
      if (!isPaused) {
        if (lastTs !== null) {
         
          const delta = Math.min(ts - lastTs, 100);
          elapsed = (elapsed + delta) % DURATION;
        }
        lastTs = ts;
        drawFrame(elapsed / DURATION);
      } else {
        lastTs = null;
      }

      animId = requestAnimationFrame(loop);
    }

    function onVisibilityChange() {
      isPaused = document.hidden;
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isPaused = !entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTs = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    init();
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        display: "block",
        zIndex: 0,
      }}
    />
  );
}