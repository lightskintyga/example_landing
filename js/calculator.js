(function() {
    "use strict";

    let state = document.getElementById("id_state");

    let stateCircle = document.getElementById("circle");

    let stateCylinder = document.getElementById("cylinder");

    let stateRectangle = document.getElementById("rectangle");

    document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('cart_custom').addEventListener('submit', estimateTotal);

        let v_btn_estimate = document.getElementById('btn_estimate');

        let showValues = document.getElementById('values');

        let buttonRadius = document.getElementById('setting1');

        let buttonHeight = document.getElementById("setting2");

        let buttonLength = document.getElementById("setting3");

        let buttonWidth = document.getElementById("setting4");

        v_btn_estimate.disabled = true;

        stateCircle.addEventListener('change', function () {
            if (stateCircle.checked) {
                showValues.style.display = 'block';
                buttonRadius.style.display = 'block';
                buttonHeight.style.display = 'none';
                buttonLength.style.display = 'none';
                buttonWidth.style.display = 'none';
            }
        })

        stateCylinder.addEventListener('change', function () {
            if (stateCylinder.checked) {
                showValues.style.display = 'block';
                buttonRadius.style.display = 'block';
                buttonHeight.style.display = 'block';
                buttonLength.style.display = 'none';
                buttonWidth.style.display = 'none';
            }
        })

        stateRectangle.addEventListener('change', function () {
            if (stateRectangle.checked) {
                showValues.style.display = 'block';
                buttonRadius.style.display = 'none';
                buttonHeight.style.display = 'none';
                buttonLength.style.display = 'block';
                buttonWidth.style.display = 'block';
            }
        })

        state.addEventListener('change', function() {

            if (state.value === '') {
                v_btn_estimate.disabled = true;
                console.log("True");
            }
            else {
                v_btn_estimate.disabled = false;
                console.log("False")
            }

        });

    });

    function estimateTotal(event) {
        event.preventDefault();

        if (state.value === '') {
            state.focus();
        }

        // блок констант

        const wireDensity = 0.0076; // плотность проволоки, кг
        const efficiency = 2.68; // производительность, кг/ч
        const minTimeToPrepare = 0.15; // минимальное время на подготовку, ч
        const maxTimeToPrepare = 1; // максимальное время на подготовку, ч

        // -------------------- //

        let radius = parseFloat(document.getElementById("radius").value);
        let height = parseFloat(document.getElementById("height").value);
        let length = parseFloat(document.getElementById("length").value);
        let width = parseFloat(document.getElementById("width").value);
        let thickness = parseFloat(document.getElementById("thickness").value);
        let details = parseInt(document.getElementById("details").value);
        let v_btn_radius = document.getElementById('setting1');
        let v_btn_height = document.getElementById("setting2");
        let v_btn_length = document.getElementById("setting3");
        let v_btn_width = document.getElementById("setting4");
        let complexity, minTotalPrice, maxTotalPrice, totalPrice;

        let state_index = state.value;

        switch (state_index) {
            case '1':
                complexity = 1;
                break
            case '1.5':
                complexity = 1.5;
                break
            case '2':
                complexity = 2;
                break
        }

        function getArea() {
            if (stateCircle.checked) {
                return Math.PI * (radius / 1000) ** 2;
            }
        }

        function getTimeForSpraying() {
            let totalArea = getArea() * details;
            let volume = thickness * 1000 * totalArea;
            let weight = volume * wireDensity;

            return weight / 0.5 / efficiency;
        }

        function getTotalPrice() {
            let timeForSpraying = getTimeForSpraying();

            let totalMinTime = timeForSpraying + minTimeToPrepare;
            let totalMaxTime = timeForSpraying + maxTimeToPrepare;

            let minCostPrice = totalMinTime * 5000;
            let maxCostPrice = totalMaxTime * 5000;

            return [Math.ceil(minCostPrice / 0.9), Math.ceil(maxCostPrice / 0.9)];
        }

        if (v_btn_radius.style.display === 'block' && v_btn_height.style.display === 'none') {
            minTotalPrice = getTotalPrice()[0];
            maxTotalPrice = getTotalPrice()[1];
        }
        else if (v_btn_radius.style.display === 'block' && v_btn_height.style.display === 'block') {
            totalPrice = thickness + complexity + radius + height;
        }
        else if (v_btn_length.style.display === 'block' && v_btn_width.style.display === 'block') {
            totalPrice = thickness + complexity + length + width;
        }


        document.getElementById('total_estimate').value = 'от ' + minTotalPrice + ' руб. ' + 'до ' + maxTotalPrice + ' руб.';
    }
})();
