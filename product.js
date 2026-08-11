let qty = 1;
function changeQty(val){
  qty += val;
  if(qty < 1) qty = 1;
  document.getElementById('qty').innerText = qty;
}

// size select
document.querySelectorAll('.size').forEach(s=>{
  s.onclick = () => {
    document.querySelector('.size.active').classList.remove('active');
    s.classList.add('active');
  }
})

// color select
document.querySelectorAll('.color').forEach(c=>{
  c.onclick = () => {
    document.querySelector('.color.active').classList.remove('active');
    c.classList.add('active');
  }
})

// new section

/* =========================================================
   DESCRIPTION TABS
========================================================= */

const descriptionTabs =
    document.querySelectorAll(".description-tab");

const descriptionContents =
    document.querySelectorAll(".description-content");


descriptionTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.tab;


        /* Remove active from all tabs */

        descriptionTabs.forEach(item => {

            item.classList.remove("active");

        });


        /* Remove active from all content */

        descriptionContents.forEach(content => {

            content.classList.remove("active");

        });


        /* Activate selected tab */

        tab.classList.add("active");


        const selectedContent =
            document.getElementById(target);


        if (selectedContent) {

            selectedContent.classList.add("active");

        }

    });

});