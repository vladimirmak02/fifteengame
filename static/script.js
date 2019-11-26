function drawTable(l) {
    $("#tbl").html("<tbody></tbody>");
    for (let i = 0; i < l; i++) {
        let row = "<tr>";

        for (let k = 0; k < l; k++) {
            row += "<td class='cell' id=\"" + i + k + "\">" + arr[i][k] + "";
        }

        row += "</tr>";
        $("#tbl").append(row);
        $('#tbl').show('fade', null, 500 , null);
    }

    $(".cell").on('click', function (e) {
        //console.log(e.target.id);
        //console.log(e.target.innerHTML);
        let cor = [0, 0];
        for (let i = 0; i < l; i++) {
            for (let k = 0; k < l; k++) {
                if (arr[i][k] === ""){
                    cor [0]= i;
                    cor [1]= k;
                }
            }
        }

        if (cor[0] > 0 && arr[cor[0]-1][cor[1]] == e.target.innerHTML){
            swap(4, cor[0], cor[1], true);
            clicks ++;
        }
        else if (cor[0] < l-1 && arr[cor[0]+1][cor[1]] == e.target.innerHTML){
            swap(2, cor[0], cor[1], true);
            clicks ++;
        }
        else if (cor[1] < l-1 && arr[cor[0]][cor[1]+1] == e.target.innerHTML){
            swap(3, cor[0], cor[1], true);
            clicks ++;
        }
        else if (cor[1] > 0 && arr[cor[0]][cor[1]-1] == e.target.innerHTML){
            swap(1, cor[0], cor[1], true);
            clicks ++;
        }
        //drawTable(l);
        let n = 1;
        for (let i = 0; i < l; i++) {
            for (let k = 0; k < l; k++) {
                if (arr[i][k] === n){
                    n++;
                }
                else if(n === l*l && arr[i][k] === ""){
                    $( "#fin" ).show( 'fade', null, 300, null );
                    $(".cell").off();
                    timeFin = new Date();
                    temptime = timeFin - timeStart;
                    //$("#fin").html("Solved in " + (temptime / 1000) + " seconds and " + clicks + " clicks.");
                    $("#fin").html(`Solved in ${(temptime / 1000)} seconds and ${clicks} clicks. <br>
                    <input type="input" id="nameinp" placeholder="Your name" size="10"><button type="button" id="savebtn">Save</button>
                    `);
                    $("#savebtn").click(() => {
                        let name = $("#nameinp").val();
                        $.ajax({
                            method: 'POST',
                            url: 'addScore',
                            contentType : "application/json",
                            data: JSON.stringify({
                                name: name,
                                clicks: clicks,
                                time: (temptime / 1000)
                            })
                        });
                    });
                }
            }
        }
    });
}



function swap(dir, x, y, drawing=false) {
    if (dir === 1) {
        if (y === 0) {
            return false;
        }
        let a = arr[x][y - 1];
        arr[x][y - 1] = arr[x][y];
        arr[x][y] = a;
        if (drawing === true){
            let tmp = $("#" + String(x) + String(y-1)).html();
            $("#" + String(x) + String(y-1)).html("");
            $("#" + String(x) + String(y)).html(tmp);
        }
        return true;

    }
    else if (dir === 2) {
        if (x === arr.length - 1) {
            return false;
        }
        let a = arr[x + 1][y];
        arr[x + 1][y] = arr[x][y];
        arr[x][y] = a;
        if (drawing === true){
            let tmp = $("#" + String(x+1) + String(y)).html();
            $("#" + String(x+1) + String(y)).html("");
            $("#" + String(x) + String(y)).html(tmp);
        }
        return true;
    }
    else if (dir === 3) {
        if (y === arr.length - 1) {
            return false;
        }
        let a = arr[x][y + 1];
        arr[x][y + 1] = arr[x][y];
        arr[x][y] = a;
        if (drawing === true){
            let tmp = $("#" + String(x) + String(y+1)).html();
            $("#" + String(x) + String(y+1)).html("");
            $("#" + String(x) + String(y)).html(tmp);
        }
        return true;
    }
    else if (dir === 4) {
        if (x === 0) {
            return false;
        }
        let a = arr[x - 1][y];
        arr[x - 1][y] = arr[x][y];
        arr[x][y] = a;
        if (drawing === true){
            let tmp = $("#" + String(x-1) + String(y)).html();
            $("#" + String(x-1) + String(y)).html("");
            $("#" + String(x) + String(y)).html(tmp);
        }
        return true;
    }
}

function shake() {
    let successful = 0;
    while (successful < arr.length * 50) {
        let a = Math.floor(Math.random() * 4) + 1;
        let x = 0;
        let y = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[i][k] === '') {
                    if (swap(a, i, k)) {
                        successful++;
                    }
                    i = arr.length;
                    break;
                }
            }
        }
    }
}

let arr = [];
let timeStart = 0;
let timeFin = 0;
let temptime = 0;
let clicks = 0;

$('#btn').on('click', function () {

    $( "#fin" ).hide( 'fade', null, 300, null );
    arr = [];
    timeStart = new Date();
    let l = parseInt($('#inp').val());

    for (var i = 0; i < l; i++) {
        let tmpArr = [];
        for (var k = 0; k < l; k++) {
            tmpArr.push((k + 1) + i * l);
        }

        arr.push(tmpArr);

    }

    arr[arr.length - 1][arr.length - 1] = '';

    $( "#tbl" ).hide( 'fade', {}, 500 , null);
    shake();

    setTimeout(function(){
    drawTable(l);
    }, 490);



});



