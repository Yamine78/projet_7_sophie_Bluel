
document.addEventListener('click', (event) => {

  if (event.target.classList.contains('trash-icon')) {

    const figure = event.target.closest('figure');
    if (figure) {
      figure.remove();
    }
  }
});
