const catalogue_wrapper = document.querySelector(".catalogue");
let items = new Set(catalogue_wrapper.querySelectorAll(".catalogue-item"));
let all_items = Array.from(catalogue_wrapper.querySelectorAll(".catalogue-item"));
const check_shirt = document.getElementById("by-type-shirt");
const check_cap = document.getElementById("by-type-cap");
const check_cup = document.getElementById("by-type-cup");
console.log("ok0");
check_shirt.addEventListener("change", () => {
   console.log(check_shirt.checked)
   let fitting = new Set();
   all_items.forEach((element) => {
       if (element.dataset.type == "Футболка") {
           fitting.add(element);
       }
   });
   if (check_shirt.checked) {
       catalogue_wrapper.innerHTML = "";
       items = new Set([...items].filter(x => fitting.has(x)));
       items.forEach((element) => {
           catalogue_wrapper.appendChild(element);
       })
   } else {
       items = new Set([...items, ...fitting]);
       items.forEach((element) => {
           catalogue_wrapper.appendChild(element);
       })
   }
});
