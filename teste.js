
const wrapper = document.getElementById("wrapper")
const shapes = document.getElementsByClassName("shape")
const combinations=[
    { configuration: [[12,16,4,8],[16,4,8,12],[4,8,12,16],[8,12,16,4]]},
    { configuration: [[15,11,7,3],[11,7,3,15],[7,3,15,11],[3,15,11,7]]},
    { configuration: [[6,2,14,10],[2,14,10,6],[14,10,6,2],[10,6,2,14]]},
    { configuration: [[1,5,9,13],[5,9,13,1],[9,13,1,5],[13,1,5,9]]},
]
const roundness=[
    [1,1,1,1],[2,2,2,2],[3,3,3,3]
    //,[4,5,6,7]
]
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
    let next = prev;
    while (prev === next) next = rand(min, max);

    return next;
}

const choseConfiguration = (prevSize,prevRotation)=>{
    if (uniqueRand(0, 9)>3) {
        prevSize =uniqueRand(0, combinations.length - 1, prevSize)
    }else if(uniqueRand(0, 1)==1){
        if(prevRotation==combinations[prevSize].configuration.length-1)
            prevRotation=0
        else
            prevRotation++
    }else{
        if(prevRotation==0)
            prevRotation=combinations[prevSize].configuration.length-1
        else
            prevRotation--
    }
    return combinations[prevSize].configuration[prevRotation];
}
const choseRoundness = (prevRoundness)=>{
    let index = uniqueRand(0, roundness.length- 1, prevRoundness)

    return roundness[index]
}


let prevSize = 0;
let prevRotation = 0;
let prevRoundness
let onhover = false

// shapes.forEach(shape => {
//     console.log(shape)
//     shape.addEventListener("mouseenter",(this)=>{onhover=true})
//     shape.addEventListener("mouseleave",(this)=>{onhover=false})
// });

setInterval(() => {
    if(!onhover){
        combination = choseConfiguration(prevSize,prevRotation)
        roundnessBuff=choseRoundness(prevRoundness)
        for (let i = 0; i < 4; i++) {
            shapes[i].dataset.size=combination[i];
            shapes[i].dataset.roundness=roundnessBuff[i]
        }
    }

}, 3000);

