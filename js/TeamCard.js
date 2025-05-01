// TeamCard.js
export default class TeamCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.hasAttribute('team-data')) {
      try {
        const teamData = JSON.parse(this.getAttribute('team-data'));
        this.render(teamData);
      } catch (error) {
        console.error('Error parsing team data:', error);
      }
    }
  }

  render(teamData) {
    const position = this.getAttribute('position') || '';
    const driversData = this.getAttribute('drivers-data') ? JSON.parse(this.getAttribute('drivers-data')) : [];
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 2rem;
          font-family: 'Titillium Web', sans-serif;
        }
        
        .team-card {
          border: 1px solid #e2e2e2;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          position: relative;
        }
        
        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e2e2;
          position: relative;
        }
        
        .position {
          font-size: 2.5rem;
          font-weight: 700;
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .team-name {
          margin-left: 4rem;
          font-size: 1.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        
        .team-name-text {
          margin-left: 0.5rem;
        }
        
        .team-color-bar {
          width: 6px;
          height: 2rem;
          display: inline-block;
          margin-right: 8px;
        }
        
        .team-logo {
          height: 2rem;
        }
        
        .points {
          font-size: 1.2rem;
          font-weight: 700;
          background-color: black;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
        }
        
        .pts-label {
          font-size: 0.8rem;
          display: block;
          text-align: center;
        }
        
        .drivers {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        }
        
        .driver {
          display: flex;
          align-items: center;
          width: 48%;
        }
        
        .driver-name {
          font-weight: 700;
          margin-right: 1rem;
        }
        
        .driver-lastname {
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .driver-photo {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .car-image {
          width: 100%;
          height: auto;
          padding: 1rem;
          box-sizing: border-box;
          background-image: linear-gradient(#ffffff, #f2f2f2);
        }

        .grid-bg {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path stroke="%23ddd" fill="none" d="M0,0 L20,0 M0,5 L20,5 M0,10 L20,10 M0,15 L20,15 M0,20 L20,20 M0,0 L0,20 M5,0 L5,20 M10,0 L10,20 M15,0 L15,20 M20,0 L20,20"/></svg>');
        }
      </style>
      
      <div class="team-card">
        <div class="team-header">
          <div class="position">${position}</div>
          <div class="team-name">
            <span class="team-color-bar" style="background-color: ${this.getTeamColor(teamData.name)};"></span>
            <span class="team-name-text">${teamData.name}</span>
          </div>
          <div class="team-logo">${this.getTeamLogo(teamData.name)}</div>
          <div class="points">
            ${teamData.points}
            <span class="pts-label">PTS</span>
          </div>
        </div>
        
        <div class="drivers">
          ${this.renderDrivers(driversData)}
        </div>
        
        <div class="car-image grid-bg">
          <img src="${teamData.imageUrl}" alt="${teamData.name} car" style="width: 100%;">
        </div>
      </div>
    `;
  }

  renderDrivers(driversData) {
    if (!driversData || driversData.length === 0) {
      return '';
    }

    return driversData.map(driver => {
      const [firstName, lastName] = driver.name.split(' ');
      return `
        <div class="driver">
          <div>
            <span>${firstName}</span>
            <span class="driver-lastname">${lastName}</span>
          </div>
          <img class="driver-photo" src="${driver.photoUrl || '/img/drivers/placeholder.png'}" alt="${driver.name}">
        </div>
      `;
    }).join('');
  }

  getTeamColor(teamName) {
    const teamColors = {
      'McLaren': '#FF8000',
      'Mercedes': '#00D2BE',
      'Red Bull Racing': '#0600EF',
      'Ferrari': '#DC0000',
      'Alpine': '#0090FF',
      'Haas': '#FFFFFF',
      'Aston Martin': '#006F62',
      'Williams': '#005AFF',
      'Kick Sauber': '#900000',
      'Racing Bulls': '#1E41FF'
    };
    
    return teamColors[teamName] || '#333333';
  }

  getTeamLogo(teamName) {
    const logos = {
      'McLaren': '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12,2 L2,12 L12,22 L22,12 L12,2 Z" fill="#FF8000" /></svg>',
      'Mercedes': '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="none" fill="#00D2BE" /></svg>',
      'Red Bull Racing': '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4,12 L12,4 L20,12 L12,20 L4,12 Z" fill="#0600EF" /></svg>',
      'Ferrari': '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="#DC0000" /></svg>'
    };
    
    return logos[teamName] || '';
  }
}

customElements.define('team-card', TeamCard);