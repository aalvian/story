import { getStories } from "../../data/story-api";

class HomePresenter {
  constructor(view) {
    this._view = view;
  }

  async showStories() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#login";
      return;
    }

    const { listStory, error } = await getStories(token);
    if (error) {
      alert("Gagal ambil data!");
    } else {
      this._view._renderStories(listStory);
    }
  }
}

export default HomePresenter;
