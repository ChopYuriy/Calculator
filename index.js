const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");
const clear_btn = document.querySelector("button[type=reset]");
const dot_btn = document.querySelector("#dot");

// const make_coma = () => {
//     dot_btn.addEventListener('click', function () {
//         dot_btn.innerHTML = ",";
//     });
// };

const remove_active = () => {
    operator_btns.forEach((btn) => {
        btn.classList.remove("active");
    });
};

const change_clear_btn_AC = () => {
    clear_btn.addEventListener('click', function () {
        clear_btn.innerHTML = "AC";
        remove_active();
    });
};

const change_clear_btn = () => {
    clear_btn.innerHTML = "C";
};



form.addEventListener("submit", (e) => {
    e.preventDefault();
});

let is_operator = false;
operand_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        remove_active();
        change_clear_btn();
        if (output.value == "0") {
            output.value = e.target.value;
            change_clear_btn_AC();
        } else if (output.value.includes(".")) {
            // dot_btn.value = ",";
            output.value = output.value + "" + e.target.value
        } else if (is_operator) {
            is_operator = false;
            output.value = e.target.value;
        } else {
            output.value = output.value + "" + e.target.value;
        }
    });
});

let equation = [];
operator_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        remove_active();
        e.currentTarget.classList.add("active");

        switch (e.target.value) {
            case "%":
                output.value = parseFloat(output.value) / 100;
                break;
            case "invert":
                output.value = parseFloat(output.value) * -1;
                break;
            case "=":
                equation.push(output.value);
                output.value = eval(equation.join(""));
                equation = [];
                break;
            default:
                let last_item = equation[equation.length - 1];
                if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
                    equation.pop();
                    equation.push(e.target.value);
                } else {
                    equation.push(output.value);
                    equation.push(e.target.value);
                }
                is_operator = true;
                break;
            
            
        }
        
    });
});


