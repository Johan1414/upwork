document.addEventListener("DOMContentLoaded", function () {
    // 1. Логика открытия/закрытия фильтра
    const filterBtn = document.querySelector(".filter-btn");
    const filterContainer = document.querySelector(".filter-container");

    function positionFilter() {
        const btnRect = filterBtn.getBoundingClientRect(); // Получаем координаты кнопки
        filterContainer.style.top = `${btnRect.bottom + 20 + window.scrollY}px`; // Отображаем под кнопкой
        filterContainer.style.display = "block"; // Делаем видимым перед расчетом
        filterContainer.style.left = `${btnRect.left - filterContainer.offsetWidth + window.scrollX}px`;

    }

    filterBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Остановим всплытие, чтобы клик по кнопке не закрыл сразу фильтр
        if (filterContainer.style.display === "block") {
            filterContainer.style.display = "none";
        } else {
            positionFilter(); // Устанавливаем правильное положение
        }
    });

    // Закрывать фильтр при клике вне его
    document.addEventListener("click", function (event) {
        if (!filterContainer.contains(event.target) && !filterBtn.contains(event.target)) {
            filterContainer.style.display = "none";
        }
    });

    // 2. Логика работы чекбоксов и фильтров
    const checkboxes = document.querySelectorAll(".filter-options input");
    const selectedFilters = document.querySelector(".selected-filters");
    const clearBtn = document.querySelector(".clear-filter");
    const selectAll = document.getElementById("select-all");

    function updateFilters() {
        selectedFilters.innerHTML = "";
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let tag = document.createElement("div");
                tag.classList.add("filter-tag");
                tag.innerHTML = `${checkbox.value} <span class="remove">×</span>`;

                tag.querySelector(".remove").addEventListener("click", function () {
                    checkbox.checked = false;
                    updateFilters();
                });

                selectedFilters.appendChild(tag);
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateFilters);
    });

    clearBtn.addEventListener("click", function (e) {
        e.preventDefault();
        checkboxes.forEach(checkbox => (checkbox.checked = false));
        updateFilters();
    });

    selectAll.addEventListener("change", function () {
        checkboxes.forEach(checkbox => (checkbox.checked = selectAll.checked));
        updateFilters();
    });

    // Следим за изменением размера окна и адаптируем положение фильтра
    window.addEventListener("resize", function () {
        if (filterContainer.style.display === "block") {
            positionFilter();
        }
    });

    // Устанавливаем положение фильтра при скролле
    window.addEventListener("scroll", function () {
        if (filterContainer.style.display === "block") {
            positionFilter();
        }
    });
});