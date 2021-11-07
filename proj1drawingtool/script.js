const colorCircle = document.querySelectorAll(".color-circle");

let penSize = 2;
let isDrawing;
let x;
let y;
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (event) => {
  draw(event.offsetX, event.offsetY);
});

c.fillStyle = "hotpink";
c.strokeStyle = c.fillStyle;

function draw(x2, y2) {
  if (isDrawing) {
    c.beginPath();
    c.arc(x2, y2, penSize, 0, Math.PI * 2);
    c.closePath();
    c.fill();
    //draw line
    drawLine(x, y, x2, y2);
  }

  x = x2;
  y = y2;
}

function drawLine(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.strokeStyle = c.fillStyle;

  c.lineWidth = penSize * 2;
  c.stroke();
}

document.querySelector(".refresh").addEventListener("click", function () {
  c.clearRect(0, 0, canvas.width, canvas.height);
});

const selectColor = (elem) => {
  removeActiveCircleColor();

  c.fillStyle = elem.getAttribute("data-color");
  elem.classList.add("active");
};

const removeActiveCircleColor = () => {
  colorCircle.forEach((circle) => {
    circle.classList.remove("active");
  });
};

function penSizeChange(pensize) {
  penSize = pensize;
}

const favColor = (elem) => {
  removeActiveCircleColor();
  c.fillStyle = elem.value;
};

document
  .querySelector("a")
  .addEventListener(
    "click",
    (event) => (event.target.href = canvas.toDataURL())
  );

  upload.addEventListener("click", (e) => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);
    })
})

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 100;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}