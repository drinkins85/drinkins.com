/**
 * Created by Drinkins on 21.06.2017.
 */

function windOfChange (param){

    let defaultSpeedM = 100;
    let defaultSpeedSM = 150;
    let defaultSpeedS = 200;

    let elementSpeedM = document.querySelectorAll('.tester');
    //let elementSpeedSM = document.querySelectorAll('.move_anim_speed_sm');
    //let elementSpeedS = document.querySelectorAll('.move_anim_speed_s');

    if (param === 'inc') {
        incSpeed(elementSpeedM, defaultSpeedM);
        //incSpeed(elementSpeedSM, defaultSpeedSM);
        //incSpeed(elementSpeedS, defaultSpeedS);
    }
/*
    if (param === 'dec'){
        decSpeed(elementSpeedM, defaultSpeedM);
        decSpeed(elementSpeedSM, defaultSpeedSM);
        decSpeed(elementSpeedS, defaultSpeedS);
    }
    */


    function incSpeed(elementsArr, defaultSpeed) {
        elementsArr.forEach(animElement => {
            let curSpeed = parseFloat(animElement.style.animationDuration);
            if (!curSpeed){
                curSpeed = defaultSpeed;
            }
            console.log("x = ",animElement.offsetLeft);

            if (curSpeed >= 3){
                console.log(curSpeed);
                animElement.style.animationDuration = 30 + 's';
               // animElement.style.marginLeft = '-30px';
            }
        });
    }

    function decSpeed(elementsArr, defaultSpeed) {
        elementsArr.forEach(animElement => {
            let curSpeed = parseFloat(animElement.style.animationDuration);
            if (!curSpeed){
                curSpeed = defaultSpeed;
            }
            console.log(curSpeed);
            if (curSpeed < 200){
                animElement.style.animationDuration = curSpeed*2 + 's';
            } else {

            }
        });
    }



}
