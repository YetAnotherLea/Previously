document.addEventListener("alpine:init", () => {
  Alpine.data("helloComponent", () => ({
    message: "Loading...",
    init() {
      fetch("http://localhost:8080/api/hello")
        .then((res) => res.text())
        .then((data) => (this.message = data))
        .catch((err) => (this.message = "Error fetching from back"));
    },
  }));

  Alpine.data("showsComponent", () => ({
    message: "Chargement...",
    init() {
      fetch("http://localhost:8080/shows")
        .then((res) => res.text())
        .then((data) => (this.message = data))
        .catch((err) => (this.message = "Error fetching from back"));
    },
  }));
});
