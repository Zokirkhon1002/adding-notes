let add_btn = document.getElementById("add"),
  notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
  notes.forEach((note) => addNewNote(note));
}

add_btn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
<div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

  let edit_btn = note.querySelector(".edit"),
    del_btn = note.querySelector(".delete"),
    main = note.querySelector(".main"),
    text_area = note.querySelector("textarea");

  text_area.value = text;
  main.innerHTML = marked(text);

  del_btn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  edit_btn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    text_area.classList.toggle("hidden");
  });

  text_area.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);

    updateLS();
  });
  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach(note => notes.push(note.value));


  localStorage.setItem("notes", JSON.stringify(notes));
}
