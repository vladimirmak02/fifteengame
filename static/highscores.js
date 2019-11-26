
$(document).ready( ()=>{
    $.ajax({
        url: 'getScores'
    }).done( (r)=>{
        r = JSON.parse(r);
        //console.log("resp:", r );
        for (let score in r['scores']){
            console.log(r['scores'][score]);
            $("#tbl tbody").append(`
            <tr> <td> ${r['scores'][score]['name']} </td> <td> ${r['scores'][score]['time']} </td> <td> ${r['scores'][score]['clicks']} </td> </tr>
            `);
        }
    } ).fail( ()=>{
        console.log("Fail");
    } );
});
