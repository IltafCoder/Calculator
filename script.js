

let div_sym = String.fromCharCode(247)
let mul_sym = String.fromCharCode(215)
let per_sym = '%'
let dot_allow = true

function clearDisplay() {
    document.getElementById("output-txt").innerHTML = '0'
    dot_allow = true
    bracket_count = 0
}

function numericButtons(num) {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    if (y == '0') {
        x.innerHTML = num
    }
    else {
        x.innerHTML = y + num
    }
    
}

function operatorButtons(op) {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    let s = y.slice(-2, -1)
    if (s == '+' || s == '-' || s == mul_sym || s == div_sym) {
        x.innerHTML = y.slice(0, -3) + op
    }
    else {
        x.innerHTML = y + op
    }
    dot_allow = true
}

function percentButton(p) {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    x.innerHTML = y + p
}

function dotButton(d) {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    if (dot_allow) {
        x.innerHTML = y + d
        dot_allow = false
    }
}

let bracket_count = 0

function bracketButton() {
    
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    let s = y.slice(-1)

    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%', ')']
    if (arr.includes(s) && bracket_count != 0) {
        x.innerHTML = y + ')'
        bracket_count = bracket_count - 1
    }
    else {
        x.innerHTML = y + '('
        bracket_count = bracket_count + 1
    }

    dot_allow = true
    
}

function backButton() {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML
    let s = y.slice(-2, -1)

    if (s == '+' || s == '-' || s == mul_sym || s == div_sym) {
        let z = y.slice(0, -3)
        x.innerHTML = z

        dot_len = z.length
        z_edit = '~' + z

        while (true) {

            if (z_edit[dot_len] == '.') {
                dot_allow = false
                break
            }
            else if (z_edit[dot_len] == '(' || z_edit[dot_len] == ')') {
                dot_allow = true
                break
            }
            else if (z_edit[dot_len] == '~') {
                dot_allow = true
                break
            }

            dot_len = dot_len - 1

        }
    }
    else if (y == '0') {
        x.innerHTML == '0'
    }
    else if (y.length == 1) {
        x.innerHTML = '0'
    }
    else {
        let z = y.slice(0, -1)
        let a = y.slice(-1)
        let b = y.slice(-3)

        console.log(b)

        if (a == '(') {
            bracket_count = bracket_count - 1
            dot_len = z.length
            z_edit = '~' + z

            while (true) {
                
                if (z_edit[dot_len] == '.') {
                    dot_allow = false
                    break
                }
                else if (z_edit[dot_len] == '+' || z_edit[dot_len] == '-' || z_edit[dot_len] == div_sym || z_edit[dot_len] == mul_sym || z_edit[dot_len] == ')') {
                    dot_allow = true;
                    break
                }
                else if (z_edit[dot_len] == '~') {
                    dot_allow = true
                    break
                }

                dot_len = dot_len - 1
            }

        }
        else if (a == ')') {

            dot_len = z.length

            while (true) {
                if (z[dot_len] == '.') {
                    dot_allow = false
                    break
                }
                else if (z[dot_len] == '+' || z[dot_len] == '-' || z[dot_len] == div_sym || z[dot_len] == mul_sym || z[dot_len] == '(') {
                    dot_allow = true;
                    break
                }

                dot_len = dot_len - 1

            }

            bracket_count = bracket_count + 1
        }
        else if (a == '.') {
            dot_allow = true
        }
        x.innerHTML = z
    }

}

function calculateResult() {
    let x = document.getElementById("output-txt")
    let y = x.innerHTML.replaceAll(div_sym, '/').replaceAll(mul_sym, '*')

    try {

        let z = y
        for (let i = 0; i <= y.length; i++) {

            if (z[i] == '(') {
                if (z[i-1] != ' ' && z[i-1] != '(') {
                    let txt_1 = z.substring(0, i)
                    let txt_2 = z.substring(i)
                    z = txt_1 + ' ' + '*' + ' ' + txt_2
                }
            }
        }

        let p = z
        p = p.replaceAll(per_sym, ' * 0.01')
        let res = eval(p)
        x.innerHTML = res
        
        if (x.innerHTML.includes('.')) {
            dot_allow = false
        }
        else {
            dot_allow = true
        }

    }
    catch(err) {
        let x = document.getElementsByClassName("calc-display")
        x[0].style.animation = "blinkingBackground 2s infinite"

        setTimeout(changeColor = () => {
            x[0].style.removeProperty("animation")
        }, 1000)
           
    }

}
