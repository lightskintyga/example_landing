(function() {
    "use strict";

    let state = document.getElementById("id_state");

    let state_figure_1 = document.getElementById("figure1");

    let state_figure_2 = document.getElementById("figure2");

    let state_figure_3 = document.getElementById("figure3");

    document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('cart_custom').addEventListener('submit', estimateTotal);

        let v_btn_estimate = document.getElementById('btn_estimate');

        let showData = document.getElementById('data');

        let v_btn_radius = document.getElementById('setting1');

        let v_btn_height = document.getElementById("setting2");

        let v_btn_length = document.getElementById("setting3");

        let v_btn_width = document.getElementById("setting4");

        v_btn_estimate.disabled = true;

        state_figure_1.addEventListener('change', function () {
            if (state_figure_1.checked) {
                showData.style.display = 'block';
                v_btn_radius.style.display = 'block';
                v_btn_height.style.display = 'none';
                v_btn_length.style.display = 'none';
                v_btn_width.style.display = 'none';
            }
        })

        state_figure_2.addEventListener('change', function () {
            if (state_figure_2.checked) {
                showData.style.display = 'block';
                v_btn_radius.style.display = 'block';
                v_btn_height.style.display = 'block';
                v_btn_length.style.display = 'none';
                v_btn_width.style.display = 'none';
            }
        })

        state_figure_3.addEventListener('change', function () {
            if (state_figure_3.checked) {
                showData.style.display = 'block';
                v_btn_radius.style.display = 'none';
                v_btn_height.style.display = 'none';
                v_btn_length.style.display = 'block';
                v_btn_width.style.display = 'block';
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

        let radius = parseFloat(document.getElementById("radius").value);
        let height = parseFloat(document.getElementById("height").value);
        let length = parseFloat(document.getElementById("length").value);
        let width = parseFloat(document.getElementById("width").value);
        let thickness = parseFloat(document.getElementById("thickness").value);
        let v_btn_radius = document.getElementById('setting1');
        let v_btn_height = document.getElementById("setting2");
        let v_btn_length = document.getElementById("setting3");
        let v_btn_width = document.getElementById("setting4");
        let complexity, totalPrice;

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

        if (v_btn_radius.style.display === 'block' && v_btn_height.style.display === 'none') {
            totalPrice = thickness + complexity + radius;
        }
        else if (v_btn_radius.style.display === 'block' && v_btn_height.style.display === 'block') {
            totalPrice = thickness + complexity + radius + height;
        }
        else if (v_btn_length.style.display === 'block' && v_btn_width.style.display === 'block') {
            totalPrice = thickness + complexity + length + width;
        }


        document.getElementById('total_estimate').value = totalPrice + ' руб.';
    }
})();
