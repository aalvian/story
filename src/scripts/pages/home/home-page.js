import HomePresenter from "./home-presenter";

class HomePage {
  async render() {
    return `
      <section class="home">
        <div class="home-story">
          <h1>Daftar Cerita</h1>
        </div>

        <div id="story-list"></div>

      </section>
    `;
  }

  renderStories(stories) {
    const container = document.getElementById("story-list");
    container.innerHTML = stories
      .map(
        (story) => `
      <div class="story">
        <img src="${story.photoUrl}" alt="${story.description}">
        <p>${story.name}</p>
        <p>${story.description}</p>
        <small>Dibuat Pada: ${new Date(story.createdAt).toLocaleString('id-ID')}</small>
      </div>
    `,
      )
      .join("");
  }

  async afterRender() {
    const presenter = new HomePresenter(this);
    await presenter.showStories();
  }
}

export default HomePage;
