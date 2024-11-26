(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(["img[src='images/orionlogo.jpg']", ".Orion-text"], {
    duration: 1,
    opacity: 0,
    scale: 0.5,
    ease: "power2.out",
  });

  gsap.from(".img-vertical img", {
    scrollTrigger: {
      trigger: ".img-vertical",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    x: 500,
    opacity: 0,
  });

  gsap.from(".chip-img img", {
    scrollTrigger: {
      trigger: ".chip-img",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
    x: 500,
    opacity: 0,
  });

  gsap.utils.toArray(".vertical-text .line").forEach((line, i) => {
    gsap.from(line, {
      scrollTrigger: {
        trigger: line,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: 500,
      opacity: 0,
      color: i % 2 === 0 ? "green" : "red",
    });
  });

  gsap.utils.toArray(".text-waves").forEach((line, i) => {
    gsap.from(line, {
      scrollTrigger: {
        trigger: line,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
      y: 500,
      opacity: 0,
      color: i % 2 === 0 ? "red" : "blue",
    });
  });

  gsap.utils.toArray(".color-img").forEach((img) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      x: -500,
      opacity: 0,
    });
  });

  gsap.utils.toArray("#mobile-tablet-view img").forEach((img) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      y: 10,
      rotation: 360,
      opacity: 0,
    });
  });

  gsap.registerPlugin(ScrollToPlugin);

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 72;
  const images = [];
  const buds = {
    frame: 0,
  };
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();

    img.src = `images/1_seq/Untitled${(i + 1).toString().padStart(4, "0")}.jpg`;
    images.push(img);
  }

  let imageCon = document.querySelector("#imageCon"),
    drag = document.querySelector(".image-drag"),
    left = document.querySelector(".image-left"),
    dragging = false,
    min = 0,
    max = imageCon.offsetWidth;

  const navLinks = document.querySelectorAll("#main-header nav ul li a");
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");

  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);
      let title = document.createElement("h2");
      title.textContent = infoBox.title;
      let text = document.createElement("p");
      text.textContent = infoBox.text;
      let img = document.createElement("img");
      img.src = infoBox.img;
      img.alt = infoBox.title;
      console.log(img);

      console.log(selected);
      console.log(infoBox.title);
      console.log(infoBox.text);

      selected.appendChild(title);
      selected.appendChild(text);
      selected.appendChild(img);
    });
  }
  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`button[slot="${this.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`button[slot="${this.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  function scrollLink(e) {
    e.preventDefault();
    console.log(e.currentTarget.hash);
    let selectedLink = e.currentTarget.hash;
    mobile_menu.classList.remove("is-active");
    menu_btn.classList.remove("is-active");
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `${selectedLink}`, offsetY: 100 },
    });
  }
  // Xray Functionality
  function onDown() {
    dragging = true;
    console.log("Set to true");
  }
  function onUp() {
    dragging = false;
    console.log("Set to false");
  }

  function onMove(event) {
    if (dragging === true) {
      let x = event.clientX - imageCon.getBoundingClientRect().left;
      console.log(x);

      if (x < min) {
        x = min;
      } else if (x > max) {
        x = max - 10;
      }

      drag.style.left = x + "px";
      left.style.width = x + "px";
    }
  }

  gsap.to(buds, {
    frame: 71,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: false,
      start: "top top",
    },
    onUpdate: render,
  });

  images[0].addEventListener("onload", render);

  function render() {
    console.log(buds.frame);
    console.log(images[buds.frame]);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const InfoBoxes = [
    {
      title: "Orion logo",
      text: "The Orion logo symbolizes innovation, precision, and a forward-thinking vision.",
      image: "../images/Group.png",
    },
    {
      title: "Soft Buds ",
      text: "Soft Buds Orion: Innovating comfort and quality in every product.",
      image: "../images/buds.jpeg",
    },

    {
      title: "Sleek design",
      text: "Sleek design : blends sophistication with minimalism for a refined asthetic ",
    },
    {
      title: "Fast charging",
      text: "Colors : A wide range of colors to choose from, offering endless possiblities",
    },
  ];

  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    InfoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      if (selected) {
        const titleElement = document.createElement("h2");
        titleElement.textContent = infoBox.title;
        titleElement.style.color = "#0000";

        const textElement = document.createElement("p");
        textElement.textContent = infoBox.text;

        textElement.style.color = "#161616";

        selected.appendChild(titleElement);
        selected.appendChild(textElement);

        if (infoBox.image) {
          const imgElement = document.createElement("img");
          imgElement.src = infoBox.image;
          imgElement.classList.add("hotspot-image");
          selected.appendChild(imgElement);
        }
      } else {
        console.log(`#hotspot-${index + 1} not found`);
      }
    });
  }

  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, {
      duration: 0.5,
      autoAlpha: 1,
      visibility: "visible",
    });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, {
      duration: 0.5,
      autoAlpha: 0,
      visibility: "hidden",
    });
  }

  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });

  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", scrollLink);
  });

  drag.addEventListener("mousedown", onDown);
  document.body.addEventListener("mouseup", onUp);
  document.body.addEventListener("mousemove", onMove);
})();
