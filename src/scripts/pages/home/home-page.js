export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Home Page</h1>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('story_token');
  }
}

// const HomePage = {
//   async render() {
//     return `
//       <section class="story-list">
//         <h2>Daftar Cerita</h2>
//         <div id="storyList" class="story-container">Loading...</div>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const HomePresenter = await import('./home-presenter.js');
//     HomePresenter.default.init();
//   },
// };

// export default HomePage;


