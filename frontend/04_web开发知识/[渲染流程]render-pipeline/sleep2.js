function sleep2(ms) {
    console.log('start sleep2 start!');
    let currTimeatamp = +new Date;
    while (+new Date < currTimeatamp + ms) {}
    console.log('wake up sleep2!');
}

sleep2(1000);