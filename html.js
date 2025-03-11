function toggleMenu() {
    let menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("open");

    // Проверяем текущее состояние и отображаем/скрываем меню
    if (menu.classList.contains("open")) {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}