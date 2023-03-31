(function() {
    "use strict";

    let state = document.getElementById("id_state");

    document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('cart_custom').addEventListener('submit', estimateTotal);

        let v_btn_estimate = document.getElementById('btn_estimate');

        v_btn_estimate.disabled = true;


        state.addEventListener('change', function() {

            if (state.value === '') {
                v_btn_estimate.disabled = true;
                console.log("True");
            }
            else {
                v_btn_estimate.disabled = false;
                console.log("False");
            }

        });

    });



    function estimateTotal(event) {
        event.preventDefault();

        if (state.value === '') {
            state.focus();
        }

        let area = parseInt(document.getElementById("area").value, 10 )|| 0;
        let thickness = parseInt(document.getElementById("thickness").value, 10 )|| 0;
        let geometry = parseInt(document.getElementById("geometry").value, 10 )|| 0;
        let material;

        let state_index = state.value;

        switch (state_index) {
            case 'LA':
                material = 10;
                break
            case 'AL':
                material = 15;
                break
            case 'CU':
                material = 20;
                break
            case 'ST':
                material = 25;
                break
            case 'ZN':
                material = 30;
                break
        }


        let totalPrice = area + thickness + geometry + material;

        document.getElementById('total_estimate').value=totalPrice + ' руб.';
    }
})();
