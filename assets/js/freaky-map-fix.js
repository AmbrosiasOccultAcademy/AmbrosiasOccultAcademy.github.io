(function(){
  if (window._ff_map_init) return;
  window._ff_map_init = true;

  function safeDrawPins(ctx) {
    if (!ctx) {
      var canvas = document.getElementById('hmap');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return; // bail — DO NOT call buildMap() here to avoid recursion
    }

    try { pinHitAreas = []; } catch(e) { window.pinHitAreas = []; }
    var pins = (typeof allPins === 'function') ? allPins() : (window.PINS || []);

    pins.forEach(function(p){
      try {
        if (!p || typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
        var pos = (typeof proj === 'function') ? proj(p.lat, p.lng) : {x:0,y:0};

        // draw pin circle
        ctx.beginPath();
        ctx.fillStyle = (p.type === 'cryptid' || p.type === 'ufo') ? '#4bb464' : '#a56bff';
        ctx.arc(pos.x, pos.y, 6, 0, Math.PI*2);
        ctx.fill();

        // subtle halo
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // label
        ctx.font = '10px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        var label = (p.name && p.name.length>22) ? p.name.slice(0,22)+'…' : (p.name||'');
        ctx.fillText(label, pos.x + 10, pos.y);

        pinHitAreas.push({x: pos.x-8, y: pos.y-8, w: 16, h: 16, id: p.id});
      } catch(err) {
        // ignore per-pin drawing errors
      }
    });
  }

  // expose legacy name
  window.drawPins = safeDrawPins;

  document.addEventListener('DOMContentLoaded', function(){
    try {
      if (typeof buildMap === 'function') buildMap();
      drawPins();

      var canvas = document.getElementById('hmap');
      if (canvas) {
        canvas.addEventListener('click', function(ev){
          var rect = canvas.getBoundingClientRect();
          var x = Math.round((ev.clientX - rect.left) * (canvas.width / rect.width));
          var y = Math.round((ev.clientY - rect.top) * (canvas.height / rect.height));
          for (var i=0;i<(window.pinHitAreas||[]).length;i++){
            var h = window.pinHitAreas[i];
            if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
              if (typeof openPin === 'function') { openPin(h.id); }
              break;
            }
          }
        });
      }

      var resizeDebounce;
      window.addEventListener('resize', function(){
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(function(){
          if (typeof buildMap === 'function') buildMap();
          drawPins();
        }, 180);
      });
    } catch(e) {
      // keep page alive on errors
      console.warn('Map init (non-fatal):', e && e.message);
    }
  });
})();
