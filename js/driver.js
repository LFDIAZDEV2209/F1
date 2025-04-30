function mostrarInfo() {
    const info = document.getElementById('infoPiloto');
    info.style.display = (info.style.display === 'none' || info.style.display === '') ? 'block' : 'none';
  }
  



<div class="info-detalle" id="infoPiloto">
<ul>
  <li><strong>Team:</strong> McLaren</li>
  <li><strong>Country:</strong> Australia</li>
  <li><strong>Podiums:</strong> 14</li>
  <li><strong>Points:</strong> 488</li>
  <li><strong>Grands Prix entered:</strong> 51</li>
  <li><strong>Date of birth:</strong> 06/04/2001</li>
</ul>
</div>