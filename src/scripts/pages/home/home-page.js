import HomePresenter from "./home-presenter";
import StoryMap from "../../utils/map";

class HomePage {
  constructor() {
    this._map = null;
    this._markers = [];
    this.storyMap = null;
  }

  async render() {
    return `
      <div id="loading" class="loading" style="display:none;">
        <div class="spinner"></div>
        <p>Memuat data...</p>
      </div>

      <h1>Daftar Cerita</h1>
      <section class="home">
        <div id="story-list"></div>
        <div id="map-container" style="height: 400px; margin-top: 60px;"></div>
      </section>
    `;
  }

  async afterRender() {
    this.initMap();
    const presenter = new HomePresenter(this);
    await presenter.showStories();
  }

  initMap() {
    this.storyMap = new StoryMap('map-container');
    this._map = this.storyMap.getMapInstance();
    this._markers = [];
  }

  renderStories(stories) {
    const container = document.getElementById("story-list");
    container.innerHTML = stories
      .map(
        (story) => `
      <div class="story" data-id="${story.id}" data-lat="${story.lat || ''}" data-lon="${story.lon || ''}">
        <img src="${story.photoUrl}" alt="${story.description}">
        <p>${story.name}</p>
        <p>${story.description}</p>
        ${story.lat && story.lon ? `
          <small class="location">
            <i class="fas fa-map-marker-alt"></i> Lokasi
            ${story.lat.toFixed(4)}, ${story.lon.toFixed(4)}
          </small>
        ` : ''}
        <small>Dibuat Pada: ${new Date(story.createdAt).toLocaleString('id-ID')}</small>
      </div>
    `,
      )
      .join("");
    
    this.addStoryMarkers(stories);
  }

  addStoryMarkers(stories) {
    this.storyMap.addMarkers(stories);
    this._markers = this.storyMap.markers; 
  }

  showLoading() {
    document.getElementById("loading").style.display = "flex";
  }

  hideLoading() {
    document.getElementById("loading").style.display = "none";
  }
}

export default HomePage;