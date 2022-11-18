enum _1{
    A = "plus",
    B = "minus"
}
type typesButtons = _1.A | _1.B
function test(text: typesButtons){
    fetch('http://localhost:3005/test', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: text})
    })
}